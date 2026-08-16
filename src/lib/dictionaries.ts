import "server-only";
import type { Locale } from "./i18n-config";
import fr from "../../locales/fr.json";
import en from "../../locales/en.json";
import mg from "../../locales/mg.json";

const dictionaries = { fr, en, mg } as const;

export type Dictionary = typeof fr;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
