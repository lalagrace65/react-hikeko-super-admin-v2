import React, { useEffect, useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import DataTable from '@/components/forms/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';

export default function TravelAgencyCredentials() {
  const [travelAgencySignUp, setTravelAgencySignUp] = useState([]);
  const columnHelper = createColumnHelper();

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/travelAgencySignUp');
            setTravelAgencySignUp(response.data);
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
      header: 'Business Email',
      accessorKey: 'businessEmail',
      footer: 'Business Email',
  },
  {
      header: 'Business Name',
      accessorKey: 'businessName',
      footer: 'Business Name',
  },
  {
    header: 'Owner Name',
    accessorFn: row => `${row.ownerFirstName} ${row.ownerLastName}`,
    footer: 'Owner Name',
},
  columnHelper.accessor("birCertificatePhoto", {
    cell: (info) => (
      <img
        src={info?.getValue()}
        alt="..."
        className="  rounded-md w-20 h-20 object-cover"
      />
    ),
    header: "BIR Certificate",
  }),
  columnHelper.accessor("dtiPermitPhoto", {
    cell: (info) => (
      <img
        src={info?.getValue()}
        alt="..."
        className="  rounded-md w-20 h-20 object-cover"
      />
    ),
    header: "DTI Permit",
  }),
  columnHelper.accessor("businessPermitPhoto", {
    cell: (info) => (
      <img
        src={info?.getValue()}
        alt="..."
        className="  rounded-md w-20 h-20 object-cover"
      />
    ),
    header: "Business Permit",
  }),
  columnHelper.accessor("mayorsPermitPhoto", {
    cell: (info) => (
      <img
        src={info?.getValue()}
        alt="..."
        className="  rounded-md w-20 h-20 object-cover"
      />
    ),
    header: "Mayors Permit",
  }),
  {
    header: 'Status',
    accessorKey: 'status',
    footer: 'Status',
  },

  
], []);

  return (
    <div className='flex'>
        <Sidebar/>
        <div>
            <h1>Travel Agency Accounts Page</h1>
            <DataTable columns={columns} data={travelAgencySignUp}/>
        </div>
    </div>
  )
}
