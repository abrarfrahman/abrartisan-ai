import { NextResponse } from "next/server";

const API_BASE_URL = process.env.FASTAPI_BASE_URL || "http://localhost:8000";

export async function GET(request: Request) {
  try {
    // Fetch data from the FastAPI backend
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch messages from FastAPI.");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching messages:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch messages from the backend." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${API_BASE_URL}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to send message to FastAPI.");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error sending message:", error.message);
    return NextResponse.json(
      { error: "Failed to send message to the backend." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const messageId = url.searchParams.get("id");

    if (!messageId) {
      return NextResponse.json(
        { error: "Message ID is required." },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/delete/${messageId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete message from FastAPI.");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error deleting message:", error.message);
    return NextResponse.json(
      { error: "Failed to delete message from the backend." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const messageId = url.searchParams.get("id");
    const body = await request.json();

    if (!messageId) {
      return NextResponse.json(
        { error: "Message ID is required." },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/edit/${messageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updated_content: body.content }),
    });

    if (!response.ok) {
      throw new Error("Failed to edit message in FastAPI.");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error editing message:", error.message);
    return NextResponse.json(
      { error: "Failed to edit message in the backend." },
      { status: 500 }
    );
  }
}