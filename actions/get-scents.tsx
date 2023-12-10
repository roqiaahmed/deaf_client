import { Scent } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/scents`;

const getScents = async (): Promise<Scent[]> => {
    const res = await fetch(URL);
    return res.json();
}

export default getScents;