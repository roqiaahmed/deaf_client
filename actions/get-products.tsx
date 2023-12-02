import { Product } from "@/types"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user_2YJU53RqkEMFZYjicKavT8jBaNz/products`;

const getProducts = async (): Promise<Product[]> => {
    const res = await fetch(URL, {cache: "no-cache"});
    return res.json();
}
export default getProducts;