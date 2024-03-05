import React ,{ useRef } from 'react'
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import EmailVerify from '../components/EmailVerify';

function RegisterPage() {

  const form = useRef();

  const [confirm,setConfirm]=useState(false);
  const [information,setInformation]=useState({});
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async(data) => {
    if (data.password===data.confirmpassword) {
    console.log(data);
    setInformation(data)
    console.log(form.current);
    emailjs
      .sendForm('service_bkgqxjq', 'template_kps0745', form.current, {
        publicKey: 'Aqy5vxlkXUDLZ3OOJ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      setConfirm(true)
    }else{
      alert("password are not the same")
    }
  }
  
  return (
    <div className='bg-gray-600 flex w-screen h-screen flex-col justify-center items-center'>
{!confirm?
    <div className=" w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-black dark:border-gray-700">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register to break</h5>
    <form ref={form} onSubmit={handleSubmit(onSubmit)} className="space-y-6 mr-7" action="#">
      <div className="flex">
      <div className='w-1/2 p-1'>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type='email' placeholder="email" {...register("email",{ required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
        </div>
        {errors.email && <span className='text-gray-900 dark:text-white'>This field is required</span>}
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" {...register("password",{ required: true ,minLength: 8})} placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
        </div>
        {errors.password && <span className='text-gray-900 dark:text-white'>This field must be 8 digit </span>}
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">confirm your password</label>
            <input type="password" {...register("confirmpassword",{ required: true })} placeholder="confirm password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
        </div>
        {errors.confirmpassword && <span className='text-gray-900 dark:text-white'>This field is required</span>}
      </div>
      <div className='w-1/2 p-1'>
        <div className='flex'>
        <div className='w-1/2 px-0.5'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" {...register("firstname",{ required: true })} placeholder="First name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
        </div>
        <div className='w-1/2 px-0.5'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input type="text" {...register("lastname",{ required: true })} placeholder="last name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
        </div>
        </div>
        {(errors.lastname||errors.firstname) && <span className='text-gray-900 dark:text-white'>This field is required</span>}
         <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">birth date</label>
            <input type="date" {...register("date",{ required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
        </div>
        {errors.date && <span className='text-gray-900 dark:text-white'>This field is required</span>} 
        <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">gender</label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" {...register("gender", { required: true })}>
          <option value="other">other</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="they">they</option>
        </select>
        </div>
        {errors.gender && <span className='text-gray-900 dark:text-white'>This field is required</span>} 
        <input type="hidden" {...register("passwordemail")} value={"1245"}  />
      </div>
      </div>
        <button type="submit" className="w-full text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-blue-800">Login to your account</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have a user? <Link className="text-white hover:underline dark:text-white" to={"/"}>login now</Link>
        </div>
    </form>
</div>:

<EmailVerify information={information}/>
}

    </div>
  )
}

export default RegisterPage

