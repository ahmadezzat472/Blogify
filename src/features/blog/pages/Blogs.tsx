import { Input } from "@/components/ui/input";
import BlogCard from "../components/BlogCard";
import { useState } from "react";
import ToggleCategory from "../components/ToggleCategory";
import BlogCardSkeleton from "../components/skeleton/BlogCard";
import { Search, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useBlogs } from "../hooks/useBlogs";

const BlogsPage = () => {
  const [search, setSearch] = useState("");
  const { blogs, error, loading } = useBlogs();

  const filtered = blogs.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesSearch;
  });

  return (
    <section className="relative py-10 md:py-14">
      {/* <div className="pointer-events-none absolute -top-40 -right-24 h-96 w-96 rounded-full bg-primary-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 -left-28 h-80 w-80 rounded-full bg-secondary-300/25 blur-3xl" /> */}

      <div className="custom-container relative z-10 space-y-10">
        <div className="rounded-4xl border border-border/70 bg-card/80 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur-sm md:p-10">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary-300/50 bg-secondary-100/60 px-3 py-1 text-xs font-semibold tracking-wide text-secondary-800 uppercase">
                <Sparkles className="size-3.5" />
                Fresh stories, weekly
              </span>
              <div>
                <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                  Explore Blogify Journal
                </h1>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground md:text-lg">
                  Curated writing on product design, frontend engineering, and
                  better digital experiences.
                </p>
              </div>
            </div>

            <div className="w-full max-w-md">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by title"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 rounded-2xl border-border/80 bg-background/90 pl-9"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Showing
              <span className="font-bold text-foreground">
                {filtered.length}
              </span>
              articles
            </p>
          </div>
        </div>

        <div className="relative max-md:space-y-5 md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-6">
          <aside className="self-start md:sticky md:top-24">
            <Card>
              <CardHeader>
                <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase md:text-center">
                  Categories
                </p>
              </CardHeader>
              <CardContent>
                <ToggleCategory className="hover-scroll no-scrollbar flex-nowrap items-stretch overflow-auto md:flex-col" />
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6">
            {error && (
              <div className="rounded-3xl border border-destructive/50 bg-destructive/10 px-6 py-16 text-center">
                <p className="text-lg font-semibold text-destructive">
                  Failed to load blogs
                </p>
                <p className="mt-1 text-muted-foreground">
                  Please try again later.
                </p>
              </div>
            )
            }
            {loading && <BlogCardSkeleton />}

            {!loading && filtered.length === 0 && (
              <div className="rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
                <p className="text-lg font-semibold">No matching posts found</p>
                <p className="mt-1 text-muted-foreground">
                  Try a different keyword or switch categories.
                </p>
              </div>
            )}

            {!loading &&
              blogs.length > 0 &&
              blogs.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-in duration-500 fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <BlogCard blog={post} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsPage;
