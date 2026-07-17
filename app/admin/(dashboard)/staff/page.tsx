"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { ApiError } from "@/lib/auth-context";
import {
  Role,
  StaffUser,
  createStaffMember,
  deactivateStaffMember,
  listRoles,
  listStaff,
  setStaffRoles,
} from "@/lib/admin-staff-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

const staffSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});
type StaffFormValues = z.infer<typeof staffSchema>;

export default function AdminStaffPage() {
  const { accessToken } = useStaffAuth();
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
  const [rolesEditingFor, setRolesEditingFor] = useState<StaffUser | null>(null);
  const [editRoleIds, setEditRoleIds] = useState<number[]>([]);
  const [savingRoles, setSavingRoles] = useState(false);

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const load = useCallback(async () => {
    if (!accessToken) return;
    const [staffData, rolesData] = await Promise.all([
      listStaff(accessToken),
      listRoles(accessToken),
    ]);
    setStaff(staffData);
    setRoles(rolesData);
  }, [accessToken]);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load staff."),
    );
  }, [load]);

  async function handleCreate(values: StaffFormValues) {
    if (!accessToken) return;
    setCreating(true);
    try {
      const created = await createStaffMember(accessToken, {
        ...values,
        roleIds: selectedRoleIds,
      });
      setStaff((prev) => [created, ...prev]);
      toast.success(`Staff member ${created.email} created.`);
      setCreateOpen(false);
      form.reset();
      setSelectedRoleIds([]);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to create staff member.");
    } finally {
      setCreating(false);
    }
  }

  function openRolesEditor(member: StaffUser) {
    setRolesEditingFor(member);
    setEditRoleIds(member.roles.map((r) => r.id));
  }

  async function handleSaveRoles() {
    if (!accessToken || !rolesEditingFor) return;
    setSavingRoles(true);
    try {
      const updated = await setStaffRoles(accessToken, rolesEditingFor.id, editRoleIds);
      setStaff((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      toast.success("Roles updated.");
      setRolesEditingFor(null);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to update roles.");
    } finally {
      setSavingRoles(false);
    }
  }

  async function handleDeactivate(member: StaffUser) {
    if (!accessToken) return;
    try {
      const updated = await deactivateStaffMember(accessToken, member.id);
      setStaff((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      toast.success(`${member.firstName} deactivated.`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to deactivate staff member.");
    }
  }

  const columns: ColumnDef<StaffUser>[] = [
    {
      id: "name",
      header: "Name",
      cell: ({ row }) => `${row.original.firstName} ${row.original.lastName ?? ""}`,
    },
    { accessorKey: "email", header: "Email" },
    {
      id: "roles",
      header: "Roles",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.roles.length === 0 ? (
            <span className="text-muted-foreground">No roles</span>
          ) : (
            row.original.roles.map((r) => (
              <Badge key={r.id} variant="secondary">
                {r.name}
              </Badge>
            ))
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "default" : "outline"}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => openRolesEditor(row.original)}>
            Edit roles
          </Button>
          {row.original.status === "active" && (
            <ConfirmDeleteDialog
              trigger={
                <Button size="sm" variant="destructive">
                  Deactivate
                </Button>
              }
              title={`Deactivate ${row.original.firstName}?`}
              description="They will no longer be able to log in to the admin panel."
              onConfirm={() => handleDeactivate(row.original)}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Staff</h1>
          <p className="text-sm text-muted-foreground">{staff.length} staff members</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>Add staff member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add staff member</DialogTitle>
            </DialogHeader>
            <form
              className="flex flex-col gap-3"
              onSubmit={form.handleSubmit(handleCreate)}
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" {...form.register("firstName")} />
                {form.formState.errors.firstName && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" {...form.register("lastName")} />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...form.register("password")} />
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Roles</Label>
                {roles.map((role) => (
                  <label key={role.id} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={selectedRoleIds.includes(role.id)}
                      onCheckedChange={(checked) =>
                        setSelectedRoleIds((prev) =>
                          checked ? [...prev, role.id] : prev.filter((id) => id !== role.id),
                        )
                      }
                    />
                    {role.name}
                  </label>
                ))}
              </div>
              <DialogFooter>
                <Button type="submit" disabled={creating}>
                  {creating ? "Creating…" : "Create staff member"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DataTable columns={columns} data={staff} emptyMessage="No staff members yet." />

      <Dialog open={!!rolesEditingFor} onOpenChange={(open) => !open && setRolesEditingFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Roles for {rolesEditingFor?.firstName}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {roles.map((role) => (
              <label key={role.id} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={editRoleIds.includes(role.id)}
                  onCheckedChange={(checked) =>
                    setEditRoleIds((prev) =>
                      checked ? [...prev, role.id] : prev.filter((id) => id !== role.id),
                    )
                  }
                />
                {role.name}
              </label>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRolesEditingFor(null)} disabled={savingRoles}>
              Cancel
            </Button>
            <Button onClick={handleSaveRoles} disabled={savingRoles}>
              {savingRoles ? "Saving…" : "Save roles"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
