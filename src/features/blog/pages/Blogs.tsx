import BlogCard from "../components/BlogCard";
import { useState } from "react";
import ToggleCategory from "../components/ToggleCategory";
import BlogCardSkeleton from "../components/skeleton/BlogCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useBlogs } from "../hooks/useBlogs";
import BlogsPageHeader from "../components/BlogsPageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const BlogsPage = () => {
  const [search, setSearch] = useState("");
  const { blogs, error, loading } = useBlogs();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filtered = blogs.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesSearch;
  });

  return (
    <section className="relative mt-5 space-y-10">
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-0 h-80 w-80 rounded-full bg-secondary-300/25 blur-3xl" />
      <BlogsPageHeader
        handleSearchValue={handleSearchChange}
        searchValue={search}
      />
      <div className="relative z-10 space-y-10">
        <div className="relative max-md:space-y-5 md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-6">
          <Card className="self-start md:sticky md:top-24">
            <CardHeader>
              <p className="text-xs font-bold tracking-[0.2em] text-primary-700 uppercase md:text-center">
                Categories
              </p>
            </CardHeader>
            <CardContent>
              <ToggleCategory className="hover-scroll no-scrollbar flex-nowrap items-stretch overflow-auto md:flex-col" />
            </CardContent>
          </Card>

          <div className="space-y-6">
            {error && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
                <p className="text-center text-destructive">{error}</p>
                <p className="mt-1 text-center text-sm text-destructive">
                  Please try again later.
                </p>
              </div>
            )}

            {loading && <BlogCardSkeleton />}

            {!loading && blogs.length === 0 ? (
              <div className="rounded-xl border border-border bg-card px-6 py-10 text-center">
                <p className="mb-4 text-lg font-semibold">No Blogs found</p>
                <Link to={"/blog/new"}>
                  <Button>Add Blog</Button>
                </Link>
              </div>
            ) : (
              !loading &&
              filtered.length === 0 && (
                <div className="rounded-xl border border-border bg-card px-6 py-16 text-center">
                  <p className="text-lg font-semibold">
                    No matching posts found
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Try a different keyword or switch categories.
                  </p>
                </div>
              )
            )}

            {!loading &&
              filtered.length > 0 &&
              filtered.map((post, index) => (
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
