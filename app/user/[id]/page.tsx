'use client'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const User = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
    },
  });

  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api${pathname}`);
        const userData = await response.json();
        setForm({...userData.data, external_id: userData.data.external_id});
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [pathname]);

   const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.email || !form.address.street || !form.address.suite){
      toast.error("Some fields are missing");
      return;
    }

    try {
      const response = await fetch(`/api${pathname}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          address: {
            street: form.address.street,
            suite: form.address.suite,
          }
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success('User was successfully updated');
        router.push('/');
      } else {
        toast.error('Taken username or e-mail');
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className='form'>
      <input className='item' type="text" name="name" placeholder="Name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className='item' type="text" name="username" placeholder="Username" value={form.username || ''} onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input className='item' type="email" name="email" placeholder="E-Mail" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className='item' type="text" name="street" placeholder="Street" value={form.address.street || ''} onChange={(e) => setForm({ ...form, address: { ...form.address, street: e.target.value } })} />
      <input className='item' type="text" name="suite" placeholder="Suite" value={form.address.suite || ''} onChange={(e) => setForm({ ...form, address: { ...form.address, suite: e.target.value } })} />
      <button type="submit" className='item' id='create'>Save</button>
    </form>
  );
};

export default User;
