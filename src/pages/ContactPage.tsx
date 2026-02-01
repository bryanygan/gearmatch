import { Link } from "react-router-dom";
import { Mail, MessageSquare, Bug, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Have a question, found a bug, or want to suggest a feature? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* General Contact */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-primary/10 text-primary">
                <Mail className="w-7 h-7" />
              </div>
              <h2 className="font-display text-2xl font-semibold mb-3">General Inquiries</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Questions about GearMatch, partnership opportunities, or just want to say hi?
              </p>
              <a
                href="mailto:hello@gearmatch.app"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                hello@gearmatch.app
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Feedback */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-accent/10 text-accent">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h2 className="font-display text-2xl font-semibold mb-3">Feedback</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Have thoughts on how we can improve? We're always looking to make GearMatch better.
              </p>
              <a
                href="mailto:feedback@gearmatch.app"
                className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
              >
                feedback@gearmatch.app
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Bug Reports */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-red-500/10 text-red-500">
                <Bug className="w-7 h-7" />
              </div>
              <h2 className="font-display text-2xl font-semibold mb-3">Bug Reports</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Found something broken? Let us know and we'll get it fixed.
              </p>
              <a
                href="mailto:bugs@gearmatch.app"
                className="inline-flex items-center gap-2 text-red-500 hover:underline font-medium"
              >
                bugs@gearmatch.app
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Product Suggestions */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-violet-500/10 text-violet-500">
                <Lightbulb className="w-7 h-7" />
              </div>
              <h2 className="font-display text-2xl font-semibold mb-3">Product Suggestions</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Know a product we're missing? Help us expand our database.
              </p>
              <a
                href="mailto:products@gearmatch.app"
                className="inline-flex items-center gap-2 text-violet-500 hover:underline font-medium"
              >
                products@gearmatch.app
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Note */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              We Read Every Message
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We're a small team, so responses might take a few days. But we genuinely
              read and appreciate every email — your feedback helps shape GearMatch.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Rather Just Take a <span className="text-gradient">Quiz</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              Skip the inbox and find your perfect gear.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/#categories">
                Browse Categories
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
