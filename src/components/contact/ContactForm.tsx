"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionaries";

export function ContactForm({ contact, email }: { contact: Dictionary["contact"]; email: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent(`${name || ""}${org ? ` · ${org}` : ""}`.trim() || "Contact");
    const body = encodeURIComponent(`${message}\n\n${name}\n${org}\n${from}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  const field = "w-full rounded-xl border border-(--color-line) bg-(--color-card) px-3.5 py-2.5 text-sm outline-none focus:border-(--color-ink)";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm">
        <span className="mb-1 block font-medium">{contact.formName}</span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={field} />
      </label>
      <label className="text-sm">
        <span className="mb-1 block font-medium">{contact.formEmail}</span>
        <input type="email" value={from} onChange={(e) => setFrom(e.target.value)} className={field} />
      </label>
      <label className="text-sm sm:col-span-2">
        <span className="mb-1 block font-medium">{contact.formOrg}</span>
        <input type="text" value={org} onChange={(e) => setOrg(e.target.value)} className={field} />
      </label>
      <label className="text-sm sm:col-span-2">
        <span className="mb-1 block font-medium">{contact.formMessage}</span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className={field} />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={!email}
          aria-disabled={!email}
          className="rounded-full bg-(--color-ink) px-6 py-3 text-sm font-medium text-(--color-paper) transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {contact.formSubmit}
        </button>
        <p className="mt-2 text-xs text-(--color-soft)">{contact.formNote}</p>
        {!email && <p className="mt-1 text-xs text-(--color-soft)">{contact.emailPlaceholder}</p>}
      </div>
    </form>
  );
}
