import { useTravelFormField } from "@/hooks/useTravelFormField";
import { AccordionValueEnum } from "@/lib/types/accordion-value.enum";
import type {
  Country,
  Value as PhoneInputValue,
} from "react-phone-number-input";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CountrySelect } from "@/components/ui/country/country-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

export function PersonalInfoSection() {
  const { form, handleFieldChange } = useTravelFormField();

  return (
    <AccordionItem value={AccordionValueEnum.PERSONAL_INFO}>
      <AccordionTrigger className="flex items-center gap-2">
        <span className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Informations personnelles
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Prénom"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("firstName", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nom"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("lastName", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationalité</FormLabel>
                <FormControl>
                  <CountrySelect
                    defaultCountry="FR"
                    value={field.value as Country}
                    onChange={(value) => {
                      field.onChange(value);
                      handleFieldChange(
                        "nationality",
                        value?.toString() || "FR"
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="my-4" />

          {/* Adresse postale */}
          <div className="pt-2 pb-1">
            <h3 className="text-sm font-medium">Adresse postale</h3>
          </div>

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rue</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 rue de la Paix"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("street", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Compléments d'adresse</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Bâtiment A, Étage 3, Appartement 42"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("addressDetails", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="75000"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("postalCode", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Paris"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("city", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays</FormLabel>
                <FormControl>
                  <CountrySelect
                    defaultCountry="FR"
                    value={field.value as Country}
                    onChange={(value) => {
                      field.onChange(value);
                      handleFieldChange("country", value?.toString() || "FR");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="my-4" />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="06 12 34 56 78"
                    defaultCountry="FR"
                    international={false}
                    value={field.value as PhoneInputValue}
                    onChange={(value) => {
                      field.onChange(value);
                      handleFieldChange("phone", value?.toString() || "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="exemple@email.com"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("email", e.target.value);
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
