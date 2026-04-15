import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Pencil } from "lucide-react";
import { Link } from "react-router";
import DeleteBlogConfirm from "./DeleteBlogConfirm";

interface BlogCardActionProps {
  blogId: string;
  authorId: string;
}
const BlogCardAction = ({ blogId, authorId }: BlogCardActionProps) => {
  const { user } = useAuth();

  const isOwner = user?.id === authorId;

  return (
    <div className="flex items-center gap-2">
      <Button variant={"secondary"} className="flex-1">
        <Link to={`/blogs/${blogId}`}>Read More</Link>
      </Button>
      {isOwner && (
        <>
          <Button size={"icon"} className="">
            <Link to={`/blog/edit/${blogId}`}>
              <Pencil />
            </Link>
          </Button>
          <DeleteBlogConfirm blogId={blogId} />
        </>
      )}
    </div>
  );
};

export default BlogCardAction;
