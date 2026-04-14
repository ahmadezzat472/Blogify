import type { Category } from "./Category";

export type Blog = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: Category;
  created_at: string;
  author: {
    name: string;
    id: string;
  };
};
