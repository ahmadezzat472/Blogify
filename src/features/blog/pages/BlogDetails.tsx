import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Loading from "@/components/Loading/Loading";
import BlogImage from "@/assets/images/No-Image-Blog.png";
import Avatar from "@/assets/images/Avatar.jpg";
import { getBlogById } from "../services/getBlogById";
import type { Blog } from "../Types/Blog";
import { formattedDate } from "@/utils/formattedDate";
import { estimatedReadMinutes } from "../utils/estimatedReadMinutes";

const BlogDetails = () => {
  const { id } = useParams();
  const hasValidId = Boolean(id);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasValidId || !id) {
      return;
    }

    const fetchBlog = async () => {
      setLoading(true);
      const { data, error: fetchError } = await getBlogById(id);

      if (fetchError) {
        setError(fetchError.message || "Failed to load blog details.");
        setBlog(null);
        setLoading(false);
        return;
      }

      if (!data) {
        setError("Blog not found.");
        setBlog(null);
        setLoading(false);
        return;
      }

      setBlog(data);
      setError(null);
      setLoading(false);
    };

    void fetchBlog();
  }, [hasValidId, id]);

  if (!hasValidId) {
    return (
      <section className="mx-auto max-w-4xl py-8">
        <Card className="rounded-2xl border-destructive/30 bg-destructive/10">
          <CardContent className="space-y-4 p-6">
            <h1 className="text-2xl font-black tracking-tight">
              Invalid Blog URL
            </h1>
            <p className="text-destructive">Invalid blog id.</p>
            <Link to="/blogs">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="size-4" />
                Back to blogs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (loading) {
    return <Loading text="Loading blog details..." />;
  }

  if (error) {
    return (
      <section className="mx-auto max-w-4xl py-8">
        <Card className="rounded-2xl border-destructive/30 bg-destructive/10">
          <CardContent className="space-y-4 p-6">
            <h1 className="text-2xl font-black tracking-tight">
              Unable to Open Blog
            </h1>
            <p className="text-destructive">{error}</p>
            <Link to="/blogs">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="size-4" />
                Back to blogs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <article className="mx-auto max-w-4xl space-y-6 py-6">
      <Link to="/blogs">
        <Button variant="ghost" className="gap-2 rounded-full">
          <ArrowLeft className="size-4" />
          Back to blogs
        </Button>
      </Link>

      <Card className="overflow-hidden rounded-3xl border-0 p-0 shadow-xl">
        <figure className="relative h-72 overflow-hidden md:h-96">
          <img
            src={blog.image_url || BlogImage}
            alt={blog.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute right-4 bottom-4">
            <Badge className="rounded-full border border-primary-300 bg-primary-100 text-primary">
              {blog.category.name}
            </Badge>
          </div>
        </figure>

        <CardContent className="space-y-8 p-6 md:p-10">
          <header className="space-y-5">
            <h1 className="text-3xl leading-tight font-black tracking-tight md:text-5xl">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={Avatar}
                  alt={blog.author.name}
                  className="h-12 w-12 rounded-full border border-border object-cover"
                />
                <div>
                  <p className="text-sm text-muted-foreground">Written by</p>
                  <p className="font-bold">{blog.author.name}</p>
                </div>
              </div>

              <div className="h-8 w-px bg-border" />

              <div className="text-sm text-muted-foreground">
                <p>{formattedDate(blog.created_at)}</p>
              </div>

              <div className="h-8 w-px bg-border" />

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4 text-primary" />
                <span>{estimatedReadMinutes(blog.description)} min read</span>
              </div>
            </div>
          </header>

          <div className="h-px bg-border" />

          <section className="prose prose-neutral max-w-none text-base leading-8 text-foreground">
            <p className="whitespace-pre-line">{blog.description}</p>
          </section>
        </CardContent>
      </Card>
    </article>
  );
};

export default BlogDetails;
