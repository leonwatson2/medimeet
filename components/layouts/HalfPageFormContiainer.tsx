import { ImagesFiles } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";

type HalfPageFormContainer = {
  children: ReactNode;
  imgSrc: ImagesFiles;
};
export const HalfPageFormContainer: FC<HalfPageFormContainer> = ({
  children,
  imgSrc,
}) => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[486px]">
          <Image
            src="/assets/icons/MediMeet.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          {children}
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              2024 MediMeet
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src={"/assets/images/" + imgSrc}
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default HalfPageFormContainer;
