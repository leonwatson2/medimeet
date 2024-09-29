import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointments } from "@/lib/actions/appointment.actions";

const Admin = async () => {
  const data = await getRecentAppointments();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/MediMeet.svg"
            alt="MediMeet"
            width={160}
            height={32}
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header"> Welcome </h1>
          <p className="text-dark-700">
            You can manage your account, view your appointments, and access your
            medical records here.
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={data?.counts.scheduled}
            label="Scheduled appointments"
            icon="appointments.svg"
          />
          <StatCard
            type="pending"
            count={data?.counts.pending}
            label="Pending appointments"
            icon="pending.svg"
          />
          <StatCard
            type="cancelled"
            count={data?.counts.cancelled}
            label="Cancelled appointments"
            icon="cancelled.svg"
          />
        </section>
        <DataTable data={data?.documents} columns={columns} />
      </main>
    </div>
  );
};
export default Admin;
