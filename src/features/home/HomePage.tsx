import HeroSection from "./components/HeroSection";
import { useMemo } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import BlogCardSkeleton from "@/features/blog/components/skeleton/BlogCard";
import { useBlogs } from "@/features/blog/hooks/useBlogs";
import BlogCardHome from "./components/BlogCardHome";

const HomePage = () => {
  const { blogs, loading, error } = useBlogs();

  const featuredBlogs = useMemo(() => blogs.slice(0, 5), [blogs]);

  return (
    <div className="space-y-14">
      <HeroSection />

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-primary-700 uppercase">
              Latest Posts
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Fresh from Blogify
            </h2>
          </div>

          <Link to="/blogs">
            <Button variant="outline">View all blogs</Button>
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
            <p className="text-center text-destructive">{error}</p>
          </div>
        )}

        {loading && <BlogCardSkeleton />}

        {!loading && featuredBlogs.length === 0 && (
          <div className="rounded-xl border border-border bg-card px-6 py-10 text-center">
            <p className="mb-3 text-lg font-semibold">No blogs available yet</p>
            <Link to="/blog/new">
              <Button>Create your first blog</Button>
            </Link>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className={`h-full animate-in duration-500 fill-mode-both fade-in slide-in-from-bottom-4 ${
                  index === 0 ? "md:col-span-2 lg:col-span-2" : "" // first card is featured
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BlogCardHome
                  blog={blog}
                  featured={index === 0} // first card gets horizontal layout
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
