import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="px-2 sm:px-12 ">
      <div className="light-border-2 mt-2 flex w-full items-center justify-between gap-5  border-b py-3 sm:items-center">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-28" />
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
};
export default Loading;
