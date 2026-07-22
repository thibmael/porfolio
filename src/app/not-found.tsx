import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1.5rem" }}>
        <p>404 — Page introuvable / Page not found.</p>
        <Link href="/fr">Accueil (FR)</Link> · <Link href="/en">Home (EN)</Link>
      </body>
    </html>
  );
}
