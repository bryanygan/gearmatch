import { Crosshair } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:max-w-xs">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Crosshair className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-lg">GearMatch</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Find your perfect peripherals with personalized recommendations based on how you actually use your gear.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {/* Quizzes Column */}
            <div>
              <h4 className="font-display font-semibold text-sm mb-4">Quizzes</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/quiz/mouse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Mice
                  </Link>
                </li>
                <li>
                  <Link to="/quiz/audio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Audio
                  </Link>
                </li>
                <li>
                  <Link to="/quiz/keyboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Keyboards
                  </Link>
                </li>
                <li>
                  <Link to="/quiz/monitor" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Monitors
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-display font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="font-display font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/affiliate-disclosure" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Affiliate Disclosure
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GearMatch. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            We may earn a commission when you buy through our links.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
