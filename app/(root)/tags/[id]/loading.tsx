import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mt-10 px-6 sm:px-12">
      <Skeleton className="h-12 w-52" />

      <div className="mt-2 flex flex-col gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
