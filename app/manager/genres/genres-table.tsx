"use client";

import React, { useState, useMemo } from "react";
import { Genre } from "@/generated/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GenreDialog } from "./genre-dialog";
import { createGenre, updateGenre, deleteGenre } from "@/actions/genres";
import { toast } from "sonner";
import { ArrowUpDown } from "lucide-react";

interface GenresTableProps {
  genres: Genre[];
}

export function GenresTable({ genres: initialGenres }: GenresTableProps) {
  const [genres, setGenres] = useState(initialGenres);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "none">("none");

  const handleAddGenre = () => {
    setSelectedGenre(null);
    setIsDialogOpen(true);
  };

  const handleEditGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setIsDialogOpen(true);
  };

  const handleDeleteGenre = async (id: string) => {
    try {
      await deleteGenre(id);
      setGenres(genres.filter((genre) => genre.id !== id));
      toast.success("Genre deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete genre");
      }
    }
  };

  const handleSaveGenre = async (name: string) => {
    try {
      if (selectedGenre) {
        const updatedGenre = await updateGenre(selectedGenre.id, name);
        if (updatedGenre) {
          setGenres(
            genres.map((genre) =>
              genre.id === updatedGenre.id ? updatedGenre : genre
            )
          );
          toast.success("Genre updated successfully");
        }
      } else {
        const newGenre = await createGenre(name);
        if (newGenre) {
          setGenres([...genres, newGenre]);
          toast.success("Genre created successfully");
        }
      }
      setIsDialogOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          selectedGenre ? "Failed to update genre" : "Failed to create genre"
        );
      }
    }
  };

  const filteredAndSortedGenres = useMemo(() => {
    let filtered = [...genres];
    if (searchTerm) {
      filtered = filtered.filter((genre) =>
        genre.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortDirection !== "none") {
      filtered.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortDirection === "asc" ? -1 : 1;
        if (nameA > nameB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [genres, searchTerm, sortDirection]);

  const toggleSortDirection = () => {
    if (sortDirection === "none") {
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection("none");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Search by genre name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAddGenre}>Add Genre</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={toggleSortDirection} className="px-2">
                  Name
                  {sortDirection === "asc" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  {sortDirection === "desc" && <ArrowUpDown className="ml-2 h-4 w-4 transform rotate-180" />}
                  {sortDirection === "none" && <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground opacity-50" />}
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedGenres.map((genre) => (
              <TableRow key={genre.id}>
                <TableCell className="font-medium">{genre.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditGenre(genre)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteGenre(genre.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <GenreDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        genre={selectedGenre}
        onSave={handleSaveGenre}
      />
    </div>
  );
}
