"use client";

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
import { useState } from "react";
import { GenreDialog } from "./genre-dialog";
import { createGenre, updateGenre, deleteGenre } from "@/actions/genres";
import { toast } from "sonner";

interface GenresTableProps {
  genres: Genre[];
}

export function GenresTable({ genres: initialGenres }: GenresTableProps) {
  const [genres, setGenres] = useState(initialGenres);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

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

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAddGenre}>Add Genre</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {genres.map((genre) => (
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
