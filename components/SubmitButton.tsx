import Image from "next/image";

import { Icons } from "@/types/types";

import { Button } from "./ui/button";

type SubmitButtonProps = {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
};
const src: Icons = "loader.svg";
export const SubmitButton = ({
  isLoading,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className={className ?? "shad-primary-btn w-full"}
      disabled={isLoading}
    >
      {isLoading ? (
        <Image className="fill-white" src={"/assets/icons/" + src} width={24} height={24}  alt="Loading" />
      ) : (
        children
      )}
    </Button>
  );
};
