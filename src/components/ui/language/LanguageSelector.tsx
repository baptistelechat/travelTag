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
  en: 'English'
};

const languageFlags: Record<Language, string> = {
  fr: '🇫🇷',
  en: '🇬🇧'
};

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

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
        {Object.entries(languageNames).map(([lang, name]) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang as Language)}
            className={language === lang ? 'bg-accent' : ''}
          >
            <span className="flex items-center gap-2">
              {languageFlags[lang as Language]} {name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}