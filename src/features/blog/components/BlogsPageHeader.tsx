import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

interface BlogsPageHeaderProps {
  handleSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

const BlogsPageHeader = ({
  handleSearchValue,
  searchValue,
}: BlogsPageHeaderProps) => {
  return (
    <Card className="py-10 shadow-2xl">
      <CardHeader className="space-y-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-300 bg-primary-100 px-3 py-1 text-xs font-semibold tracking-wide text-primary-800 uppercase">
          <Sparkles className="size-3.5" />
          Fresh stories, weekly
        </span>
        <CardTitle className="text-4xl font-black tracking-tight md:text-5xl">
          Explore Blogify Journal
        </CardTitle>
        <CardDescription className="mt-2 max-w-2xl text-base text-muted-foreground md:text-lg">
          Curated writing on product design, frontend engineering, and better
          digital experiences.
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button size={"lg"}>
          <Link to="/blog/new">Add Blog</Link>
        </Button>
        <div className="relative ml-1.5 w-full max-w-sm md:ml-3">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary" />
          <Input
            placeholder="Search by title"
            value={searchValue}
            onChange={handleSearchValue}
            className="h-10 bg-background/90 pl-9"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogsPageHeader;
