import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props{
    title: string;
    description: string;
    link: string;
    linkTitle: string;
}

const NoResult = (props : Props) => {
    const {title, description, link, linkTitle} = props;
  return (
    <div className="flex-center mt-10 w-full flex-col  ">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result"
        width={270}
        height={200}
        className="hidden object-contain dark:flex "
      />

      <h2 className="h2-bold text-dark200_light900 mt-8">
        {title}
      </h2>
      <p className=" body-regular text-dark500_light700 my-3.5 max-w-md text-center ">
        {description}
      </p>

      <Link href={link}>
        <Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 ">{linkTitle}</Button>
      </Link>
    </div>
  );
};

export default NoResult;
