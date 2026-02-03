import type { ReactNode } from "react";

const StatInfo = ({ title, count }: { title: string; count: number }) => {
  return (
    <div className="basis-2/3 px-3 py-6 flex flex-col justify-between">
      <h3>{title}</h3>
      <span className="text-3xl font-semibold">{count}</span>
    </div>
  );
};

const StatIcon = ({ icon, color }: { icon: ReactNode; color: string }) => {
  return (
    <div
      className={`${color} basis-1/3 flex justify-center items-center rounded-r-xl`}
    >
      {icon}
    </div>
  );
};

export const StatCard = ({ children }: { children: ReactNode }) => {
  return <li className="flex brutal-shadow rounded-xl">{children}</li>;
};

StatCard.Info = StatInfo;
StatCard.Icon = StatIcon;
