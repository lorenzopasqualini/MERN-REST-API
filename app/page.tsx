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

/*   useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user');
        setUsers(response.data.data);        
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();

    const sync = async () => {
      try {
        const publicApi = await axios.get('https://jsonplaceholder.typicode.com/users');
        const publicApiData = publicApi.data;
        setUsers(publicApiData);

        if (users !== publicApiData) {
          const response = await fetch('/api/sync', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(users),
          });

          const syncUsers = await response.json();
          setUsers(syncUsers.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    sync();
  }, []);
*/

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
      {!users ? null : JSON.stringify(users)}
    </>
  );
};

export default Home;
