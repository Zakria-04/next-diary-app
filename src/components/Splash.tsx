// Remove 'use client'
import { isLive } from "@/res/api";
import { redirect } from "next/navigation";
import Loading from "./Loading";

const Splash = async () => {
  const response = await isLive();

  if (response.live) {
    redirect("/login");
  }

  return <Loading />;
};

export default Splash;
