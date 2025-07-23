import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { RelationshipSelector } from "@/components/ui/trust-contact/relationship-selector";
import { type TrustContact } from "@/lib/types/trust-contact.schema";
import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { type Value as PhoneInputValue } from "react-phone-number-input";

interface TrustContactItemProps {
  contact: TrustContact;
  index: number;
  onRemove: () => void;
  onUpdate: (index: number, updatedContact: Partial<TrustContact>) => void;
}

export function TrustContactItem({
  index,
  onRemove,
  onUpdate,
}: TrustContactItemProps) {
  const form = useFormContext();

  const handleChange = (field: keyof TrustContact, value: string) => {
    onUpdate(index, { [field]: value });
  };

  return (
    <div className="space-y-4 p-4 border rounded-md">

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`trustContacts.${index}.firstName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Prénom"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("firstName", e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`trustContacts.${index}.lastName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("lastName", e.target.value);
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
        name={`trustContacts.${index}.phone`}
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
                  handleChange("phone", value?.toString() || "");
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`trustContacts.${index}.relationship`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lien de parenté</FormLabel>
            <FormControl>
              <RelationshipSelector
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  handleChange("relationship", value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full mt-2 hover:text-destructive hover:border-destructive/50"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Supprimer ce contact
      </Button>
    </div>
  );
}
