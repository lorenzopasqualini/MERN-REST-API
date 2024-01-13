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
    try {
      await fetch("/api/user/new", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          address: {
            street: form.address.street,
            suite: form.address.suite,
          },
        })
      });
      router.push('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="text" name="username" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="email" name="email" placeholder="E-Mail" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="text" name="street" placeholder="Street" onChange={(e) => setForm({ ...form, address: { ...form.address, street: e.target.value } })} />
      <input type="text" name="suite" placeholder="Suite" onChange={(e) => setForm({ ...form, address: { ...form.address, suite: e.target.value } })} />
      <button type="submit">Create</button>
    </form>
  );
};

export default NewUser;
