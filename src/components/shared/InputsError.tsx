import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface InputsErrorProps {
  message: string;
  className?: string;
}
const InputsError = ({ message, className }: InputsErrorProps) => {
  return (
    <div
      className={cn(
        "ml-1 flex items-center gap-1.5 text-sm text-destructive",
        className
      )}
    >
      <TriangleAlert className="inline-block size-4" />
      <span>{message}</span>
    </div>
  );
};

export default InputsError;
