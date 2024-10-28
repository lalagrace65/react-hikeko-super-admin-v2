import React, { useEffect, useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';  
import DataTable from '@/components/forms/DataTable';
import DownloadBtn from '@/components/icons/DownloadBtn';


export default function UsersPage() {
  const [users, setUsers] = useState([]);

   // Fetch data from the API
   useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchData();
}, []);

// Define columns for the table
const columns = useMemo(() => [
    {
        header: 'ID',
        accessorKey: '_id', // Assuming your user data includes an `_id` field from MongoDB
        footer: 'ID',
    },
    {
        header: 'Name',
        accessorFn: row => `${row.username}`, // Adjust according to your user schema
        footer: 'Name',
    },
    {
        header: 'Email',
        accessorKey: 'email',
        footer: 'Email',
    },
    {
        header: 'Role',
        accessorKey: 'role', // Adjust if needed
        footer: 'Role',
    },
], []);

  return (
    <div className='flex'>
        <Sidebar/>
        <div className="flex-1 p-4">
          <h1 className="mb-4 text-xl font-semibold"> User Page</h1>
          <DownloadBtn data={users} fileName="Hikeko_Users" />
          <DataTable columns={columns} data={users} />  
        </div>
    </div>
  );
}
