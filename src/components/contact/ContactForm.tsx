"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionaries";

export function ContactForm({
  contact,
  email,
}: {
  contact: Dictionary["contact"];
  email: string;
}) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent(`Mission de conseil — ${name || ""}`.trim());
    const body = encodeURIComponent(`${message}\n\n${from}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <label className="text-sm">
        <span className="mb-1 block font-medium">{contact.formName}</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-(--color-line) bg-transparent px-3 py-2"
        />
      </label>
      <label className="text-sm">
        <span className="mb-1 block font-medium">{contact.formEmail}</span>
        <input
          type="email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full rounded border border-(--color-line) bg-transparent px-3 py-2"
        />
      </label>
      <label className="text-sm">
        <span className="mb-1 block font-medium">{contact.formMessage}</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full rounded border border-(--color-line) bg-transparent px-3 py-2"
        />
      </label>
      <button
        type="submit"
        disabled={!email}
        aria-disabled={!email}
        className="justify-self-start rounded-full bg-(--color-accent) px-6 py-3 text-sm font-medium text-(--color-paper) transition-colors hover:bg-(--color-accent-soft) disabled:cursor-not-allowed disabled:opacity-40"
      >
        {contact.formSubmit}
      </button>
      <p className="text-xs text-(--color-ink-soft)">{contact.formNote}</p>
      {!email && (
        <p className="text-xs text-(--color-ink-soft)">{contact.emailPlaceholder}</p>
      )}
    </form>
  );
}
