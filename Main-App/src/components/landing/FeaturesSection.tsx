"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Bell, CheckCircle } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Real-time Monitoring",
      description: "24/7 live surveillance with no delay. Watch your property from anywhere in the world.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Threat Detection",
      description: "Advanced AI detects violence and break-ins instantly with 99% accuracy.",
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Instant Notifications",
      description: "Get real-time alerts directly to your phone when threats are detected.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Advanced Security Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Raksha.ai combines cutting-edge AI with your existing CCTV system to provide unparalleled protection
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-balance">How Raksha.ai Protects You</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>AI analyzes video feeds 24/7 to detect unusual activities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Instant alerts sent to your phone with detailed information</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Integration with local emergency services for rapid response</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Cloud storage for evidence and incident review</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
            <div className="bg-background rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
                <span className="text-sm font-medium">System Status: Secure</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span>Cameras Active</span>
                  <span className="font-medium">8/8</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span>Threat Detection</span>
                  <span className="font-medium text-green-500">Active</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span>Notifications</span>
                  <span className="font-medium">Enabled</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Last Incident</span>
                  <span className="font-medium">None</span>
                </div>
              </div>
              
              <Button className="w-full mt-6">
                <Shield className="mr-2 h-4 w-4" />
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}