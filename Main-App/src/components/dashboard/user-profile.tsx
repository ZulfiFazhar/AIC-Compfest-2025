"use client";

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserProfile as SessionData } from "@/types/user";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function UserProfile() {
  const isMobile = useIsMobile();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setSessionData(data);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setSessionData(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!sessionData) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-around items-center gap-4 p-2 rounded-lg cursor-pointer bg-background text-foreground hover:bg-muted">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage
              src={sessionData.user.image || "https://via.placeholder.com/150"}
              alt={sessionData.user.name}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {sessionData.user.name}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {sessionData.user.email}
            </span>
          </div>
          <IconDotsVertical className="ml-auto size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={
                  sessionData.user.image || "https://via.placeholder.com/150"
                }
                alt={sessionData.user.name}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {sessionData.user.name}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {sessionData.user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconUserCircle />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconCreditCard />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <IconLogout />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
