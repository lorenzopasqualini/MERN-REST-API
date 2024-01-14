'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('/api/user');
        setUsers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (     
    <div className='container'>
      <ul className='list'>
        {users.map((user: any) => (
          <li key={user.id} className='item'>
            <Image src="/pfp.webp" alt="pfp" width={40} height={40} style={{ borderRadius: '2rem' }} />
            <div className='info'>
              <p>{user.username}</p>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <p>{user.address.street} {user.address.suite}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/new-user" id='add'>+</Link>
    </div>
  );
};

export default Home;
