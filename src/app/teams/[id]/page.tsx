"use client";

import { Plus, Search, Share2, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PokemonCard } from "@/components/pokemon/pokemon-card";
import { TeamImportExportDialog } from "@/components/team-import-export-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTeams } from "@/hooks/use-teams";
import { getSpecies, toID } from "@/lib/pkmn";
import { pokemonSpriteById } from "@/lib/sprites";
import type { TeamMember } from "@/types/team";
import { GENERATION_INFO } from "@/types/team";

export default function TeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.id as string;
  const { isLoaded, getTeam, addMember, removeMember, updateTeam } = useTeams();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");

  const team = useMemo(() => getTeam(teamId), [getTeam, teamId]);

  useEffect(() => {
    if (isLoaded && !team) {
      router.push("/teams");
    }
  }, [isLoaded, team, router]);

  useEffect(() => {
    if (team) {
      setEditedName(team.name);
    }
  }, [team]);

  if (!isLoaded) {
    const skeletonKeys = Array.from(
      { length: 6 },
      (_, i) => `team-skeleton-${i}`,
    );
    return (
      <div className="p-4 md:p-6">
        <div className="h-8 w-32 bg-muted animate-pulse rounded mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skeletonKeys.map((key) => (
            <div
              key={key}
              className="aspect-square rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!team) {
    return null;
  }

  const genInfo = GENERATION_INFO[team.generation];
  const [startId, endId] = genInfo.pokemonRange;

  // Generate list of available Pokemon IDs for this generation
  const availablePokemonIds: number[] = [];
  for (let id = startId; id <= endId; id++) {
    if (!team.members.some((m) => m.id === id)) {
      availablePokemonIds.push(id);
    }
  }

  // Filter Pokemon based on search (by ID)
  const filteredPokemonIds = searchQuery.trim()
    ? availablePokemonIds.filter((id) =>
        id.toString().includes(searchQuery.trim()),
      )
    : availablePokemonIds;

  const handleAddPokemon = (id: number) => {
    const species = getSpecies(toID(id.toString()));
    if (!species) return;

    const member: TeamMember = {
      id: species.num,
      name: species.name,
      sprite: pokemonSpriteById(species.num),
    };
    addMember(teamId, member);
    setIsAddOpen(false);
    setSearchQuery("");
  };

  const handleSaveName = () => {
    if (editedName.trim() && editedName !== team.name) {
      updateTeam(teamId, { name: editedName.trim() });
    }
    setIsEditingName(false);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          {isEditingName ? (
            <div className="flex gap-2 items-center">
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveName();
                  if (e.key === "Escape") {
                    setEditedName(team.name);
                    setIsEditingName(false);
                  }
                }}
                onBlur={handleSaveName}
                autoFocus
                className="text-lg font-medium h-8"
              />
            </div>
          ) : (
            <button
              type="button"
              className="text-lg font-medium hover:text-muted-foreground text-left"
              onClick={() => setIsEditingName(true)}
              title="Click to edit name"
            >
              {team.name}
            </button>
          )}
          <p className="text-xs text-muted-foreground">
            {genInfo.name} ({genInfo.label}) • {team.members.length}/6 pokemon
          </p>
        </div>
        {team.members.length > 0 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsExportOpen(true)}
            title="Export team"
          >
            <Share2 className="size-4" />
            <span className="hidden sm:inline ml-1">export</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {team.members.map((member) => (
          <div key={member.id} className="relative group">
            <button
              type="button"
              onClick={() => removeMember(teamId, member.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive/10 hover:bg-destructive/20 rounded-full p-1"
            >
              <X className="size-3 text-destructive" />
            </button>
            <PokemonCard id={member.id} name={member.name} />
          </div>
        ))}

        {team.members.length < 6 && (
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="aspect-square rounded-lg border border-dashed border-muted-foreground/30 flex flex-col items-center justify-center hover:border-muted-foreground/50 hover:bg-muted/30 transition-colors"
              >
                <Plus className="size-8 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">
                  add pokemon
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>add pokemon</DialogTitle>
                <DialogDescription>
                  Select a {genInfo.name} pokemon (#{startId}-{endId}) to add to
                  your team
                </DialogDescription>
              </DialogHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search by number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <ScrollArea className="h-[300px] pr-4">
                <div className="grid grid-cols-4 gap-2">
                  {filteredPokemonIds.slice(0, 60).map((id) => (
                    <PokemonPickerButton
                      key={id}
                      id={id}
                      onSelect={handleAddPokemon}
                    />
                  ))}
                </div>
                {filteredPokemonIds.length > 60 && (
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Showing first 60 results. Use search to find more.
                  </p>
                )}
                {filteredPokemonIds.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    {searchQuery
                      ? `No pokemon found matching "${searchQuery}"`
                      : "All pokemon from this generation are in your team!"}
                  </p>
                )}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}

        {/* Empty slots */}
        {Array.from(
          { length: Math.max(0, 5 - team.members.length) },
          (_, i) => `empty-${teamId}-${team.members.length}-${i}`,
        ).map((key) => (
          <div
            key={key}
            className="aspect-square rounded-lg border border-dashed border-muted-foreground/20"
          />
        ))}
      </div>

      <TeamImportExportDialog
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        mode="export"
        teamId={teamId}
      />
    </div>
  );
}

function PokemonPickerButton({
  id,
  onSelect,
}: {
  id: number;
  onSelect: (id: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className="flex flex-col items-center p-2 rounded-lg hover:bg-muted transition-colors"
    >
      <Image
        src={pokemonSpriteById(id)}
        alt={`Pokemon #${id}`}
        width={40}
        height={40}
        className="size-10 pixelated"
        unoptimized
      />
      <span className="text-[10px] text-muted-foreground">#{id}</span>
    </button>
  );
}
