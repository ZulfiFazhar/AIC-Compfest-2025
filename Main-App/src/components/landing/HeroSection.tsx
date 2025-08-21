"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Eye, Bell, Play, ArrowRight, CheckCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroSection() {
  const isMobile = useIsMobile();
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-12">
          <div className="flex-1 text-center">
            <h1 className="text-background text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance animate-in fade-in-0 slide-in-from-top-2 duration-700 delay-100">
              Smart CCTV Monitoring Reinvented
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 animate-in fade-in-0 slide-in-from-top-2 duration-700 delay-200">
              Raksha.ai transforms your existing CCTV system into an intelligent
              security solution that detects threats, prevents crimes, and keeps
              you notified in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in-0 slide-in-from-top-2 duration-700 delay-300">
              <Button
                size="lg"
                className="text-base rounded-full bg-foreground/30"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8">
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <AspectRatio
                    ratio={isMobile ? 16 / 9 : 12 / 5}
                    className="bg-black flex items-center justify-center relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="relative z-10 text-center p-4">
                      <div className="flex justify-center mb-4">
                        <div className="bg-red-500 rounded-full w-3 h-3 animate-pulse mr-2"></div>
                        <div className="bg-yellow-500 rounded-full w-3 h-3 mr-2"></div>
                        <div className="bg-green-500 rounded-full w-3 h-3"></div>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">
                        Live Feed - Main Entrance
                      </h3>
                      <p className="text-green-400 text-sm">All Clear</p>
                    </div>

                    {/* animation */}
                    <div
                      className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-lg border-2 border-red-500 animate-ping ${
                        activeFeature === 1 ? "opacity-100" : "opacity-0"
                      } transition-opacity`}
                    ></div>
                    <div
                      className={`absolute bottom-1/3 right-1/4 w-24 h-24 rounded-lg border-2 border-yellow-500 animate-ping ${
                        activeFeature === 2 ? "opacity-100" : "opacity-0"
                      } transition-opacity`}
                    ></div>
                  </AspectRatio>

                  <div className="p-4 bg-background">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">
                          Raksha.ai Protection
                        </span>
                      </div>
                      <Badge variant="active">Active</Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div
                        className={`p-2 rounded text-center text-xs ${
                          activeFeature === 0
                            ? "bg-primary text-background"
                            : "bg-muted"
                        }`}
                      >
                        <Eye className="h-4 w-4 mx-auto mb-1" />
                        Monitoring
                      </div>
                      <div
                        className={`p-2 rounded text-center text-xs ${
                          activeFeature === 1
                            ? "bg-destructive text-background"
                            : "bg-muted"
                        }`}
                      >
                        <Shield className="h-4 w-4 mx-auto mb-1" />
                        Detection
                      </div>
                      <div
                        className={`p-2 rounded text-center text-xs ${
                          activeFeature === 2
                            ? "bg-yellow-500 text-background"
                            : "bg-muted"
                        }`}
                      >
                        <Bell className="h-4 w-4 mx-auto mb-1" />
                        Alert
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
