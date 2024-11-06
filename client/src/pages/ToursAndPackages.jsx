import React from 'react'
import Sidebar from '../components/Sidebar';
import DataTable from '@/components/forms/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { baseURL } from '@/Url';
export default function ToursAndPackages() {
  const [toursAndPackages, setToursAndPackages] = useState([]);
  const columnHelper = createColumnHelper();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}/toursAndPackages`);
            console.log('Fetched tours and packages:', response.data);
            setToursAndPackages(response.data);
        } catch (error) {
            console.error('Error fetching tours and packages:', error);
        }
    };

    fetchData();
  }, []);
  

  // Fetch data from the API
  const columns = useMemo(() => [
    columnHelper.accessor("", {
      id: "No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "No.",
    }),
    {
      header: 'Trail Name',
      accessorFn: (row) => row.trailId?.title ,
    },
    {
      header: 'Travel Agency',
      accessorFn: (row) => row.packageId?.travelAgency?.name ,
    },
    {
        header: 'Packages',
        accessorKey: 'packages', // Adjust according to your user schema
    },
    {
        header: 'Price',
        accessorKey: 'price',
    },
    {
      header: 'Date',
      accessorKey: 'date',
    },
    {
      header: 'Downpayment Policy',
      accessorKey: 'dpPolicy',
    },

    {
      header: 'Pickup Location',
      accessorKey: 'pickupLocation',
    },
    {
      header: 'Coordinator',
      accessorKey: 'coordinatorName',
    },
    {
      header: 'Max Joiners',
      accessorKey: 'maxGuests',
    },
    {
      header: 'Est Time In',
      accessorKey: 'checkIn',
    },
    {
      header: 'Est Time Out',
      accessorKey: 'checkOut',
    },
    {
      header: 'Date Created',
      accessorKey: 'dateCreated',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
    ], []);
  
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex-1 p-4'>
          <h1 className="mb-4 text-xl font-semibold">Tours and Packages Page</h1>
          <DataTable columns={columns} data={toursAndPackages}/>
        </div>
    </div>
  )
}
