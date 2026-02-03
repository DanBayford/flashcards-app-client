export const Toast = ({ data }: { data: { message: string } }) => {
  return <div className="text-xl font-semibold">{data.message}</div>;
};
