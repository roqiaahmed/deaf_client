"use client";

import { Category, Color, Product, Scent } from "@/types";
import Productcard from "./product-card";

interface Props {
    categories: Category[],
    products: Product[]
    colors: Color[]
    scents: Scent[]
}

const Category: React.FC<Props> = (
    { categories, products, colors, scents }
    ) =>{
  return (
    <div>
        {Array.isArray(categories) &&
        categories.map((category: any) => (
            <div key={category.id} className='border-b-2 border-[#dcc8bfb9] mb-12 text-[#54551ce0] font-bold'>
            <h2 className='my-8 text-[25px] text-[#fff]'>{category.name}</h2>
            
            <Productcard categoryId={category.id} products={products} colors={colors} scents={scents} />
            </div>
        ))}
    </div>
  )
}
export default Category;