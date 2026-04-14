import { supabase } from "@/utils/supabase";
import type { Blog } from "../Types/Blog";

interface GetBlogsResponse {
  data: Blog[] | null;
  error: Error | null;
}

interface GetBlogsParams {
  categoryId?: string;
}

export async function getBlogs({
  categoryId,
}: GetBlogsParams = {}): Promise<GetBlogsResponse> {
  let query = supabase
    .from("posts")
    .select(
      `
      id,
      title,
      description,
      image_url,
      created_at,
      category:categories ( id, name ),
      author:profiles ( id, name )
    `
    )
    .order("created_at", { ascending: false });

  if (categoryId && categoryId !== "all") {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;

  return { data: data as Blog[] | null, error };
}
