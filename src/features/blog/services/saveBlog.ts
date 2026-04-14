import { supabase } from "@/utils/supabase";

interface BlogPayload {
  title: string;
  description: string;
  image_url: string;
  category_id: string;
}

export async function createBlog(
  payload: BlogPayload,
  authorId: string,
  authorName: string
) {
  const { data, error } = await supabase
    .from("posts")
    .insert({ ...payload, author_id: authorId, author_name: authorName })
    .select()
    .single();

  return { data, error };
}

export async function updateBlog(id: string, payload: BlogPayload) {
  const { data, error } = await supabase
    .from("posts")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}
