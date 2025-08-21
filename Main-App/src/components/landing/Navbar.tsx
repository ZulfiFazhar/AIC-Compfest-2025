"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? "bg-background/80 backdrop-blur-md shadow-lg py-2 rounded-full max-w-7xl mx-auto" 
        : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Raksha<span className="text-primary">.ai</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="#features" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
            <Link href="#testimonials" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
            <Link href="#pricing" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" className="flex-1">Sign In</Button>
              <Button className="flex-1">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}