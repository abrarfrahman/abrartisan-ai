from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import asyncio
import json
import os
import openai 

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

app = FastAPI()

class Message(BaseModel):
    id: int
    sender: str
    content: str

messages: List[Message] = []

async def stream_chatgpt_response(prompt: str):
    # Call OpenAI's chat/completions endpoint with streaming
    response = openai.ChatCompletion.create(
        model="gpt-4",  # or "gpt-3.5-turbo"
        messages=[{"role": "user", "content": prompt}],
        stream=True
    )
    # Stream response chunks
    for chunk in response:
        if "choices" in chunk and len(chunk["choices"]) > 0:
            delta = chunk["choices"][0].get("delta", {}).get("content", "")
            if delta:
                yield f"data: {json.dumps({'content': delta})}\n\n"
    yield "data: [DONE]\n\n"

@app.post("/send")
async def send_message(message: Message):
    messages.append(message)
    return StreamingResponse(stream_chatgpt_response(message.content), media_type="text/event-stream")

@app.delete("/delete/{message_id}")
async def delete_message(message_id: int):
    global messages
    messages = [msg for msg in messages if msg.id != message_id]
    async def stream_delete():
        yield f"data: {json.dumps({'deleted': message_id})}\n\n"
        yield "data: [DONE]\n\n"
    return StreamingResponse(stream_delete(), media_type="text/event-stream")

@app.put("/edit/{message_id}")
async def edit_message(message_id: int, updated_content: str):
    for msg in messages:
        if msg.id == message_id:
            msg.content = updated_content
            break
    else:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return StreamingResponse(stream_chatgpt_response(updated_content), media_type="text/event-stream")

@app.get("/messages")
async def get_messages():
    return messages