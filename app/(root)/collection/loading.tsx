import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mt-10 px-6 sm:px-12">
      <h1 className="h1-bold text-dark100_light900">Collections</h1>

      <div className=" mt-6 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
