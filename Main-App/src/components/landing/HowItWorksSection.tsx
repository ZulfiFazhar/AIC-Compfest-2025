"use client";

import { Shield } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 text-background">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            How Raksha.ai Works
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Getting started with Raksha.ai is simple and straightforward
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              title: "Connect",
              description: "Link your existing CCTV system to Raksha.ai",
            },
            {
              step: 2,
              title: "Configure",
              description: "Set up detection zones and alert preferences",
            },
            {
              step: 3,
              title: "Monitor",
              description: "Our AI begins 24/7 surveillance",
            },
            {
              step: 4,
              title: "Protect",
              description: "Receive instant alerts when threats are detected",
            },
          ].map((item, index) => (
            <div key={index} className="text-center text-background">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
