import Footer from "../app/components/footer";

import ChatWidget from "./chatWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChatWidget />
      <br />
      <Footer />
    </main>
  );
}
