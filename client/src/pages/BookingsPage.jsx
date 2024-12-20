import { baseURL } from '@/Url';
import Sidebar from '../components/Sidebar';
import DataTable from '@/components/forms/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const columnHelper = createColumnHelper();

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}/bookings`);
            console.log('Fetched bookings:', response.data);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchData();
  }, []);
  
  const columns = useMemo(() => [
    columnHelper.accessor("", {
      id: "No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "No.",
    }),
    {
      header: 'Trail Name',
      accessorFn: (row) => row.packageId?.trailId?.title ,
    },
    {
      header: 'Travel Agency',
      accessorFn: (row) => row.packageId?.travelAgency?.name ,
    },
    {
        header: 'Joiner Name',
        accessorFn: row => `${row.joinerName}`, // Adjust according to your user schema
    },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
      header: 'Contact No.',
      accessorKey: 'contactNumber',
    },
    {
      header: 'PickUp Location',
      accessorKey: 'pickupLocation',
    },
    {
      header: 'Age',
      accessorKey: 'age',
    },
    {
      header: 'Sex',
      accessorKey: 'sex',
    },
    {
      header: 'Home Address',
      accessorKey: 'homeAddress',
    },
    {
      header: 'Emergency Contact Person',
      accessorKey: 'emergencyContactPerson',
    },
    {
      header: 'Emergency Contact Number',
      accessorKey: 'emergencyContactNumber',
    },
    {
      header: 'Medical Condition',
      accessorKey: 'medicalCondition',
    },
    {
      header: 'Condition Details',
      accessorKey: 'conditionDetails',
    },
    columnHelper.accessor("proofOfPayment", {
      cell: (info) => (
        <img
          src={info?.getValue()}
          alt="..."
          className="rounded-full w-10 h-10 object-cover"
        />
      ),
      header: "Proof of Payment",
    }),
    {
      header: 'Status',
      accessorKey: 'status',
    },
    
    ], []);

  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex-1 p-4'>
          <h1 className="mb-4 text-xl font-semibold">Bookings Page</h1>
          <DataTable columns={columns} data={bookings} />  
        </div>
    </div>
  )
}
