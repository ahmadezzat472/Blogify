import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Blog } from "../Types/Blog";

interface BlogProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogProps) => {
  return (
    <Card className="group relative grid-cols-2 overflow-hidden p-0 shadow-xl shadow-slate-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 md:grid">
      <figure className="relative h-64 overflow-hidden md:h-full">
        <img
          src={
            blog.image_url ??
            "https://via.placeholder.com/600x400?text=No+Image"
          }
          alt={blog.title}
          className="h-full w-full object-cover grayscale-20 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-white/40 md:to-transparent" />
      </figure>
      <CardContent className="px-0 py-8">
        {/* Content */}
        <div className="flex flex-col justify-center">
          {/* Category + Read time */}
          <div className="mb-6 flex items-center gap-3">
            <Badge className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-black tracking-tighter text-blue-700 uppercase hover:bg-blue-100">
              {blog.category.name}
            </Badge>
            <span className="text-xs font-medium text-muted-foreground">
              {blog.created_at} Min Read
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-4 text-3xl leading-tight font-black tracking-tight">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            {blog.description}
          </p>

          {/* Author */}
          <div className="mt-auto flex items-center gap-3">
            <img
              src={"https://via.placeholder.com/150?text=No+Avatar"}
              alt={blog.author.name}
              className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
            />
            <div>
              <p className="text-sm font-bold">{blog.author.name}</p>
              {/* <p className="text-xs text-muted-foreground">
                {blog.author.role}
              </p> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
