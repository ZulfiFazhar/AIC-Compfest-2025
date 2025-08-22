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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Filter,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { AlertDetailDialog } from "@/components/dashboard/alert-detail-dialog";
import { Alert, alerts as defaultAlerts } from "@/types/alert";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(defaultAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const handleMarkAsReviewed = (id: string) => {
    const numericId = parseInt(id);
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === numericId ? { ...alert, status: "reviewed" } : alert
      )
    );
    toast.success("Alert marked as reviewed!");
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    toast.success("Alert deleted successfully!");
  };

  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsDetailDialogOpen(true);
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.camera.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.time.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      filterSeverity === "all" || alert.severity === filterSeverity;
    const matchesStatus =
      filterStatus === "all" || alert.status === filterStatus;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

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
                  <TableHead>Time</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No alerts found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">
                        {alert.type}
                      </TableCell>
                      <TableCell>{alert.camera}</TableCell>
                      <TableCell>{alert.time}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getSeverityBadgeVariant(alert.severity)}
                        >
                          {alert.severity.charAt(0).toUpperCase() +
                            alert.severity.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(alert.status)}>
                          {alert.status.charAt(0).toUpperCase() +
                            alert.status.slice(1)}
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
                              onClick={() =>
                                handleMarkAsReviewed(alert.id.toString())
                              }
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteAlert(alert.id)}
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
