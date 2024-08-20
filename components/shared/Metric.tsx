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
    <>
      <Image
        src={imgUrl}
        height={16}
        width={16}
        alt={alt}
        className={`object-contain ${href ? "rounded-full" : ""} `}
      />

      <p className={`${textStyles} flex items-center gap-1 `}>
        {value}

        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""} `}
        >
          {title}
        </span>
      </p>
    </>
  );

//   used if bcuz if there is href attr for Metric component (i.e: if metric is user) i want it to be clickable, hence <Link>
  if(href){
    <Link href={href} className="flex-center gap-1">
        {MetricContent}
    </Link>
  }

  return (
  <div className="flex-center flex-wrap gap-1 ">
    {MetricContent}
  </div>
)
};

export default Metric;
