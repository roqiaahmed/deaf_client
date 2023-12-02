"use client";

import { Color, Product, Scent } from '@/types';
import { ShoppingBag } from "lucide-react";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Bag } from '@/types';
import { toast } from "react-hot-toast"

interface Props {
    categoryId:string
    products: Product[]
    colors: Color[]
    scents: Scent[]
}

const Productcard: React.FC<Props> = (
    { categoryId, products, colors, scents }
) =>{

  const [bag, setBag] = useState<Bag>(JSON.parse(localStorage.getItem('ShoppingBag') || '{}'));

  useEffect(() => {
    localStorage.setItem('ShoppingBag', JSON.stringify(bag));
  }, [bag]);

  return (
    <div className='grid grid-cols-4 md:grid-cols-2 sm:grid-cols-2 container bg-[#ffffff59] border-2 border-[#dcc8bfb9] '>
    {Array.isArray(products) &&
      products.map((product) =>
        product.categoryId === categoryId ? (
          <div  key={product.id} 
                className='m-4 text-[#54551ce0] font-bold border-2 border-[#d0bcb3b9] bg-[#fff] my-4'>
            <Image 
            className='w-[100%] h-[230px] mx-auto'
            src={product.urlImage} 
            priority={false} 
            alt={product.name} 
            width={100} 
            height={100} 
            />
            <div className='my-4 ml-2'>
              <h1>{product.name}</h1>
              {Array.isArray(colors) &&
                colors.map((color) =>
                product.colorId === color.id ? 
                (
                <p key={color.id}> Color : 
                    <span 
                    className="rounded-full h-3 w-3 inline-block mx-2" 
                    style={{backgroundColor : `${color.value}`}}/>
                    {color.name} 
                </p>
                    ) : " " )}

              {Array.isArray(scents) &&
                scents.map((scent) =>
                product.scentId === scent.id ?
                (
                  <p key={scent.id}>Scent : {scent.name}</p>
                ) : " ")}
              <p>description : { product.description}</p>
              <p>Price: { product.price} $</p>
            </div>
            <button 
            onClick={() => {
              setBag({
                ...JSON.parse(localStorage.getItem('ShoppingBag') || '{}'),
                [product.id]: {
                  product,
                  count: bag[product.id] ? bag[product.id].count + 1 : 1
                }
              });
              toast.success(`${product.name} added to your bag`);
            }}
            className="bg-[#dcc8bf] hover:bg-[#dcc8bfb9] text-white font-bold mx-[41%] mb-4 py-2 px-4 rounded">
                <ShoppingBag size={20} className='mx-auto'/>
            </button>
          </div>
        ) : (
          ""
        ))}
  </div>
  )
}
export default Productcard;