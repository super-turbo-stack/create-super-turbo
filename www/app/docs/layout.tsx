import { Footer } from "@/components/footer";
import { Leftbar } from "@/components/leftbar";
import { Navbar } from "@/components/navbar";
import React from "react";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="sm:container mx-auto w-[90vw] h-auto">
        <div className="flex items-start gap-10">
          <Leftbar key="leftbar" />
          <div className="flex-[5.25]">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
