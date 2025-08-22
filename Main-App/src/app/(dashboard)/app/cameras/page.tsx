"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface Camera {
  _id: string;
  name: string;
  location: string;
  ipAddress: string;
  status: string;
  streamUrl: string;
}

export default function CamerasPage() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [newCamera, setNewCamera] = useState({
    name: "",
    location: "",
    ipAddress: "",
    streamUrl: "",
  });
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);

  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = async () => {
    const res = await fetch("/api/cameras");
    const data = await res.json();
    setCameras(data);
  };

  const handleAddCamera = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/cameras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCamera),
    });
    setNewCamera({ name: "", location: "", ipAddress: "", streamUrl: "" });
    fetchCameras();
  };

  const handleUpdateCamera = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCamera) return;
    await fetch(`/api/cameras/${editingCamera._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingCamera),
    });
    setEditingCamera(null);
    fetchCameras();
  };

  const handleDeleteCamera = async (id: string) => {
    await fetch(`/api/cameras/${id}`, {
      method: "DELETE",
    });
    fetchCameras();
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Cameras</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleAddCamera}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          >
            <div>
              <Label htmlFor="name" className="mb-2">
                Camera Name
              </Label>
              <Input
                id="name"
                value={newCamera.name}
                onChange={(e) =>
                  setNewCamera({ ...newCamera, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="location" className="mb-2">
                Location
              </Label>
              <Input
                id="location"
                value={newCamera.location}
                onChange={(e) =>
                  setNewCamera({ ...newCamera, location: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="ipAddress" className="mb-2">
                IP Address
              </Label>
              <Input
                id="ipAddress"
                value={newCamera.ipAddress}
                onChange={(e) =>
                  setNewCamera({ ...newCamera, ipAddress: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="streamUrl" className="mb-2">
                Stream URL
              </Label>
              <Input
                id="streamUrl"
                value={newCamera.streamUrl}
                onChange={(e) =>
                  setNewCamera({ ...newCamera, streamUrl: e.target.value })
                }
                required
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Add Camera</Button>
            </div>
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cameras.map((camera) => (
                <TableRow key={camera._id}>
                  <TableCell>{camera.name}</TableCell>
                  <TableCell>{camera.location}</TableCell>
                  <TableCell>{camera.ipAddress}</TableCell>
                  <TableCell>{camera.status}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => setEditingCamera(camera)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Camera</DialogTitle>
                        </DialogHeader>
                        {editingCamera && (
                          <form
                            onSubmit={handleUpdateCamera}
                            className="grid gap-4 py-4"
                          >
                            <div>
                              <Label htmlFor="edit-name">Camera Name</Label>
                              <Input
                                id="edit-name"
                                value={editingCamera.name}
                                onChange={(e) =>
                                  setEditingCamera({
                                    ...editingCamera,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-location">Location</Label>
                              <Input
                                id="edit-location"
                                value={editingCamera.location}
                                onChange={(e) =>
                                  setEditingCamera({
                                    ...editingCamera,
                                    location: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-ipAddress">IP Address</Label>
                              <Input
                                id="edit-ipAddress"
                                value={editingCamera.ipAddress}
                                onChange={(e) =>
                                  setEditingCamera({
                                    ...editingCamera,
                                    ipAddress: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-streamUrl">Stream URL</Label>
                              <Input
                                id="edit-streamUrl"
                                value={editingCamera.streamUrl}
                                onChange={(e) =>
                                  setEditingCamera({
                                    ...editingCamera,
                                    streamUrl: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-status">Status</Label>
                              <Input
                                id="edit-status"
                                value={editingCamera.status}
                                onChange={(e) =>
                                  setEditingCamera({
                                    ...editingCamera,
                                    status: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <DialogFooter>
                              <Button type="submit">Save changes</Button>
                            </DialogFooter>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCamera(camera._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
