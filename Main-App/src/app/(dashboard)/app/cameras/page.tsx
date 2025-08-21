"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, Edit, Trash2, Eye, Search } from "lucide-react";
import { toast } from "sonner";
import { MultiCameraGrid } from "@/components/dashboard/multi-camera-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveCameraViewDialog } from "@/components/dashboard/live-camera-view-dialog"; // Import the new component

// Define Camera interface
interface Camera {
  id: string;
  name: string;
  location: string;
  status: "active" | "offline" | "maintenance";
  ipAddress: string;
}

// Define Zod schema for camera form
const cameraFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Camera name must be at least 2 characters." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  status: z.enum(["active", "offline", "maintenance"]),
  ipAddress: z
    .string()
    .regex(
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      { message: "Invalid IP address format." }
    ),
});

type CameraFormValues = z.infer<typeof cameraFormSchema>;

export default function CamerasPage() {
  const [cameras, setCameras] = useState<Camera[]>([
    {
      id: "cam-001",
      name: "Main Entrance",
      location: "Front Building",
      status: "active",
      ipAddress: "192.168.1.101",
    },
    {
      id: "cam-002",
      name: "Parking Lot",
      location: "East Wing",
      status: "active",
      ipAddress: "192.168.1.102",
    },
    {
      id: "cam-003",
      name: "Back Door",
      location: "Rear Entrance",
      status: "offline",
      ipAddress: "192.168.1.103",
    },
    {
      id: "cam-004",
      name: "Lobby",
      location: "Ground Floor",
      status: "maintenance",
      ipAddress: "192.168.1.104",
    },
  ]);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCameraForLiveView, setSelectedCameraForLiveView] =
    useState<Camera | null>(null); // New state for live view
  const [isLiveViewDialogOpen, setIsLiveViewDialogOpen] = useState(false); // New state for live view dialog

  const form = useForm<CameraFormValues>({
    resolver: zodResolver(cameraFormSchema),
    defaultValues: {
      name: "",
      location: "",
      status: "active",
      ipAddress: "",
    },
    mode: "onChange", // Added mode: "onChange"
  });

  const handleAddCamera = () => {
    setEditingCamera(null);
    form.reset({ name: "", location: "", status: "active", ipAddress: "" }); // Corrected reset values
    setIsAddEditDialogOpen(true);
  };

  const handleEditCamera = (camera: Camera) => {
    setEditingCamera(camera);
    form.reset(camera);
    setIsAddEditDialogOpen(true);
  };

  const handleDeleteCamera = (id: string) => {
    setCameras((prev) => prev.filter((cam) => cam.id !== id));
    toast.success("Camera deleted successfully!");
  };

  const onSubmit = (values: CameraFormValues) => {
    if (editingCamera) {
      // Edit existing camera
      setCameras((prev) =>
        prev.map((cam) =>
          cam.id === editingCamera.id ? { ...cam, ...values } : cam
        )
      );
      toast.success("Camera updated successfully!");
    } else {
      // Add new camera
      const newCamera: Camera = {
        id: `cam-${Date.now()}`, // Simple unique ID
        ...values,
      };
      setCameras((prev) => [...prev, newCamera]);
      toast.success("Camera added successfully!");
    }
    setIsAddEditDialogOpen(false);
  };

  const handleViewLive = (camera: Camera) => {
    setSelectedCameraForLiveView(camera);
    setIsLiveViewDialogOpen(true);
  };

  const filteredCameras = cameras.filter(
    (camera) =>
      camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camera.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camera.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status: Camera["status"]) => {
    switch (status) {
      case "active":
        return "active";
      case "offline":
        return "destructive";
      case "maintenance":
        return "secondary";
      default:
        return "active";
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Cameras Management</h1>
        <Button onClick={handleAddCamera}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Camera
        </Button>
      </div>

      <Tabs defaultValue="live-cameras" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="live-cameras">Live Cameras</TabsTrigger>
          <TabsTrigger value="camera-details">Camera Details</TabsTrigger>
        </TabsList>
        <TabsContent value="live-cameras">
          <MultiCameraGrid cameras={cameras} onViewLive={handleViewLive} />
        </TabsContent>
        <TabsContent value="camera-details">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Cameras</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search cameras..."
                    className="pl-8 w-[200px] md:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCameras.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No cameras found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCameras.map((camera) => (
                        <TableRow key={camera.id}>
                          <TableCell className="font-medium">
                            {camera.name}
                          </TableCell>
                          <TableCell>{camera.location}</TableCell>
                          <TableCell>{camera.ipAddress}</TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadgeVariant(camera.status)}
                            >
                              {camera.status.charAt(0).toUpperCase() +
                                camera.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewLive(camera)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditCamera(camera)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteCamera(camera.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Camera Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCamera ? "Edit Camera" : "Add New Camera"}
            </DialogTitle>
            <DialogDescription>
              {editingCamera
                ? "Make changes to your camera here."
                : "Add a new camera to your system."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form} key={editingCamera?.id || "new-camera-form"}>
            {" "}
            {/* Added key prop */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Camera Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Main Entrance Camera"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Building A, Floor 1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ipAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IP Address</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 192.168.1.100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">
                  {editingCamera ? "Save Changes" : "Add Camera"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Live Camera View Dialog */}
      <LiveCameraViewDialog
        camera={selectedCameraForLiveView}
        isOpen={isLiveViewDialogOpen}
        onClose={() => setIsLiveViewDialogOpen(false)}
      />
    </div>
  );
}
