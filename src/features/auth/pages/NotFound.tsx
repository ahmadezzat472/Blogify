import { Link } from "react-router";
import { ArrowLeft, House } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-primary-100 via-background to-secondary-100 px-4 py-14">
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-primary-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-secondary-300/25 blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-border/60 bg-card/80 p-8 text-center shadow-2xl backdrop-blur-md md:p-12">
        <p className="text-xs font-bold tracking-[0.35em] text-primary-700 uppercase">
          Error 404
        </p>
        <h1 className="mt-4 text-5xl leading-none font-black tracking-tight md:text-7xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          The page you requested does not exist or may have been moved. Let us
          get you back on track.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/">
            <Button size="lg" className="gap-2 rounded-full px-7">
              <House className="size-4" />
              Go Home
            </Button>
          </Link>
          <Link to="/blogs">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 rounded-full px-7"
            >
              <ArrowLeft className="size-4" />
              Browse Blogs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
