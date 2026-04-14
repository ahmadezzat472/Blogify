import { supabase } from "@/utils/supabase";

interface UploadImageResponse {
  url: string | null;
  error: Error | null;
}

export async function uploadImage(file: File): Promise<UploadImageResponse> {
  // unique filename to avoid collisions
  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) return { url: null, error: uploadError };

  const { data } = supabase.storage.from("post-images").getPublicUrl(fileName);

  return { url: data.publicUrl, error: null };
}
