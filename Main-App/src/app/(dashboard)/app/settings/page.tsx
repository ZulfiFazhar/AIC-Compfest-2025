"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// Define Zod schema for settings form
const settingsFormSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  defaultAlertSeverity: z.enum(["high", "medium", "low"]),
  dataRetentionDays: z.number().min(1, "Must be at least 1 day"),
  timezone: z.string(),
  twoFactorAuth: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export default function SettingsPage() {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      defaultAlertSeverity: "medium",
      dataRetentionDays: 30,
      timezone: "UTC+7",
      twoFactorAuth: false,
    },
  });

  const onSubmit = (values: SettingsFormValues) => {
    console.log("Settings saved:", values);
    toast.success("Settings updated successfully!");
    // In a real app, you would send these values to a backend API
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Application Settings</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage general application preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="UTC+7">UTC+7 (Jakarta)</SelectItem>
                        <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
                        <SelectItem value="UTC-5">UTC-5 (New York)</SelectItem>
                        <SelectItem value="UTC+9">UTC+9 (Tokyo)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Set the timezone for your dashboard and alerts.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataRetentionDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Retention (Days)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 30" {...field} />
                    </FormControl>
                    <FormDescription>
                      Number of days to retain alert and activity data.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Email Notifications
                      </FormLabel>
                      <FormDescription>
                        Receive alert notifications via email.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="smsNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        SMS Notifications
                      </FormLabel>
                      <FormDescription>
                        Receive critical alerts via SMS. (Carrier rates may
                        apply)
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="defaultAlertSeverity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Alert Severity</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select default severity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Set the default severity for new alerts.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Enhance your account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="twoFactorAuth"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Two-Factor Authentication
                      </FormLabel>
                      <FormDescription>
                        Add an extra layer of security to your account.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit">Save Settings</Button>
        </form>
      </Form>
    </div>
  );
}
