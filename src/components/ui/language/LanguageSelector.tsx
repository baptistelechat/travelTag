import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import type { Language } from '@/lib/i18n/types';

const languageNames: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
  zh: '中文',
  ja: '日本語',
  it: 'Italiano',
  es: 'Español',
  pt: 'Português',
  ar: 'العربية',
  de: 'Deutsch',
  ru: 'Русский'
};

const languageFlags: Record<Language, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
  zh: '🇨🇳',
  ja: '🇯🇵',
  it: '🇮🇹',
  es: '🇪🇸',
  pt: '🇵🇹',
  ar: '🇸🇦',
  de: '🇩🇪',
  ru: '🇷🇺'
};

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  // Ordre des langues : français, anglais, puis par popularité mondiale
  const languageOrder: Language[] = [
    'fr', // Français (priorité)
    'en', // Anglais (priorité)
    'zh', // Chinois (1.1 milliard de locuteurs)
    'es', // Espagnol (500 millions de locuteurs)
    'ar', // Arabe (400 millions de locuteurs)
    'pt', // Portugais (260 millions de locuteurs)
    'ru', // Russe (250 millions de locuteurs)
    'ja', // Japonais (125 millions de locuteurs)
    'de', // Allemand (100 millions de locuteurs)
    'it'  // Italien (65 millions de locuteurs)
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">
            {languageFlags[language]} {languageNames[language]}
          </span>
          <span className="sm:hidden">
            {languageFlags[language]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageOrder.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={language === lang ? 'bg-accent' : ''}
          >
            <span className="flex items-center gap-2">
              {languageFlags[lang]} {languageNames[lang]}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}