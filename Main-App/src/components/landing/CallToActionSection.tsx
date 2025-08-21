"use client";

import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Secure Your Property?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Raksha.ai for their security needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-primary">
              Start Free 14-Day Trial
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              Schedule a Demo
            </Button>
          </div>
          <p className="mt-4 text-primary-foreground/80 text-sm">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}