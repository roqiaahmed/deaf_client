"use client";
import getBillboards from "@/actions/get-billbordes"
import { redirect } from "next/navigation";

const Home = () => {
  const redirectToBillboard = async () => {
    const firstBillboards = await getBillboards();
    redirect(`Billboards/${firstBillboards[0].id}`);
  };
  
  
  return <div>
    {redirectToBillboard()
  }</div>;
};
export default Home;