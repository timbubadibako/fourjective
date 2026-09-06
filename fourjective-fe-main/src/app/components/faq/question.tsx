import Image from "next/image";
import QuestionImage from "../../../../public/images/faq/question.svg";

export default function Question() {
  return (
    <div className="flex items-center md:items-end justify-start md:justify-center">
      <Image
        src={QuestionImage}
        alt="Still have questions?"
        width={400}
        height={400}
        className="w-[90%] md:w-[90%] pl-8 md:pl-0 h-auto"
      />
    </div>
  );
}
