import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { deleteBlog } from "../services/deleteBlog";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteBlogConfirmProps {
  blogId: string;
}

const DeleteBlogConfirm = ({ blogId }: DeleteBlogConfirmProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const { error } = await deleteBlog(blogId);

    if (error) {
      toast.error("Failed to delete the blog post. Please try again.");
      setLoading(false);
      return;
    }

    toast.success("Blog post deleted successfully!");
    setLoading(false);
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant="destructive">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Blog</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this blog post? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            isLoading={loading}
            type="submit"
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBlogConfirm;
