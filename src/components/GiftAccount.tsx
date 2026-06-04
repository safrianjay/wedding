import { useState } from "react";

type Props = { bank: string; number: string; name: string };

/** A single bank account card with a copy-to-clipboard button (amplop digital). */
export function GiftAccount({ bank, number, name }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="gift-acc">
      <p className="gift-bank">{bank}</p>
      <p className="gift-number">{number}</p>
      <p className="gift-name">Account name: {name}</p>
      <button className="ghost-button" type="button" onClick={copy}>
        {copied ? "Copied ✓" : "Copy Number"}
      </button>
    </div>
  );
}
