import { supabase } from "@/utils/supabase";
import type { Blog } from "../Types/Blog";

interface GetBlogByIdResponse {
  data: Blog | null;
  error: Error | null;
}

export async function getBlogById(id: string): Promise<GetBlogByIdResponse> {
  const { data, error } = await supabase
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
    .eq("id", id)
    .single();

  return { data: data as Blog | null, error };
}
