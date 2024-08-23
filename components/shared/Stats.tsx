import { formatAndDivideNumber } from "@/lib/utils";
import { BadgeCounts } from "@/types";
import Image from "next/image";

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
  classname?: string;
}
const StatsCard = ({ imgUrl, value, title, classname }: StatsCardProps) => {
  return (
    <div
      className={`light-border-2 background-light900_dark300 flex flex-wrap items-center justify-center gap-4 text-wrap rounded-md border p-6 text-center ${classname}`}
    >
      <Image src={imgUrl} alt={title} width={160} height={160} />
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="paragraph-semibold text-dark200_light900 ">
          {formatAndDivideNumber(value)}
        </p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

interface StatsProps {
  badges: BadgeCounts;
}

const Stats = ({ badges }: StatsProps) => {
  return (
    <div className="mt-3 px-5 sm:px-10">
      <div className="mt-5 grid grid-cols-2 gap-4 max-sm:gap-2 xs:grid-cols-2 md:grid-cols-4">
        {/* show badges */}
        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Master of Questions"
          classname="col-end-3 col-start-1 row-start-1 row-end-2 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-5"
        />
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Questionnaire Wizard"
          classname=" md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3"
        />
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Feedback Fanatic"
          classname=" md:row-start-2 md:row-end-3 md:col-start-3 md:col-end-5"
        />
      </div>
    </div>
  );
};
export default Stats;
