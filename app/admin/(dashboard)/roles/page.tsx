"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { ApiError } from "@/lib/auth-context";
import {
  Permission,
  Role,
  createPermission,
  createRole,
  deleteRole,
  listPermissions,
  listRoles,
  setRolePermissions,
} from "@/lib/admin-staff-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

export default function AdminRolesPage() {
  const { accessToken } = useStaffAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [newRoleName, setNewRoleName] = useState("");
  const [creatingRole, setCreatingRole] = useState(false);
  const [newPermissionName, setNewPermissionName] = useState("");
  const [creatingPermission, setCreatingPermission] = useState(false);

  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editPermissionIds, setEditPermissionIds] = useState<number[]>([]);
  const [savingPermissions, setSavingPermissions] = useState(false);

  const load = useCallback(async () => {
    if (!accessToken) return;
    const [rolesData, permissionsData] = await Promise.all([
      listRoles(accessToken),
      listPermissions(accessToken),
    ]);
    setRoles(rolesData);
    setPermissions(permissionsData);
  }, [accessToken]);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load roles."),
    );
  }, [load]);

  async function handleCreateRole() {
    if (!accessToken || !newRoleName.trim()) return;
    setCreatingRole(true);
    try {
      const created = await createRole(accessToken, newRoleName.trim());
      setRoles((prev) => [...prev, { ...created, permissions: [] }]);
      setNewRoleName("");
      toast.success(`Role "${created.name}" created.`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to create role.");
    } finally {
      setCreatingRole(false);
    }
  }

  async function handleDeleteRole(role: Role) {
    if (!accessToken) return;
    try {
      await deleteRole(accessToken, role.id);
      setRoles((prev) => prev.filter((r) => r.id !== role.id));
      toast.success(`Role "${role.name}" deleted.`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to delete role.");
    }
  }

  async function handleCreatePermission() {
    if (!accessToken || !newPermissionName.trim()) return;
    setCreatingPermission(true);
    try {
      const created = await createPermission(accessToken, newPermissionName.trim());
      setPermissions((prev) => [...prev, created]);
      setNewPermissionName("");
      toast.success(`Permission "${created.name}" created.`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to create permission.");
    } finally {
      setCreatingPermission(false);
    }
  }

  function openPermissionsEditor(role: Role) {
    setEditingRole(role);
    setEditPermissionIds(role.permissions.map((p) => p.id));
  }

  async function handleSavePermissions() {
    if (!accessToken || !editingRole) return;
    setSavingPermissions(true);
    try {
      const updated = await setRolePermissions(accessToken, editingRole.id, editPermissionIds);
      setRoles((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      toast.success(`Permissions updated for "${updated.name}".`);
      setEditingRole(null);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to update permissions.");
    } finally {
      setSavingPermissions(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Roles & Permissions</h1>
        <p className="text-sm text-muted-foreground">
          Manage staff roles and the permissions attached to each.
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Roles</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="New role name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={handleCreateRole} disabled={creatingRole || !newRoleName.trim()}>
              {creatingRole ? "Adding…" : "Add role"}
            </Button>
          </div>

          <div className="flex flex-col divide-y">
            {roles.map((role) => (
              <div key={role.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-medium">{role.name}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {role.permissions.length === 0 ? (
                      <span className="text-xs text-muted-foreground">No permissions</span>
                    ) : (
                      role.permissions.map((p) => (
                        <Badge key={p.id} variant="secondary">
                          {p.name}
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openPermissionsEditor(role)}>
                    Edit permissions
                  </Button>
                  <ConfirmDeleteDialog
                    trigger={
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    }
                    title={`Delete role "${role.name}"?`}
                    description="Staff members with this role will lose the permissions it grants."
                    onConfirm={() => handleDeleteRole(role)}
                  />
                </div>
              </div>
            ))}
            {roles.length === 0 && (
              <p className="py-3 text-sm text-muted-foreground">No roles yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Permissions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="New permission name"
              value={newPermissionName}
              onChange={(e) => setNewPermissionName(e.target.value)}
              className="max-w-xs"
            />
            <Button
              onClick={handleCreatePermission}
              disabled={creatingPermission || !newPermissionName.trim()}
            >
              {creatingPermission ? "Adding…" : "Add permission"}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {permissions.map((p) => (
              <Badge key={p.id} variant="outline">
                {p.name}
              </Badge>
            ))}
            {permissions.length === 0 && (
              <p className="text-sm text-muted-foreground">No permissions yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingRole} onOpenChange={(open) => !open && setEditingRole(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Permissions for {editingRole?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {permissions.map((p) => (
              <label key={p.id} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={editPermissionIds.includes(p.id)}
                  onCheckedChange={(checked) =>
                    setEditPermissionIds((prev) =>
                      checked ? [...prev, p.id] : prev.filter((id) => id !== p.id),
                    )
                  }
                />
                {p.name}
              </label>
            ))}
            {permissions.length === 0 && (
              <p className="text-sm text-muted-foreground">No permissions to assign yet.</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingRole(null)} disabled={savingPermissions}>
              Cancel
            </Button>
            <Button onClick={handleSavePermissions} disabled={savingPermissions}>
              {savingPermissions ? "Saving…" : "Save permissions"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
