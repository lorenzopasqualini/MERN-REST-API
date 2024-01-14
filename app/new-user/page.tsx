'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

const NewUser = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.email || !form.address.street || !form.address.suite){
      toast.error("Some fields are missing");
      return;
    }

    try {
      const response = await fetch("/api/user/new", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          address: {
            street: form.address.street,
            suite: form.address.suite,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json()
      if (data.success) {
        toast.success('User was successfully created');
        router.push('/');
      } else if (data.message === 'Username already exists') {
        toast.error('Username already exists');
      } else if (data.message === 'Mail already exists') {
        toast.error('Mail already exists');
      } else {
        toast.error('An error occurred. Try again later')
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <input className='item' type="text" name="name" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className='item' type="text" name="username" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input className='item' type="email" name="email" placeholder="E-Mail" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className='item' type="text" name="street" placeholder="Street" onChange={(e) => setForm({ ...form, address: { ...form.address, street: e.target.value } })} />
      <input className='item' type="text" name="suite" placeholder="Suite" onChange={(e) => setForm({ ...form, address: { ...form.address, suite: e.target.value } })} />
      <button type="submit" className='item' id='create'>Create</button>
    </form>
  );
};

export default NewUser;
