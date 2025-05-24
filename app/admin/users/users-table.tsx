"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Role } from "@/generated/prisma";
import { updateUserRole } from "@/actions/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

interface UsersTableProps {
  users: User[];
}

type UserSortKey = "firstName" | "lastName" | "email" | "role" | "createdAt" | "updatedAt";

export function UsersTable({ users: initialUsers }: UsersTableProps) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTermEmail, setSearchTermEmail] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: UserSortKey;
    direction: "asc" | "desc" | "none";
  }>({ key: "createdAt", direction: "desc" });

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const onRoleChange = async (userId: string, newRole: Role) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      toast.success("User role updated successfully");
      router.refresh();
    } catch (error) {
        toast.error("Failed to update user role.");
        console.error("Role update error:", error);
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = [...users];

    if (searchTermEmail) {
      const lowerSearchEmail = searchTermEmail.toLowerCase();
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(lowerSearchEmail)
      );
    }

    if (sortConfig.direction !== "none") {
      filtered.sort((a, b) => {
        const { key, direction } = sortConfig;
        let comparison = 0;

        switch (key) {
          case "firstName":
          case "lastName":
          case "email":
          case "role": // Role is an enum, treat as string for sorting
            comparison = a[key].toLowerCase().localeCompare(b[key].toLowerCase());
            break;
          case "createdAt":
          case "updatedAt":
            comparison = new Date(a[key]).getTime() - new Date(b[key]).getTime();
            break;
          default:
            return 0; // Should not happen with UserSortKey
        }

        return direction === "asc" ? comparison : -comparison;
      });
    }
    return filtered;
  }, [users, searchTermEmail, sortConfig]);

  const handleSort = (key: UserSortKey) => {
    let direction: "asc" | "desc" | "none" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "none";
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader = ({ sortKey, children }: { sortKey: UserSortKey; children: React.ReactNode }) => (
    <TableHead>
      <Button variant="ghost" onClick={() => handleSort(sortKey)} className="px-2">
        {children}
        {sortConfig.key === sortKey && sortConfig.direction === "asc" && <ArrowUpDown className="ml-2 h-4 w-4" />}
        {sortConfig.key === sortKey && sortConfig.direction === "desc" && <ArrowUpDown className="ml-2 h-4 w-4 transform rotate-180" />}
        {sortConfig.key === sortKey && sortConfig.direction === "none" && <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground opacity-50" />}
        {sortConfig.key !== sortKey && <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-50 transition-opacity" />}
      </Button>
    </TableHead>
  );

  return (
    <div className="space-y-4">
        <div className="flex justify-start mb-4">
            <Input
            placeholder="Search by Email..."
            value={searchTermEmail}
            onChange={(e) => setSearchTermEmail(e.target.value)}
            className="max-w-sm"
            />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader sortKey="firstName">First Name</SortableHeader>
              <SortableHeader sortKey="lastName">Last Name</SortableHeader>
              <SortableHeader sortKey="email">Email</SortableHeader>
              <SortableHeader sortKey="role">Role</SortableHeader>
              <SortableHeader sortKey="createdAt">Created At</SortableHeader>
              <SortableHeader sortKey="updatedAt">Updated At</SortableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onValueChange={(value) =>
                      onRoleChange(user.id, value as Role)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>{user.role}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Role.ADMIN}>ADMIN</SelectItem>
                      <SelectItem value={Role.MANAGER}>MANAGER</SelectItem>
                      <SelectItem value={Role.USER}>USER</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(user.updatedAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
