"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

interface SignoutButtonProps {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
  children?: React.ReactNode;
  redirectTo?: string;
  showLoadingText?: boolean;
  onSignoutStart?: () => void;
  onSignoutSuccess?: () => void;
  onSignoutError?: (error: Error) => void;
}

export function SignoutButton({
  variant = "destructive",
  size = "default",
  className,
  children = "Logout",
  redirectTo = "/",
  showLoadingText = true,
  onSignoutStart,
  onSignoutSuccess,
  onSignoutError,
  ...props
}: SignoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignout = async () => {
    try {
      setIsLoading(true);
      onSignoutStart?.();

      await authClient.signOut();

      onSignoutSuccess?.();

      // Navigate to specified redirect path
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error("Logout failed");
      console.error("Logout error:", errorObj);
      onSignoutError?.(errorObj);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleSignout}
      disabled={isLoading}
      {...props}
    >
      {isLoading && showLoadingText ? "Logging out..." : children}
    </Button>
  );
}

// Export a simpler version for common use cases
export function SimpleSignoutButton(props: Partial<SignoutButtonProps>) {
  return <SignoutButton {...props} />;
}

// Export an icon-only version
export function SignoutIconButton(props: Partial<SignoutButtonProps>) {
  return (
    <SignoutButton size="icon" variant="ghost" {...props}>
      {props.children || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16,17 21,12 16,7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      )}
    </SignoutButton>
  );
}
