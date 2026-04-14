import { supabase } from "@/utils/supabase";

export async function deleteBlog(blogId: string) {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", blogId);

  return { data, error };
}
