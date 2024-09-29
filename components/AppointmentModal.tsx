import { FC, useState } from "react"

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog"

import { AppointmentForm } from "@/components/forms/AppointmentForm"
import { cn } from "@/lib/utils"
import { Appointment } from "@/types/appwrite.types"

import { Button } from "./ui/button"


type AppointmentModalProps = {
  patientId: string
  appointment: Appointment
  type: "cancel" | "schedule"
  userId: string
  title: string
  description: string
}
export const AppointmentModal: FC<AppointmentModalProps> = ({ appointment, type, patientId, userId, title, description }) => {
  const [isOpen, setOpen] = useState(false)
  return (<Dialog open={isOpen} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button disabled={type === 'cancel' && appointment.status === 'cancelled'} 
              variant={"ghost"} 
              className={cn("capitalize transition", { "text-green-500": type === "schedule" })} >
        {type}
      </Button>
    </DialogTrigger>
    <DialogContent className="shad-dialog sm:max-w-md">
      <DialogHeader className="space-y-3">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>
      </DialogHeader>
      <AppointmentForm
        setOpen={setOpen}
        appointment={appointment}
        patientId={patientId}
        userId={userId}
        type={type}
      />
    </DialogContent>
  </Dialog>
  )
}
