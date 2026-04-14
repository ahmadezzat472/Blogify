import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="mt-10 grid grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-60 w-full rounded-xl" />
      ))}
    </div>
  );
};

export default BlogCardSkeleton;
