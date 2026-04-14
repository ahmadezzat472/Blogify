import { useRef, useState } from "react";
import { ImageIcon, Loader2, Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { uploadImage } from "../services/uploadImage";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  error?: string;
}

export default function ImageUploader({
  value,
  onChange,
  error,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    // validate type
    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed");
      return;
    }

    // validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be smaller than 5MB");
      return;
    }

    setUploadError(null);
    setUploading(true);

    const { url, error } = await uploadImage(file);

    setUploading(false);

    if (error || !url) {
      setUploadError("Upload failed, please try again");
      return;
    }

    onChange(url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  };

  const handleRemove = () => {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="group space-y-2">
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-border/50">
          <img
            src={value}
            alt="Cover"
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="rounded-full"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <UploadCloud className="mr-1 h-4 w-4" />
                  Replace
                </>
              )}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              className="rounded-full"
              onClick={handleRemove}
              disabled={uploading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute right-2 bottom-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
            Cover Image
          </div>
        </div>
      ) : (
        /* Drop zone */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          disabled={uploading}
          className={cn(
            "flex h-48 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all duration-200",
            dragOver
              ? "scale-[1.01] border-primary bg-primary/5"
              : "border-border/60 bg-muted/30 hover:border-primary/50 hover:bg-muted/50",
            uploading && "cursor-not-allowed opacity-60"
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted-foreground">
                Uploading...
              </p>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-all duration-200 group-hover:bg-primary/20">
                {dragOver ? (
                  <UploadCloud className="h-6 w-6 text-primary" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-muted-foreground transition-all duration-200 group-hover:text-primary" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">
                  {dragOver
                    ? "Drop it here!"
                    : "Click to upload or drag & drop"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, WEBP — max 5MB
                </p>
              </div>
            </>
          )}
        </button>
      )}

      {(uploadError || error) && (
        <p className="text-sm text-destructive">{uploadError ?? error}</p>
      )}
    </div>
  );
}
