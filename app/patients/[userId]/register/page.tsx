import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { HalfPageFormContainer } from "@/components/layouts/HalfPageFormContiainer";
import { getUser } from "@/lib/actions/patient.action";
import { FC } from "react";

const Register:FC<SearchParamProps> = async ({ params: { userId }}) => {
  const user = await getUser(userId);
  return (
    <HalfPageFormContainer imgSrc="register-img.png">
    <RegistrationForm user={user} />
    </HalfPageFormContainer>
  );
};

export default Register;
