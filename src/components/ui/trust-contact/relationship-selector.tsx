import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RelationshipTypeEnum } from "@/lib/types/relationship-type.enum";
import { relationshipLabels } from "@/lib/data/relationship-labels";

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
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sélectionner une relation" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(RelationshipTypeEnum).map(([_, value]) => (
          <SelectItem key={value} value={value}>
            {relationshipLabels[value]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
