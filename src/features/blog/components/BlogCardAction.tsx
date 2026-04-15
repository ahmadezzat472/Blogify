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
      <Link to={`/blogs/${blogId}`}>
        <Button variant={"secondary"} className="flex-1">
          Read More
        </Button>
      </Link>
      {isOwner && (
        <>
          <Link to={`/blog/edit/${blogId}`}>
            <Button size={"icon"} className="">
              <Pencil />
            </Button>
          </Link>
          <DeleteBlogConfirm blogId={blogId} />
        </>
      )}
    </div>
  );
};

export default BlogCardAction;
