
import Image from "next/image"

import { Button } from "@/components/ui/button"

import { signIn } from "@/auth"
import { Compliments } from "@/constants"

export const SignUpForm = () => {
  const compliment = Compliments[Math.floor(Math.random() * Compliments.length)]
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
      className="space-y-6 flex-1"
    >
      <section>
        <h1 className="header">{compliment} </h1>
        <p className="text-dark-700">Let&#39;s get you an account 🍋. </p>
      </section>

      <Button type="submit" className="shad-btn-sm w-full" variant="outline">
        <Image src="/assets/icons/github.svg" alt="GitHub" width={24} height={24} className="mr-2" />
        Signin with GitHub</Button>
    </form>
  )
} 
