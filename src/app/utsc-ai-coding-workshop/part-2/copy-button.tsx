"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Some browsers block the clipboard; the text can still be selected by hand.
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button type="button" variant="ghost" size="sm" onClick={copy} className="font-mono">
      {copied ? <Check className="text-primary" /> : <Copy />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </Button>
  );
}
