// import { Order } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user_2YJU53RqkEMFZYjicKavT8jBaNz/orders`;

const createOrder = async (payload: any): Promise<any> => {
    const res = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    return res;
}

export default createOrder;