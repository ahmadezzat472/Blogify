import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center overflow-hidden rounded-xl px-6 py-20 text-center md:px-12 md:py-28">
      <div className="to-primary-50 absolute inset-0 -z-10 bg-linear-to-br from-primary-100 via-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
      <div className="absolute -top-25 -right-25 h-75 w-75 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute -bottom-25 -left-25 h-75 w-75 rounded-full bg-indigo-500/20 blur-3xl" />
      <span className="mb-6 inline-flex items-center rounded-full border border-primary-200 bg-primary-100 px-4 py-1 text-xs font-semibold text-primary-700">
        🚀 New: AI-powered blog experience
      </span>
      <h1 className="max-w-4xl text-4xl leading-[1.1] font-extrabold tracking-tight md:text-6xl lg:text-7xl">
        Curating the
        <span className="bg-linear-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent italic">
          Future
        </span>
        of Digital Experience
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        Dive into editorial perspectives on high-end design, scalable systems,
        and the evolving soul of software. Built for modern creators.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button
          size="lg"
          className="gap-2 shadow-lg transition-all hover:shadow-xl"
        >
          Start Reading
          <ArrowRight size={18} />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="bg-white/60 backdrop-blur-2xl"
        >
          View Manifesto
        </Button>
      </div>
      <div className="mt-14 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
        <div>
          <p className="text-2xl font-bold text-accent-foreground">12K+</p>
          <p>Readers</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-accent-foreground">500+</p>
          <p>Articles</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-accent-foreground">4.9★</p>
          <p>Rating</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
