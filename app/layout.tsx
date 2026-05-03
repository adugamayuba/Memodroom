import type { Metadata } from "next";
import "./globals.css";
import { MemodroomProvider } from "@/lib/context";

export const metadata: Metadata = {
  title: "Memodroom — AI Cinematic Video Messages",
  description:
    "Turn a photo into a 4K cinematic video message — in under 10 minutes. Powered by Reelin AI.",
  openGraph: {
    title: "Memodroom — AI Cinematic Video Messages",
    description:
      "Turn a photo into a 4K cinematic video message — in under 10 minutes.",
    siteName: "Memodroom",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MemodroomProvider>{children}</MemodroomProvider>
      </body>
    </html>
  );
}
