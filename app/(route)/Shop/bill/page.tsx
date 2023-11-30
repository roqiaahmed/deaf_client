"use client";

import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import createOrder from '@/actions/create-order';
import { toast } from "react-hot-toast"
import { Bag } from '@/types';

interface FormData {
  name: string;
  phone: string;
  address: string;
}
export default function Bill() {

  const bags = useMemo(() => {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('ShoppingBag') || '{}');
    }
    return {};
  }, []);

  const [total, setTotal] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  const handleValidation = (): boolean => {
    const formFields = { ...formData };
    const formErrors: Partial<FormData> = {};
    let formIsValid = true;

    // Name
    if (!formFields.name) {
      formIsValid = false;
      formErrors.name = 'Cannot be empty';
    }

    // Address
    if (!formFields.address) {
      formIsValid = false;
      formErrors.address = 'Cannot be empty';
    }

    // Phone
    if (!formFields.phone) {
      formIsValid = false;
      formErrors.phone = 'Cannot be empty';
    }

    setErrors(formErrors);
    return formIsValid;
  };
  useEffect(() => {
    let calculatedTotal = 0;
    if (bags) {
      Object.entries(bags).forEach(([key, value]: [string, any]) => {
        calculatedTotal += value?.product.price * value?.count;
      });
    }
    setTotal(calculatedTotal);
  }, [bags]);

  useEffect(() => {
    
    setFormData((prevFormData) => ({
      ...prevFormData,
    }));
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(handleValidation()){
      const data = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        cost: total,
        details: bags
      }
      try{
        await createOrder(data);
        console.log("===========>",data);
        
        toast.success("Order created successfully")
      } catch (error){
        console.log(error)
      }
    }else{
      toast.error("Please fill in all the fields")
    }
    
    // Reset the form fields if needed
    setFormData({
      name: '',
      phone: '',
      address: '',
    });
  };

  return (
    <div className='container mx-auto bg-[#ffffff99] py-5'>
        <div 
          className='grid grid-cols-3 font-bold text-center py-1 border-b-[1px] border-[#e6d6d06e] mx-24'>
            <p>Name</p>
            <p>Quantity</p>
            <p>Price</p>
        </div>
      { bags && Object.entries(bags).map(([key, value]: [string, any]) => (
        <div 
        key={key} 
        className='grid grid-cols-3 text-center py-1 border-b-[1px] border-[#e6d6d06e] mx-24'>
          <p>{value?.product.name}</p>
          <p>{value?.count}</p>
          <p>{value?.product.price * value.count} $</p>
        </div>
      ))}
      <div className='text-center border-t-[4px] border-[#e6d6d06e] mb-9 mx-20'>
        <span>Total: {total} $</span>
      </div>
      <div className='border-t-[3px] border-[#dcc8bfb9]'>
      <form 
      className='border-t-[3px] border-[#dcc8bfb9]' 
      onSubmit={handleSubmit}>
        <div className='grid grid-cols-3 text-center mt-5' >
          <div>
            {errors.name && <p className='text-red-500'>{errors.name}</p>}
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
            <label htmlFor='phone'>Phone:</label>
            <input
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            {errors.address && <p className='text-red-500'>{errors.address}</p>}
            <label htmlFor='address'>Address:</label>
            <textarea
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <button 
        type='submit'
        className='p-3 bg-[#8d352f6e] w-[50%] mx-[25%] mt-5'
        >Confirm</button>
      </form>
      </div>
    </div>
  )
} 
