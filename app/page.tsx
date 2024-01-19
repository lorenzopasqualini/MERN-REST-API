'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAndSync = async () => {
      try {
        const fetchDbUsers = await axios.get('/api/user');
        const dbUsers = fetchDbUsers.data.data;
  
        const fetchPublicApi = await axios.get('https://jsonplaceholder.typicode.com/users');
        const apiUsers = fetchPublicApi.data;

        if (JSON.stringify(dbUsers) !== JSON.stringify(apiUsers)) {
          const syncResponse = await fetch('/api/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dbUsers),
          });
  
          const syncUsers = await syncResponse.json();
          setUsers(syncUsers.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchAndSync();
  }, []);
  

  return (
    <>
      <ul className='list'>
        {users.map((user: any) => (
          <Link key={user.id} href={`/user/${user.external_id}`}>
            <li className='item'>
              <Image src="/pfp.webp" alt="pfp" width={40} height={40} style={{ borderRadius: '2rem' }} />
              <div className='info'>
                <p>{user.username}</p>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
                <p>{user.address.street} {user.address.suite}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <Link href="/new-user" id='add'>+</Link>
    </>
  );
};

export default Home;
