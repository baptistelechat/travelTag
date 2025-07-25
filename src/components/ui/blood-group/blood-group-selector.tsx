import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bloodGroups } from "@/lib/data/blood-groups";
import { useTranslation } from "@/lib/i18n";

export interface BloodGroupSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function BloodGroupSelector({
  value,
  onChange,
  disabled = false,
}: BloodGroupSelectorProps) {
  const { t } = useTranslation();

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={t("form.health.placeholders.bloodGroup")} />
      </SelectTrigger>
      <SelectContent>
        {bloodGroups.map((group) => (
          <SelectItem key={group.id} value={group.id}>
            {group.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
