import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user_2YJU53RqkEMFZYjicKavT8jBaNz/billboards`;
const getBillboards = async (): Promise<Billboard[]> => {
  const res = await fetch(URL, {cache: "no-cache"});
  return res.json();
}

export default getBillboards;