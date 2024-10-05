import { JAVED_GITHUB, REPO, RUSHIKESH_GITHUB } from "@repo/constant";
import { CommandIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
        <div className="flex items-center gap-3">
          <CommandIcon className="sm:block hidden w-5 h-5 text-muted-foreground" />
          <p className="text-center">
            Build by{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href={RUSHIKESH_GITHUB}
            >
              Rushikesh
            </Link>
            and{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href={JAVED_GITHUB}
            >
              Javed
            </Link>
            . The source code is available on{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href={REPO}
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
