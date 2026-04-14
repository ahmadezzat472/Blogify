import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Blog } from "../Types/Blog";
import { Clock3 } from "lucide-react";
import BlogCardAction from "./BlogCardAction";
import { formattedDate } from "@/utils/formattedDate";
import { estimatedReadMinutes } from "../utils/estimatedReadMinutes";
import stringExcerpt from "../utils/stringExcerpt";
import BlogImage from "@/assets/images/No-Image-Blog.png";
import Avatar from "@/assets/images/Avatar.jpg";

interface BlogProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogProps) => {
  console.log(blog.image_url);

  return (
    <Card className="group relative gap-0 overflow-hidden p-0 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 md:grid md:grid-cols-2">
      <figure className="relative min-h-full overflow-hidden md:h-64 lg:h-72">
        <img
          src={blog.image_url || BlogImage}
          alt={blog.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
        <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
      </figure>
      <CardContent className="flex flex-col justify-between gap-8 p-6">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={Avatar}
              alt={blog.author.name}
              className="h-12 w-12 rounded-full border-2 border-gray-400 object-cover shadow-sm"
            />
            <div className="min-w-0">
              <p className="text-lg font-bold">{blog.author.name}</p>
              <div className="mt-1 flex items-center gap-2 text-xs font-medium">
                <span className="text-muted-foreground">
                  {formattedDate(blog.created_at)}
                </span>
                <Clock3 className="size-3.5 text-primary" />
                <span className="text-muted-foreground">
                  {estimatedReadMinutes(blog.description)} min read
                </span>
              </div>
            </div>
          </div>

          <div className="my-6">
            <h3 className="text-2xl leading-tight font-black tracking-tight md:text-3xl">
              {blog.title}
            </h3>
            <Badge className="mt-1 w-fit rounded-full border border-primary-300 bg-primary-100 text-primary">
              {blog.category.name}
            </Badge>
          </div>

          <p className="mb-4 text-base leading-relaxed text-muted-foreground">
            {stringExcerpt(blog.description, 150)}
          </p>
        </div>

        <BlogCardAction authorId={blog.author.id} blogId={blog.id} />
      </CardContent>
    </Card>
  );
};

export default BlogCard;
