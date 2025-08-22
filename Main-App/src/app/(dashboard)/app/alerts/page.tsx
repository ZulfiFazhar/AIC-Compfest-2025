/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, CheckCircle, Trash2, Filter, Eye } from "lucide-react";
import { toast } from "sonner";
import { AlertDetailDialog } from "@/components/dashboard/alert-detail-dialog";

interface Alert {
  _id: string;
  timestamp: string;
  type: string;
  severity: "high" | "medium" | "low" | "info";
  cameraId?: string;
  cameraName?: string; // Added cameraName
  cameraLocation?: string; // Added cameraLocation
  userId?: string;
  details?: any;
  status?: "new" | "reviewed"; // Assuming alerts can have a status
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const fetchAlerts = useCallback(async () => {
    let eventsUrl = "/api/events?";
    if (filterSeverity !== "all") {
      eventsUrl += `severity=${filterSeverity}&`;
    }
    if (filterStatus !== "all") {
      eventsUrl += `status=${filterStatus}&`;
    }
    if (searchTerm) {
      eventsUrl += `searchTerm=${encodeURIComponent(searchTerm)}&`;
    }

    try {
      const res = await fetch(eventsUrl);
      if (!res.ok)
        throw new Error(`HTTP error! status: ${res.status} for events`);

      const eventsData: Alert[] = await res.json();

      setAlerts(eventsData);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      toast.error("Failed to load alerts.");
    }
  }, [searchTerm, filterSeverity, filterStatus]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const handleMarkAsReviewed = async (_id: string) => {
    const res = await fetch(`/api/events/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "reviewed" }),
    });

    if (res.ok) {
      setAlerts((prev) =>
        prev.map((alert) =>
          alert._id === _id ? { ...alert, status: "reviewed" } : alert
        )
      );
      toast.success("Alert marked as reviewed!");
    } else {
      toast.error("Failed to mark alert as reviewed.");
    }
  };

  const handleDeleteAlert = async (_id: string) => {
    const res = await fetch(`/api/events/${_id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setAlerts((prev) => prev.filter((alert) => alert._id !== _id));
      toast.success("Alert deleted successfully!");
    } else {
      toast.error("Failed to delete alert.");
    }
  };

  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsDetailDialogOpen(true);
  };

  const getSeverityBadgeVariant = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getStatusBadgeVariant = (status: Alert["status"]) => {
    return status === "new" ? "destructive" : "default";
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Alerts Overview</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Recent Security Alerts</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search alerts..."
                  className="pl-8 w-full sm:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select onValueChange={setFilterSeverity} defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Filter by Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setFilterStatus} defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Camera</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No alerts found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  alerts.map((alert) => (
                    <TableRow key={alert._id}>
                      <TableCell className="font-medium">
                        {alert.type}
                      </TableCell>
                      <TableCell>{alert.cameraName}</TableCell>
                      <TableCell>{alert.cameraLocation}</TableCell>
                      <TableCell>
                        {new Date(alert.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getSeverityBadgeVariant(alert.severity)}
                        >
                          {alert.severity.charAt(0).toUpperCase() +
                            alert.severity.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(alert.status || "new")}
                        >
                          {(alert.status || "new").charAt(0).toUpperCase() +
                            (alert.status || "new").slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(alert)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {alert.status === "new" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsReviewed(alert._id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteAlert(alert._id)}
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

      {selectedAlert && (
        <AlertDetailDialog
          alert={selectedAlert}
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          onMarkAsReviewed={handleMarkAsReviewed}
        />
      )}
    </div>
  );
}
