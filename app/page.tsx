'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'

const Home = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('/api/user');
        setUsers(response.data.data);
        // console.log(users);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  
  const sync = async () => {
    // try {
    //   const response = await axios.post('/api/sync');
    //   const data = await response.json();
    //   // setUsers(data.data);

    //   console.log(data);
    //   // toast.success('Re-synced with public API')
    //   // router.refresh()
    // } catch (error) {
    //   console.error(error);
    //   toast.error('Failed to re-sync with public API')
    // }
    try {
      const userList = await axios.get('https://jsonplaceholder.typicode.com/users');
      const userListData = userList.data;
      console.log(userListData);

      if (!userListData) {
        console.error('No data');
        return;
      } else {
        console.log("DATA", userListData);
      }
      const response = await fetch('/api/sync', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userListData),
      });

      const data = await response.json();
      console.log("END:",data);
      router.refresh()
    } catch (error) {
      console.error(error);
    }
  };

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
      <Link href="/" onClick={sync} id='sync'>Sync</Link>
      {!users ? null : JSON.stringify(users)}
    </>
  );
};

export default Home;