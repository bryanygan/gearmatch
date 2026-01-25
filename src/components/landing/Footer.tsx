import { Crosshair } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Crosshair className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-lg">GearMatch</span>
          </a>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground md:absolute md:left-1/2 md:-translate-x-1/2">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#categories" className="hover:text-foreground transition-colors">
              Categories
            </a>
            <a href="#why-trust-us" className="hover:text-foreground transition-colors">
              Why Trust Us
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 GearMatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
