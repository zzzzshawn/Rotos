import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="px-6 sm:px-12 ">
      <div className="light-border-2 mt-2 flex w-full items-center justify-between gap-5  border-b py-3 sm:items-center">
        <Skeleton className="h-9 w-20" />
      </div>

      <h1 className="h1-bold text-dark100_light900 mt-5">Community</h1>

      <div className="mt-5  grid w-full grid-cols-2 gap-3 max-sm:gap-1 md:grid-cols-3 ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
          <Skeleton key={item} className=" min-h-[260px] w-full rounded-sm " />
        ))}
      </div>
    </div>
  );
};
export default Loading;
