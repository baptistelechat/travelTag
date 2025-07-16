import { useTravelTagStore } from "@/lib/store";
import { type TravelInfo, travelInfoSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function TravelForm() {
  const { travelInfo, updateTravelInfo } = useTravelTagStore();

  const form = useForm<TravelInfo>({
    resolver: zodResolver(travelInfoSchema),
    defaultValues: travelInfo,
  });

  function onSubmit(data: TravelInfo) {
    updateTravelInfo(data);
  }

  // Mise à jour du store à chaque changement validé
  const handleFieldChange = (field: keyof TravelInfo, value: string) => {
    if (value.trim() !== "") {
      updateTravelInfo({ [field]: value });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Informations de voyage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+33 6 12 34 56 78"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("phone", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departureAirport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aéroport/gare de départ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Paris CDG"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("departureAirport", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arrivalAirport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aéroport/gare d'arrivée</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New York JFK"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("arrivalAirport", e.target.value);
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
                  <FormLabel>Informations santé (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Allergies, médicaments, etc."
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

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Informations complémentaires (optionnel)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Contacter Marie en cas d'urgence..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("additionalInfo", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Valider
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
