import { Link } from "react-router-dom";
import {
  HelpCircle,
  Target,
  ClipboardList,
  Database,
  Settings,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQCategory {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "General",
    icon: HelpCircle,
    iconColor: "bg-primary/10 text-primary",
    items: [
      {
        question: "What is GearMatch and how does it work?",
        answer: (
          <>
            <p className="mb-3">
              GearMatch is a free recommendation platform that helps you find the perfect
              gaming peripherals based on your unique needs. Instead of throwing generic
              "top 10" lists at you, we start with a quiz about your hand size, grip style,
              use case, budget, and preferences.
            </p>
            <p>
              Your answers are evaluated against our weighted scoring algorithm, which rates
              every product in our database on how well it fits your specific requirements.
              The result? Personalized recommendations with transparent reasoning — you'll
              see exactly why each product matched.
            </p>
          </>
        ),
      },
      {
        question: "Is GearMatch free to use?",
        answer:
          "Yes, GearMatch is completely free. There are no premium tiers, subscriptions, or hidden fees. Take as many quizzes as you want and share your results — no payment required.",
      },
      {
        question: "Do I need to create an account?",
        answer:
          "No account required. Jump straight into a quiz and get your recommendations. Your results can be saved and shared via URL, no sign-up necessary.",
      },
    ],
  },
  {
    title: "Recommendations",
    icon: Target,
    iconColor: "bg-accent/10 text-accent",
    items: [
      {
        question: "How accurate are the recommendations?",
        answer:
          "Our recommendations are based on objective product specifications matched against your stated preferences. We use weighted scoring rules (9-11 per category) that prioritize the factors most important for each product type. While no algorithm is perfect, our system eliminates the guesswork and bias found in typical reviews. The more accurately you answer the quiz questions, the better your results will be.",
      },
      {
        question: "What do the match quality scores mean?",
        answer: (
          <ul className="space-y-2">
            <li>
              <strong>Excellent Match (90%+)</strong>: Near-perfect fit for your needs
            </li>
            <li>
              <strong>Great Match (80-89%)</strong>: Strong fit with minor compromises
            </li>
            <li>
              <strong>Good Match (70-79%)</strong>: Solid choice that meets most requirements
            </li>
            <li>
              <strong>Decent Match (60-69%)</strong>: Workable option with some trade-offs
            </li>
            <li>
              <strong>Fair Match (50-59%)</strong>: May work but has notable gaps
            </li>
            <li>
              <strong>Partial Match (below 50%)</strong>: Significant mismatches with your preferences
            </li>
          </ul>
        ),
      },
      {
        question: "Why didn't my preferred product appear in results?",
        answer: (
          <>
            <p className="mb-3">There are a few possible reasons:</p>
            <ul className="list-disc list-inside space-y-2 mb-3">
              <li>
                <strong>Not in our database yet</strong> — We're constantly adding products,
                but we may not have it. Contact us to suggest it.
              </li>
              <li>
                <strong>Low match score</strong> — The product may exist in our database but
                scored below your top picks based on your answers.
              </li>
              <li>
                <strong>Filtered out</strong> — Some of your answers may have created hard
                filters (like budget or connection type) that excluded it.
              </li>
            </ul>
            <p>
              Try adjusting your quiz answers or using Expert mode for more granular control.
            </p>
          </>
        ),
      },
      {
        question: "Are recommendations sponsored or biased?",
        answer:
          "No. We have zero sponsored picks. Our recommendations are based purely on how well products match your stated preferences. We don't accept payment for product placement or artificially boost any brand. While we may earn affiliate commissions when you purchase through our links, this never influences which products we recommend or how they're ranked.",
      },
    ],
  },
  {
    title: "Quizzes",
    icon: ClipboardList,
    iconColor: "bg-primary/10 text-primary",
    items: [
      {
        question: "Which quiz mode should I choose?",
        answer: (
          <ul className="space-y-3">
            <li>
              <strong>Quick Match (~1 min)</strong>: Best if you just want fast, solid
              recommendations based on the essentials.
            </li>
            <li>
              <strong>Personalized (~2 min)</strong>: Recommended for most users. Covers
              your preferences and use patterns for well-tailored results.
            </li>
            <li>
              <strong>Expert (~4 min)</strong>: For enthusiasts who want maximum precision.
              Includes advanced options and every available question.
            </li>
          </ul>
        ),
      },
      {
        question: "Can I retake a quiz?",
        answer:
          "Absolutely. You can retake quizzes as many times as you want. Each time you complete a quiz, you'll get fresh results based on your new answers. This is helpful if your needs change or you want to explore different scenarios (like different budget ranges).",
      },
      {
        question: "Can I save or share my quiz results?",
        answer:
          "Yes. Every results page has a unique URL that you can bookmark or share with others. They'll see the same recommendations you received. No account needed.",
      },
    ],
  },
  {
    title: "Products",
    icon: Database,
    iconColor: "bg-accent/10 text-accent",
    items: [
      {
        question: "How many products are in the database?",
        answer: (
          <>
            <p className="mb-3">We currently have 1,040+ products across 4 categories:</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>
                <strong>Mice</strong>: 185 products
              </li>
              <li>
                <strong>Audio</strong>: 198 products (headsets, headphones, IEMs)
              </li>
              <li>
                <strong>Keyboards</strong>: 279 products
              </li>
              <li>
                <strong>Monitors</strong>: 378 products
              </li>
            </ul>
            <p>We're constantly adding new products and expanding coverage.</p>
          </>
        ),
      },
      {
        question: "How often is the database updated?",
        answer:
          "We regularly update our database to add new releases and adjust for discontinued products. Major updates typically happen monthly, with smaller additions made as significant products launch.",
      },
      {
        question: "Can I suggest a product to be added?",
        answer: (
          <>
            Yes! We welcome product suggestions. Send an email to{" "}
            <a
              href="mailto:products@gearmatch.app"
              className="text-primary hover:underline"
            >
              products@gearmatch.app
            </a>{" "}
            with the product name, brand, and category. We'll review it for inclusion in
            our database.
          </>
        ),
      },
    ],
  },
  {
    title: "Technical",
    icon: Settings,
    iconColor: "bg-primary/10 text-primary",
    items: [
      {
        question: 'Why did I get "no results" or very low match scores?',
        answer: (
          <>
            <p className="mb-3">
              This usually happens when your requirements are highly specific or contradictory.
              For example, wanting an ultra-lightweight wireless mouse under $30 may not match
              any products well.
            </p>
            <p className="mb-2">Try:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Relaxing some constraints (like expanding your budget range)</li>
              <li>Using fewer hard requirements</li>
              <li>Trying the Personalized or Quick mode instead of Expert</li>
            </ul>
          </>
        ),
      },
      {
        question: "How is the scoring calculated?",
        answer: (
          <>
            <p className="mb-3">
              Each category uses 9-11 weighted scoring rules. For example, the mouse quiz
              evaluates grip fit (20%), size &amp; hand match (17%), weight preference (17%),
              connection type (13%), use case fit (8%), and more.
            </p>
            <p>
              Each product receives a score (0-100) for each rule, then scores are combined
              using the weights. You can see the full breakdown on your results page by
              expanding the "Score Breakdown" section.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "Contact",
    icon: Mail,
    iconColor: "bg-accent/10 text-accent",
    items: [
      {
        question: "How can I contact GearMatch?",
        answer: (
          <>
            <p className="mb-3">You can reach us via email:</p>
            <ul className="space-y-2">
              <li>
                <strong>General inquiries</strong>:{" "}
                <a
                  href="mailto:hello@gearmatch.app"
                  className="text-primary hover:underline"
                >
                  hello@gearmatch.app
                </a>
              </li>
              <li>
                <strong>Feedback</strong>:{" "}
                <a
                  href="mailto:feedback@gearmatch.app"
                  className="text-primary hover:underline"
                >
                  feedback@gearmatch.app
                </a>
              </li>
              <li>
                <strong>Bug reports</strong>:{" "}
                <a
                  href="mailto:bugs@gearmatch.app"
                  className="text-primary hover:underline"
                >
                  bugs@gearmatch.app
                </a>
              </li>
              <li>
                <strong>Product suggestions</strong>:{" "}
                <a
                  href="mailto:products@gearmatch.app"
                  className="text-primary hover:underline"
                >
                  products@gearmatch.app
                </a>
              </li>
            </ul>
            <p className="mt-3">
              Or visit our{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact page
              </Link>{" "}
              for more details.
            </p>
          </>
        ),
      },
      {
        question: "How do I report a bug or give feedback?",
        answer: (
          <>
            For bugs, email{" "}
            <a
              href="mailto:bugs@gearmatch.app"
              className="text-primary hover:underline"
            >
              bugs@gearmatch.app
            </a>{" "}
            with details about what went wrong, what browser you're using, and steps to
            reproduce the issue. For general feedback and suggestions, email{" "}
            <a
              href="mailto:feedback@gearmatch.app"
              className="text-primary hover:underline"
            >
              feedback@gearmatch.app
            </a>
            . We read every message and genuinely appreciate the input.
          </>
        ),
      },
    ],
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Everything you need to know about GearMatch, our recommendations,
              and how to get the most out of our quizzes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            {faqCategories.map((category) => (
              <div
                key={category.title}
                className="bg-card border border-border rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.iconColor}`}
                  >
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold">
                    {category.title}
                  </h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.title}-${index}`}
                      className="border-border"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Still Have <span className="text-gradient-accent">Questions</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Can't find what you're looking for? We're here to help.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your <span className="text-gradient">Perfect Gear</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              Take a quiz and get personalized recommendations in minutes.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/quiz/mouse">
                Find Your Mouse
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;
