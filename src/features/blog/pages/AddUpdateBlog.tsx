import { Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBlogForm } from "../hooks/useBlogForm";
import { FileText, ImageIcon, Loader2, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ImageUploader from "../components/ImageUploader";
import InputsError from "@/components/shared/InputsError";

export default function AddUpdateBlog() {
  const navigate = useNavigate();
  const {
    form,
    isEditMode,
    categories,
    categoriesLoading,
    pageLoading,
    serverError,
    onSubmit,
  } = useBlogForm();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  if (pageLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Skeleton className="mb-8 h-8 w-48 rounded-xl" />
        <div className="space-y-6">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-36 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="ml-auto h-12 w-36 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <Card className="mx-auto max-w-3xl px-4 pt-12 pb-8">
      <CardHeader className="mb-10">
        <h1 className="text-4xl font-black tracking-tight">
          {isEditMode ? "Edit Post" : "Write a New Post"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {isEditMode
            ? "Update your post details below"
            : "Share your thoughts with the world"}
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <FileText className="h-4 w-4 text-primary" />
              Title
            </Label>
            <Input
              id="title"
              placeholder="Write a compelling title..."
              className="h-12"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
            />
            {errors.title && errors.title.message && (
              <InputsError message={errors.title.message} />
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <FileText className="h-4 w-4 text-primary" />
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Tell your story..."
              rows={6}
              className="px-4 py-3 text-base leading-relaxed transition-all"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
            />
            {errors.description && errors.description.message && (
              <InputsError message={errors.description.message} />
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <Tag className="h-4 w-4 text-primary" />
              Category
            </Label>
            <Controller
              name="category_id"
              control={control}
              rules={{ required: "Please select a category" }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={categoriesLoading}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-primary-100 px-4 transition-all">
                    <SelectValue
                      placeholder={
                        categoriesLoading ? "Loading..." : "Select a category"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category_id && errors.category_id.message && (
              <InputsError message={errors.category_id.message} />
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <ImageIcon className="h-4 w-4 text-primary" />
              Cover Image
              <span className="text-xs font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Controller
              name="image_url"
              control={control}
              render={({ field }) => (
                <ImageUploader
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.image_url?.message}
                />
              )}
            />
          </div>

          {/* Server error */}
          {serverError && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
              <p className="text-sm text-destructive">{serverError}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-36 rounded-xl"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isEditMode ? "Saving..." : "Publishing..."}
                </span>
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Publish Post"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
