import { useEffect, useState } from "react";
import { GetCategories } from "../services/getCategories";
import type { Category } from "../Types/Category";

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await GetCategories();

      if (error) {
        setError("Failed to load categories");
        setLoading(false);
        return;
      }

      setCategories(data ?? []);
      setLoading(false);
    };

    void fetchCategories();
  }, []);

  return { categories, loading, error };
}
