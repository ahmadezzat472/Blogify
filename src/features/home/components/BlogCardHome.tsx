import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock3, Calendar } from "lucide-react";
import { formattedDate } from "@/utils/formattedDate";
import BlogImage from "@/assets/images/No-Image-Blog.png";
import type { Blog } from "@/features/blog/Types/Blog";
import { estimatedReadMinutes } from "@/features/blog/utils/estimatedReadMinutes";
import stringExcerpt from "@/features/blog/utils/stringExcerpt";
import BlogCardAction from "@/features/blog/components/BlogCardAction";

interface BlogProps {
  blog: Blog;
  className?: string;
  featured?: boolean; // spans 2 cols in grid
}

const BlogCardHome = ({
  blog,
  className = "",
  featured = false,
}: BlogProps) => {
  const initials = blog.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card
      className={`group relative flex h-full flex-col gap-0 overflow-hidden border-border/50 p-0 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 ${featured ? "md:flex-row" : ""} ${className}`}
    >
      {/* Image */}
      <figure
        className={`relative shrink-0 overflow-hidden ${
          featured ? "h-56 w-full md:h-auto md:w-2/5" : "h-52"
        }`}
      >
        <img
          src={blog.image_url || BlogImage}
          alt={blog.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

        {/* Category badge — floated on image */}
        <div className="absolute bottom-3 left-3">
          <Badge className="rounded-full border-0 bg-white/15 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
            {blog.category.name}
          </Badge>
        </div>
      </figure>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col justify-between gap-5 p-5">
        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{formattedDate(blog.created_at)}</span>
          <span className="text-border">•</span>
          <Clock3 className="h-3 w-3 text-primary" />
          <span>{estimatedReadMinutes(blog.description)} min read</span>
        </div>

        {/* Title + Excerpt */}
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-xl leading-tight font-black tracking-tight transition-colors duration-200 group-hover:text-primary">
            {blog.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {stringExcerpt(blog.description, 150)}
          </p>
        </div>

        {/* Author + Actions */}
        <div className="flex items-center justify-between border-t border-border/40 pt-4">
          <div className="flex items-center gap-2.5">
            {/* Avatar initials */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-2 ring-primary/20">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm leading-none font-semibold">
                {blog.author.name}
              </p>
            </div>
          </div>

          <BlogCardAction authorId={blog.author.id} blogId={blog.id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCardHome;
