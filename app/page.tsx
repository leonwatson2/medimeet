import { PatientForm } from "@/components/forms/PatientForm";
import { HalfPageFormContainer } from "@/components/layouts/HalfPageFormContiainer";

export default function Home() {
  return (
    <HalfPageFormContainer imgSrc="onboarding-img.png">
      <PatientForm />
    </HalfPageFormContainer>
  );
}
