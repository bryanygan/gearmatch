import { useState } from "react";
import { Menu, X, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Crosshair className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              GearMatch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </a>
            <a href="#why-trust-us" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Why Trust Us
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="hero" size="default" asChild>
              <Link to="/quiz/mouse">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-3">
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                How It Works
              </a>
              <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                Categories
              </a>
              <a href="#why-trust-us" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                Why Trust Us
              </a>
              <Button variant="hero" className="mt-2" asChild>
                <Link to="/quiz/mouse">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
