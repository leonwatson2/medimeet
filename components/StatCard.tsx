import Image from "next/image";
import { FC } from "react";

import { Icons } from "@/types/types";
import { cn } from "@/lib/utils";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: Icons;
};
export const StatCard: FC<StatCardProps> = ({ type, count, label, icon }) => {
  return (
    <div
      className={cn("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={`/assets/icons/${icon}`}
          alt={icon}
          width={32}
          height={32}
        />
        <h2 className="text-32-bold text-white"> {count} </h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};
