'use client'
import { viewQuestion } from "@/lib/actions/interaction.action";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  itemId: string;
  userId?: string;
}

const Viewed = ({itemId, userId}: Props) => {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  return( 
  <>
  
  </>
  )
};

export default Viewed;
