import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { GetCategories } from "../services/getCategories";
import type { Category } from "../Types/Category";
import { getBlogById } from "../services/getBlogById";
import { createBlog, updateBlog } from "../services/saveBlog";
import { toast } from "sonner";

export interface BlogFormValues {
  title: string;
  description: string;
  image_url: string;
  category_id: string;
}

export function useBlogForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(isEditMode);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<BlogFormValues>({
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      category_id: "",
    },
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await GetCategories();
      setCategories(data ?? []);
      setCategoriesLoading(false);
    };
    void fetch();
  }, []);

  useEffect(() => {
    if (!isEditMode || !id) return;

    const fetch = async () => {
      setPageLoading(true);
      const { data, error } = await getBlogById(id);

      if (error || !data) {
        setServerError("Failed to load blog post");
        setPageLoading(false);
        toast.error("Failed to load the blog post. Please try again.");
        return;
      }

      form.reset({
        title: data.title,
        description: data.description,
        image_url: data.image_url ?? "",
        category_id: data.category.id,
      });

      setPageLoading(false);
    };

    void fetch();
  }, [id, isEditMode, form]);

  const onSubmit = async (values: BlogFormValues) => {
    setServerError(null);

    if (isEditMode && id) {
      const { error } = await updateBlog(id, values);
      if (error) {
        setServerError(error.message);
        toast.error("Failed to update the blog post. Please try again.");
        return;
      }
    } else {
      const authorName = user?.user_metadata?.name ?? "Anonymous";
      const { error } = await createBlog(values, user!.id, authorName);
      if (error) {
        setServerError(error.message);
        toast.error("Failed to create the blog post. Please try again.");
        return;
      }
    }

    toast.success("Blog post saved successfully!");
    navigate("/blogs");
  };

  return {
    form,
    isEditMode,
    categories,
    categoriesLoading,
    pageLoading,
    serverError,
    onSubmit,
  };
}
