import Sidebar from '../components/Sidebar';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import TrailForm from '@/components/forms/TrailForm';
import { FaPlus } from "react-icons/fa6";
import DataTable from '@/components/forms/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import DownloadBtn from '@/components/icons/DownloadBtn';

export default function TrailsPage() {
    const [trails,setTrails] = useState([]);
    const columnHelper = createColumnHelper();
    
    // Fetch data from the API
   useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/trails');
            setTrails(response.data);
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
  columnHelper.accessor("trailImages", {
    cell: (info) => (
      <img
        src={info?.getValue()}
        alt="..."
        className="rounded-full w-10 h-10 object-cover"
      />
    ),
    header: "Trail Images",
  }),
  {
      header: 'Trail Name',
      accessorKey: 'title', 
      footer: 'Trail Name',
  },
  {
      header: 'Description',
      accessorKey: 'description', 
      footer: 'Description',
  },
  {
      header: 'Features',
      accessorKey: 'features', 
      footer: 'Features',
  },
  {
    header: 'Location',
    accessorKey: 'trailLocation', 
    footer: 'Location',
  },
  {
    header: 'Trail Class',
    accessorKey: 'trailClass', 
    footer: 'Trail Class', 
  },
  {
    header: 'Difficulty Level',
    accessorKey: 'difficultyLevel', 
    footer: 'Difficulty Level', 
  },
  {
    header: 'Elevation',
    accessorKey: 'elevation', 
    footer: 'Elevation', 
  },
], []);

  return (
    <div className='flex'>
      <Sidebar/>
      <div className="flex-1 p-4">
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline" className="bg-red-400">
              <FaPlus/>Add new Trail
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
            <AlertDialogTitle className="sr-only">Add New Trail</AlertDialogTitle>
            <AlertDialogDescription>
                Fill out the form below to add a new trail to the system. Please provide all necessary details.
            </AlertDialogDescription>
                <div className="p-4 bg-white rounded-lg">
                    <TrailForm />
                </div>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

        <DownloadBtn data={trails} fileName={"Trails"} />
        <DataTable columns={columns} data={trails} />  

      </div>
    </div>
  )
}
