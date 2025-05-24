"use client";

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
import { Role } from "@/generated/prisma";
import { updateUserRole } from "@/actions/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function UsersTable({
  users,
}: {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  }[];
}) {
  const router = useRouter();
  const onRoleChange = async (userId: string, role: Role) => {
    await updateUserRole(userId, role);
    toast.success("User role updated successfully");
    router.refresh();
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
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
              <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{user.updatedAt.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
