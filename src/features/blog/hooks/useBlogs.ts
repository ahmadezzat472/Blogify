import { useEffect, useState } from "react";
import type { Blog } from "../Types/Blog";
import { getBlogs } from "../services/getBlogs";
import { useSearchParams } from "react-router";

interface UseBlogsReturn {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

export function useBlogs(): UseBlogsReturn {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryId = searchParams.get("category") ?? "all";

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await getBlogs({ categoryId });

      if (error) {
        setError("Failed to load blogs");
        setLoading(false);
        return;
      }

      setBlogs(data ?? []);
      console.log(data);

      setLoading(false);
    };

    void fetchCategories();
  }, [categoryId]);

  return { blogs, loading, error };
}
