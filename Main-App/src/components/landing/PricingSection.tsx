"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function PricingSection() {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$29",
      frequency: "/month",
      description: "Ideal for small businesses and home users.",
      features: [
        "Up to 2 Cameras",
        "Real-time Alerts",
        "7-day Data Retention",
        "Email Notifications",
        "Standard Support",
      ],
      buttonText: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$79",
      frequency: "/month",
      description: "Perfect for growing businesses with multiple locations.",
      features: [
        "Up to 10 Cameras",
        "Real-time Alerts",
        "30-day Data Retention",
        "Email & SMS Notifications",
        "Priority Support",
        "Advanced Analytics",
      ],
      buttonText: "Choose Pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      frequency: "",
      description: "Tailored solutions for large organizations and complex needs.",
      features: [
        "Unlimited Cameras",
        "Real-time Alerts",
        "Custom Data Retention",
        "All Notification Types",
        "Dedicated Account Manager",
        "On-site Support",
        "API Access",
      ],
      buttonText: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Flexible Pricing Plans</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that best fits your security needs and budget.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`flex flex-col ${plan.highlight ? 'border-primary shadow-xl scale-105' : 'border-none shadow-lg'} hover:scale-[1.02] transition-all duration-300`}
            >
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-center py-6">
                <div className="text-5xl font-bold mb-2">
                  {plan.price === "Custom" ? plan.price : plan.price}
                </div>
                {plan.frequency && <p className="text-muted-foreground">{plan.frequency}</p>}
                
                <ul className="mt-8 space-y-3 text-left w-full px-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}