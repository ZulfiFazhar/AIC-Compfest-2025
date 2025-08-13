import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { PanelLeftOpen, PanelRightOpen } from "lucide-react";

export function CollapsedButton() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="flex items-center justify-between">
            {state !== "collapsed" && <span className="font-bold">Menu</span>}
            <Tooltip>
              <TooltipTrigger asChild onClick={toggleSidebar}>
                {state === "collapsed" ? <PanelLeftOpen /> : <PanelRightOpen />}
              </TooltipTrigger>
              {state === "collapsed" ? (
                <TooltipContent side="right">Open Menu</TooltipContent>
              ) : (
                <TooltipContent side="right">Close Menu</TooltipContent>
              )}
            </Tooltip>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
