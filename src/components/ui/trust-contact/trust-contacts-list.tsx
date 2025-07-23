import { Button } from "@/components/ui/button";
import { TrustContactItem } from "@/components/ui/trust-contact/trust-contact-item";
import { type TrustContact } from "@/lib/types/trust-contact.schema";
import { RelationshipTypeEnum } from "@/lib/types/relationship-type.enum";
import { PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface TrustContactsListProps {
  contacts: TrustContact[];
  onChange: (contacts: TrustContact[]) => void;
}

export function TrustContactsList({
  contacts,
  onChange,
}: TrustContactsListProps) {
  // Ajouter un nouveau contact
  const addContact = () => {
    const newContact: TrustContact = {
      id: uuidv4(),
      firstName: "",
      lastName: "",
      phone: "",
      relationship: RelationshipTypeEnum.AUTRE,
    };
    onChange([...contacts, newContact]);
  };

  // Supprimer un contact
  const removeContact = (index: number) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    onChange(updatedContacts);
  };

  // Mettre à jour un contact
  const updateContact = (
    index: number,
    updatedFields: Partial<TrustContact>
  ) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      ...updatedFields,
    };
    onChange(updatedContacts);
  };

  return (
    <div className="space-y-4">
      {contacts.length === 0 ? (
        <div className="text-center p-4 border border-dashed rounded-md">
          <p className="text-muted-foreground">
            Aucun contact de confiance ajouté
          </p>
        </div>
      ) : (
        contacts.map((contact, index) => (
          <TrustContactItem
            key={contact.id}
            contact={contact}
            index={index}
            onRemove={() => removeContact(index)}
            onUpdate={updateContact}
          />
        ))
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full mt-2"
        onClick={addContact}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Ajouter un contact de confiance
      </Button>
    </div>
  );
}
