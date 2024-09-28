"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { decryptKey, encryptKey } from "@/lib/utils";

type PasskeyModalProps = {
  i?: number;
};
export const PasskeyModal: FC<PasskeyModalProps> = () => {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const [passkey, setValue] = useState("");
  const encryptedKey =
    typeof window !== "undefined" && localStorage.getItem("passkey");
  const router = useRouter();
  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };
  useEffect(() => {
    if (encryptedKey) {
      if (decryptKey(encryptedKey) === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        router.push("/admin");
      }
    }
  }, [encryptedKey, router]);
  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);

      localStorage.setItem("passkey", encryptedKey);
      setError("");
      closeModal();
    } else {
      setError("Invalid passkey");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={24}
              height={24}
              onClick={closeModal}
            />
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="flex-1 w-full">
          <div>
            <InputOTP
              maxLength={6}
              value={passkey}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup className="shad-otp">
                <InputOTPSlot className="shad-otp-slot" index={0} />
                <InputOTPSlot className="shad-otp-slot" index={1} />
                <InputOTPSlot className="shad-otp-slot" index={2} />
                <InputOTPSlot className="shad-otp-slot" index={3} />
                <InputOTPSlot className="shad-otp-slot" index={4} />
                <InputOTPSlot className="shad-otp-slot" index={5} />
              </InputOTPGroup>
            </InputOTP>
            {error && (
              <p className="shad-error text-14-regular mt-4 flex justify-content">
                {error}
              </p>
            )}
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction
            type="submit"
            onClick={validatePasskey}
            className="shad-primary-btn w-full"
          >
            Enter Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
