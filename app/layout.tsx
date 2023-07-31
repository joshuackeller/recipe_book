import AuthWrapper from "@/src/components/auth/AuthWrapper";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Book",
  description: "a josh keller application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>
          <div className="max-w-4xl mx-auto p-5">{children}</div>
        </AuthWrapper>
      </body>
    </html>
  );
}
