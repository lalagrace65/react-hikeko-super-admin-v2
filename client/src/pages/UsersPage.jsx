import React, { useEffect, useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';  
import DataTable from '@/components/forms/DataTable';
import DownloadBtn from '@/components/icons/DownloadBtn';
import { createColumnHelper } from '@tanstack/react-table';
import { baseURL } from '@/Url';


export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const columnHelper = createColumnHelper();


   // Fetch data from the API
   useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchData();
}, []);

// Define columns for the table
const columns = useMemo(() => [
    columnHelper.accessor("", {
        id: "No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "No.",
    }),
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
