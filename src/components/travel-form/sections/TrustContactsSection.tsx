import { useTravelFormField } from "@/hooks/useTravelFormField";
import { useTravelTagStore } from "@/lib/store";
import { AccordionValueEnum } from "@/lib/types/accordion-value.enum";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TrustContactsList } from "@/components/ui/trust-contact/trust-contacts-list";
import { useTranslation } from "@/lib/i18n";
import { User } from "lucide-react";

export function TrustContactsSection() {
  const { updateTravelInfo } = useTravelTagStore();
  const { form } = useTravelFormField();
  const { t } = useTranslation();

  return (
    <AccordionItem value={AccordionValueEnum.TRUST_CONTACTS}>
      <AccordionTrigger className="flex items-center gap-2">
        <span className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {t('form.trustContacts.title')}
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-2">
          <FormField
            control={form.control}
            name="trustContacts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.trustContacts.title')}</FormLabel>
                <FormControl>
                  <TrustContactsList
                    contacts={field.value || []}
                    onChange={(value) => {
                      field.onChange(value);
                      updateTravelInfo({ trustContacts: value });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
