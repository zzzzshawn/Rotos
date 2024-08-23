'use client';

import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import Image from "next/image";
import { deleteQuestion } from "@/lib/actions/question.action";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { Check } from "lucide-react";



interface Props {
  type: string;
  itemId: string;
}
const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();


  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };


  
  const handleDelete = async () => {
    if (type === 'Question') {
      // delete Question
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname });

      toast({
        icon: <Check className="text-green"/>,
        title: ` Deleted `,
      });
    } else if (type === 'Answer') {
      // delete Answer
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname });

      toast({
        icon: <Check className="text-green"/>,
        title: ` Deleted `,
      });
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === 'Question' && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={18}
          height={18}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="Delele"
        width={18}
        height={18}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};
export default EditDeleteAction;