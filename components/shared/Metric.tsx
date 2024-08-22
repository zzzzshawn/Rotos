import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  title: string;
  value: string | number;
  alt: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  title,
  value,
  alt,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  // used metric component here like this, bcuz metrics can be user or likes,upvotes. if its likes, upvotes then no need for it to be a llink, if author it needs to be a link to go to author profile
  const MetricContent = (
    <div className="light-border-2 flex items-center justify-center gap-1 rounded-md border p-1 px-2 md:px-3">
      <Image
        src={imgUrl}
        height={22}
        width={22}
        alt={alt}
        className={`object-contain ${href ? "rounded-full" : ""} invert dark:invert-0 `}
      />

      <p
        className={`${textStyles} flex min-w-[18px] items-center justify-center gap-1 `}
      >
        {value}

        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""} `}
        >
          {title}
        </span>
      </p>
    </div>
  );

  //   used if bcuz if there is href attr for Metric component (i.e: if metric is user) i want it to be clickable, hence <Link>
  if (href) {
    return (
      <Link href={href} className="flex-center cursor-pointer">
        {MetricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap ">{MetricContent}</div>;
};

export default Metric;
