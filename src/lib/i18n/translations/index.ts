import { fr } from './fr';
import { en } from './en';
import { zh } from './zh';
import { ja } from './ja';
import { it } from './it';
import { es } from './es';
import { pt } from './pt';
import { ar } from './ar';
import { de } from './de';
import { ru } from './ru';
import type { Language, TranslationKeys } from '../types';

export const translations: Record<Language, TranslationKeys> = {
  fr,
  en,
  zh,
  ja,
  it,
  es,
  pt,
  ar,
  de,
  ru,
};

export { fr, en, zh, ja, it, es, pt, ar, de, ru };