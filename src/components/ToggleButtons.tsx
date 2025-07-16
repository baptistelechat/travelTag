import { useTravelTagStore } from "@/lib/store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Grid3X3 } from "lucide-react";

export function ToggleButtons() {
  const { downloadMode, setDownloadMode } = useTravelTagStore();

  return (
    <Tabs 
      value={downloadMode} 
      onValueChange={(value) => setDownloadMode(value as "single" | "grid")}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="single" className="flex items-center justify-center">
          <Download className="mr-2 h-4 w-4" />
          Version simple
        </TabsTrigger>
        <TabsTrigger value="grid" className="flex items-center justify-center">
          <Grid3X3 className="mr-2 h-4 w-4" />
          Grille 3x3
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
