"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      content:
        "Raksha.ai saved my store from a break-in. The instant notification allowed me to call police immediately.",
    },
    {
      name: "Michael Chen",
      role: "Security Manager",
      content:
        "The violence detection feature is incredible. It identified a fight in our parking lot before anyone was hurt.",
    },
    {
      name: "Robert Garcia",
      role: "Homeowner",
      content:
        "I feel so much safer knowing Raksha.ai is watching my home. The app is incredibly intuitive.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 text-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            See what our customers say about Raksha.ai
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-foreground/15 text-background"
            >
              <CardContent>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted mb-6">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center">
                  <div className="bg-muted text-foreground rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
