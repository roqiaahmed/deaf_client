"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import createOrder from '@/actions/create-order';
import { toast } from "react-hot-toast"

export default function Bill() {

  const bags = JSON.parse(localStorage.getItem('ShoppingBag') || '{}');
  const [total, setTotal] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    cost: total,
    details: bags
  });
  const [errors, setErrors] = useState({});
  
  const handleValidation = () => {
    const formFields = {...formData};
    const formErrors = {};
    let formIsValid = true;

          //Name
          if(!formFields["name"]){
            formIsValid = false;
            formErrors["name"] = "Cannot be empty";
          }

                //address
      if(!formFields["address"]){
        formIsValid = false;
        formErrors["address"] = "Cannot be empty";
      }

      //phone
      if(!formFields["phone"]){
        formIsValid = false;
        formErrors["phone"] = "Cannot be empty";
      }
    setErrors(formErrors)
    return formIsValid;
  }

    useEffect(() => {
      let calculatedTotal = 0;
  
      Object.entries(bags).forEach(([key, value]) => {
        calculatedTotal += value.product.price * value.count;
      });
      setTotal(calculatedTotal);
      setFormData({
        name: '',
        phone: '',
        address: '',
        cost: calculatedTotal,
        details: bags
      });
    },[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()){
      try{
        await createOrder(formData);
        console.log("===========>",formData);
        
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
      cost: 0,
      details: {}
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
      {Object.entries(bags).map(([key, value]) => (
        <div 
        key={key} 
        className='grid grid-cols-3 text-center py-1 border-b-[1px] border-[#e6d6d06e] mx-24'>
          <p>{value.product.name}</p>
          <p>{value.count}</p>
          <p>{value.product.price * value.count} $</p>
        </div>
      ))}
      <div className='text-center border-t-[4px] border-[#e6d6d06e] mb-9 mx-20'>
        <span>Total: {total} $</span>
      </div>
      <div className='border-t-[3px] border-[#dcc8bfb9]'>
      <form 
      className='border-t-[3px] border-[#dcc8bfb9]' 
      onSubmit={handleSubmit}>
        <div className='grid grid-cols-6 text-center mt-5' >
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor='phone'>Phone:</label>
        <input
          id='phone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
        />

        <label htmlFor='address'>Address:</label>
        <textarea
          id='address'
          name='address'
          value={formData.address}
          onChange={handleChange}
        />
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
