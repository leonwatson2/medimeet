import Image from "next/image";
import { FC } from "react";

import { RegistrationForm } from "@/components/forms/Registration/RegistrationForm";
import { getUser } from "@/lib/actions/patient.action";

const Register: FC<SearchParamProps> = async ({ params: { userId } }) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <RegistrationForm user={user} />
          <p className="copyright py-12">© 2024 MediMeet</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
