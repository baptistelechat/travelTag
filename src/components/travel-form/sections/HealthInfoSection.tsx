import { useTravelFormField } from "@/hooks/useTravelFormField";
import { useTravelTagStore } from "@/lib/store";
import { AccordionValueEnum } from "@/lib/types/accordion-value.enum";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AllergySelector } from "@/components/ui/allergy/allergy-selector";
import { BloodGroupSelector } from "@/components/ui/blood-group/blood-group-selector";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";

export function HealthInfoSection() {
  const { updateTravelInfo } = useTravelTagStore();
  const { form, handleFieldChange } = useTravelFormField();

  return (
    <AccordionItem value={AccordionValueEnum.HEALTH_ADDITIONAL_INFO}>
      <AccordionTrigger className="flex items-center gap-2">
        <span className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Informations de santé et complémentaires
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-2">
          {/* Section Allergies */}
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies</FormLabel>
                  <FormControl>
                    <AllergySelector
                      value={field.value || []}
                      onChange={(value) => {
                        field.onChange(value);
                        updateTravelInfo({ allergies: value });
                      }}
                      placeholder="Sélectionner des allergies..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Groupe sanguin */}
          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Groupe sanguin</FormLabel>
                <FormControl>
                  <BloodGroupSelector
                    value={field.value || ""}
                    onChange={(value) => {
                      field.onChange(value);
                      handleFieldChange("bloodGroup", value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="healthInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Informations complémentaires</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Médicaments, conditions médicales, etc."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("healthInfo", e.target.value);
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
