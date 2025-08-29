import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RelationshipTypeEnum } from "@/lib/types/relationship-type.enum";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface RelationshipSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function RelationshipSelector({
  value,
  onChange,
  disabled = false,
}: RelationshipSelectorProps) {
  const { t } = useTranslation();

  const getRelationshipLabel = (relationshipValue: string): string => {
    switch (relationshipValue) {
      case RelationshipTypeEnum.PARENT:
        return t("form.trustContacts.relationships.parent");
      case RelationshipTypeEnum.ENFANT:
        return t("form.trustContacts.relationships.child");
      case RelationshipTypeEnum.CONJOINT:
        return t("form.trustContacts.relationships.spouse");
      case RelationshipTypeEnum.FRERE_SOEUR:
        return t("form.trustContacts.relationships.sibling");
      case RelationshipTypeEnum.AMI:
        return t("form.trustContacts.relationships.friend");
      case RelationshipTypeEnum.AUTRE:
        return t("form.trustContacts.relationships.other");
      default:
        return t("form.trustContacts.relationships.other");
    }
  };

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t("form.trustContacts.selectRelationship")} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(RelationshipTypeEnum).map(([_, value]) => (
          <SelectItem key={value} value={value}>
            {getRelationshipLabel(value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
