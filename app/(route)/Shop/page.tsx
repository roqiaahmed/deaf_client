"use client";
import { Bag } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation';

export default function ShoppingBag() {
  const [bags, setBags] = useState<Bag>({});
  const [init, setInit] = useState(false);
  const router = useRouter()

  const Up = (productId: string) => {
    const productObject = bags[productId];
    if (productObject) {
      productObject.count += 1;
    }

    setBags({...bags, [productId]:productObject})
  };

  const Dowen = (productId: string) => {
    console.log('productId', productId);
    const productObject = bags[productId];
    if (productObject && productObject.count > 1) {
      productObject.count -= 1;
    }

    setBags({...bags, [productId]:productObject});
  };

  const Delete = (productId: string) => {
    const productObject = bags[productId];
    if (productObject) {
      delete bags[productId]
    }
    setBags({...bags})
    toast.success('Product deleted from the shopping bag');
  }

  useEffect(() => {
    setBags(JSON.parse(localStorage.getItem('ShoppingBag') || '{}'));
    setInit(true);
  }, []);

  useEffect(() => {
    if (init){
      localStorage.setItem('ShoppingBag', JSON.stringify(bags));
    }
  }, [init, bags]);
  
  return (
    <div>
      <h1>Shopping Bag</h1>
      <div className='grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 container bg-[#ffffff59] border-2 border-[#dcc8bfb9]'>
        {Object.entries(bags).map(([key, value]) => (
          <div 
          key={key}
          className='m-4 text-[#54551ce0] font-bold border-2 border-[#d0bcb3b9] bg-[#fff] my-4'
          >
          <button  onClick={()=> Delete(key)}
          className='absolute text-[#696a3a] p-4 hover:text-[#999]'
          >
            X
          </button>
            <Image 
            className='w-[100%] h-[230px] mx-auto'
            src={value.product.urlImage} 
            priority={false} 
            alt={value.product.name} 
            width={100} 
            height={100} 
            />
            <div className='p-4'>
            <h1 className='text-[#795548] text-lg'>{value.product.name}</h1>
            <p>description : { value.product.description}</p>
            <p>Price: { value.product.price} $</p>
            </div>
            <div className='items-center px-10 h-[45px] grid grid-cols-3'>
              <button className='mr-auto' onClick={() => {Up(key)}}>+</button>
              <p className='px-6'>{value.count}</p>
              {value.count !== 1 &&
              <button className='ml-auto' onClick={() => Dowen(key)}>-</button>
              }
            </div>
          </div>
        ))}
        {Object.entries(bags).length === 0 &&
          <div className='col-span-4 text-center'>
            <h1 className='text-[#795548] text-lg'>Your shopping bag is empty</h1>
            </div>
        }
      </div>
        {Object.entries(bags).length !== 0 &&
            <div className='grid grid-cols-1 centerplace-content-center'>
              <button 
              className='p-4 text-[#ffffff]  font-bold bg-[#ff0000b8] '
              onClick={()=> (router.push('/Shop/bill'))}>
                Buy Now
              </button>
            </div>
        }
    </div>
  )
}
