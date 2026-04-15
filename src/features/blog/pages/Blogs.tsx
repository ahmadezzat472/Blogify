import BlogCard from "../components/BlogCard";
import { useMemo, useState } from "react";
import ToggleCategory from "../components/ToggleCategory";
import BlogCardSkeleton from "../components/skeleton/BlogCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useBlogs } from "../hooks/useBlogs";
import BlogsPageHeader from "../components/BlogsPageHeader";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BlogsPage = () => {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { blogs, error, loading } = useBlogs();
  const ITEMS_PER_PAGE = 4;

  const pageFromUrl = Number(searchParams.get("page") ?? "1");
  const currentPage =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0
      ? Math.floor(pageFromUrl)
      : 1;

  const setPage = (page: number) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (page <= 1) {
      nextSearchParams.delete("page");
    } else {
      nextSearchParams.set("page", String(page));
    }

    setSearchParams(nextSearchParams);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const filtered = blogs.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedBlogs = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filtered, safeCurrentPage]);

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, "ellipsis-end", totalPages] as const;
    }

    if (safeCurrentPage >= totalPages - 2) {
      return [
        1,
        "ellipsis-start",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ] as const;
    }

    return [
      1,
      "ellipsis-start",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "ellipsis-end",
      totalPages,
    ] as const;
  };

  const visiblePages = getVisiblePages();

  return (
    <section className="relative mt-5 space-y-10">
      <BlogsPageHeader
        handleSearchValue={handleSearchChange}
        searchValue={search}
      />
      <div className="relative z-10 space-y-10">
        <div className="relative max-md:space-y-5 md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-6">
          <div className="self-start md:sticky md:top-24">
            <Card>
              <CardHeader>
                <p className="text-xs font-bold tracking-[0.2em] text-primary-700 uppercase md:text-center">
                  Categories
                </p>
              </CardHeader>
              <CardContent>
                <ToggleCategory className="hover-scroll no-scrollbar flex-nowrap items-stretch overflow-auto md:flex-col" />
              </CardContent>
            </Card>
            <Link to={"/blog/new"} className="mx-2 mt-4 block">
              <Button size={"lg"} className="w-full">
                Add Blog
              </Button>
            </Link>
          </div>

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
              paginatedBlogs.length > 0 &&
              paginatedBlogs.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-in duration-500 fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <BlogCard blog={post} />
                </div>
              ))}

            {!loading && filtered.length > ITEMS_PER_PAGE && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem className="w-full flex-1">
                    <PaginationPrevious
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setPage(Math.max(1, safeCurrentPage - 1));
                      }}
                      className={
                        safeCurrentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {visiblePages.map((page, index) => {
                    if (typeof page !== "number") {
                      return (
                        <PaginationItem key={`${page}-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    return (
                      <PaginationLink
                        href="#"
                        isActive={safeCurrentPage === page}
                        onClick={(event) => {
                          event.preventDefault();
                          setPage(page);
                        }}
                      >
                        <PaginationItem key={page}>{page}</PaginationItem>
                      </PaginationLink>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setPage(Math.min(totalPages, safeCurrentPage + 1));
                      }}
                      className={
                        safeCurrentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsPage;
