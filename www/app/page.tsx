'use client'
import { buttonVariants } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
    return (
        <main className="w-screen min-h-screen bg-backgroundi grid grid-rows-[auto_auto_1fr] p-8 gap-8">
            <header className="max-w-screen-xl mx-auto w-full flex gap-2 items-center justify-end">
                <Link
                    href={"/docs/getting-started/introduction"}
                    className={cn(buttonVariants({ variant: "ghost" }), "rounded-full text-lg md:text-xl font-bold")}
                >
                    Docs
                </Link>
                <Link
                    href={"https://github.com/super-turbo-stack/create-super-turbo.git"}
                    target="_blank"
                    className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-2xl md:text-3xl rounded-full h-12 w-12 p-2.5")}
                >
                    <Icon icon="github" />
                </Link>
            </header>
            <div className="absolute top-0 left-0 w-screen h-screen pointer-events-none select-none">
                <div className="absolute inset-0 contain-strict isolate z-50 pointer-events-none select-none">
                    <div className="lightA absolute top-0 left-0"></div>
                    <div className="lightB absolute top-0 left-0"></div>
                    <div className="lightC absolute top-0 left-0"></div>
                </div>
            </div>
            <div className="max-w-screen-md w-full mx-auto md:px-8 grid content-start justify-items-center gap-8">
                <CopyCommand />
                <p className="text-balance text-center md:leading-6 text-foreground/65 tracking-normal font-medium md:mt-4 text-sm md:text-lg">
                    Skip the complicated Turborepo setup. With <span className="text-foreground">create super turbo</span>, you get a fully configured React, Next.js, and Express stack in seconds.
                    Tailored with the most popular tools, so you can focus on development, not setup.
                </p>
            </div>
            <div className="terminalContainer relative p-1 self-start mt-4 md:mt-0 justify-self-center overflow-hidden rounded-xl max-w-screen-lg">
                <Image src="/CLI.gif" alt="CLI demo" width={960} height={540} className="rounded-lg w-auto h-auto invert dark:invert-0" priority />
            </div>
        </main>
    );
};

function CopyCommand() {
    const [isCopied, setIsCopied] = useState(false);
    const COMMAND = `npx create-super-turbo@latest`;

    const handleCopy = () => {
        if (isCopied) return;
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
        navigator.clipboard.writeText(COMMAND);
    };

    return (
        <div className="p-1 bg-gradient-to-r from-slate-200 via-slate-500 to-neutral-700 rounded-sm" title="copy this command to get started">
            <button onClick={handleCopy} className="flex items-center font-semibold font-sans gap-2 md:text-xl bg-background rounded px-5 py-3">
                {COMMAND}
                {!isCopied && <Icon icon="copy" />}
                {isCopied && <Icon icon="check" />}
            </button>
        </div>
    )
}

export default Page;
