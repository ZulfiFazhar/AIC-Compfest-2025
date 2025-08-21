"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Zap, ShieldCheck, Cloud, Scale, Users } from "lucide-react";

export function WhyChooseUsSection() {
  const benefits = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Intelligent AI",
      description: "Leverage cutting-edge AI for superior threat detection and reduced false positives.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Instant Response",
      description: "Get real-time alerts and rapid incident response capabilities.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Enhanced Security",
      description: "Proactive monitoring helps prevent incidents before they escalate.",
    },
    {
      icon: <Cloud className="h-8 w-8 text-primary" />,
      title: "Cloud Scalability",
      description: "Easily scale your surveillance as your needs grow, without hardware limitations.",
    },
    {
      icon: <Scale className="h-8 w-8 text-primary" />,
      title: "Cost-Effective",
      description: "Optimize security operations and reduce the need for extensive human monitoring.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "User-Friendly",
      description: "Intuitive dashboard and mobile app for easy management and access.",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why Choose Raksha.ai?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the next generation of security with our advanced AI-powered solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}