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
      className={`light-border-2 background-light900_dark300 flex flex-wrap items-center justify-center gap-4 rounded-md border p-6 ${classname}`}
    >
      <Image src={imgUrl} alt={title} width={40} height={50} />
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
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts;
  reputation: number;
}

const Stats = ({
  totalQuestions,
  totalAnswers,
  badges,
  reputation,
}: StatsProps) => {
  return (
    <div className="mt-7 px-5 sm:px-10">
      <div className="mt-5 grid grid-cols-2 gap-5 xs:grid-cols-2 md:grid-cols-3">
        <div className="light-border-2 background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 md:row-start-1 md:row-end-3">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="paragraph-semibold text-dark200_light900 ">
              {formatAndDivideNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="paragraph-semibold text-dark200_light900 ">
              {formatAndDivideNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>
        {/* show badges */}
        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Gold Badges"
          classname="md:row-start-1 md:row-end-2 md:col-start-2 md:col-end-4"
        />
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Silver Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};
export default Stats;
