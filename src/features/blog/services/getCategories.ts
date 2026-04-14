import { supabase } from "@/utils/supabase";
import type { Category } from "../Types/Category";

interface GetCategoriesResponse {
  data: Category[] | null;
  error: Error | null;
}

export async function GetCategories(): Promise<GetCategoriesResponse> {
  const { data, error } = await supabase.from("categories").select("*");
  return { data, error };
}
