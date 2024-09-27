import Image from "next/image";
import { FC } from "react";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getUser } from "@/lib/actions/patient.action";
import { ImagesFiles } from "@/types/types";


const image: ImagesFiles = "appointment-img.png";
const Page: FC<SearchParamProps> = async ({ params: { userId } }) => {
  const user: User = (await getUser(userId))!;
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className={`sub-container max-w-[860px]`}>
          <Image
            src="/assets/icons/MediMeet.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm user={user} />
        </div>
      </section>
      <Image
        src={"/assets/images/" + image}
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[20%]"
      />
    </div>
  );
};
export default Page;
