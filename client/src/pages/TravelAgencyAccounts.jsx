import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';  
import DataTable from '@/components/forms/DataTable';
import Sidebar from '../components/Sidebar'
import { createColumnHelper } from '@tanstack/react-table';
import { baseURL } from '@/Url';
export default function TravelAgencyAccounts() {
  const [travelAgencyAccounts, setTravelAgencyAccounts] = useState([]);
  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor("", {
      id: "No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "No.",
    }),
    {
        header: 'Name',
        accessorFn: row => `${row.name}`, // Adjust according to your user schema
    },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Role',
        accessorKey: 'role', // Adjust if needed
    },
], []);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}/travelAgencyAccounts`);
            setTravelAgencyAccounts(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchData();
}, []);

  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex-1 p-4'>
          <h1 className="mb-4 text-xl font-semibold">Travel Agency Accounts</h1>
          <DataTable columns={columns} data={travelAgencyAccounts} />  
        </div>
    </div>
  )
}
