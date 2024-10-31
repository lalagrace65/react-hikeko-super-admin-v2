import Sidebar from '../components/Sidebar';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import TrailForm from '@/components/forms/TrailForm';
import { FaPlus } from "react-icons/fa6";
import DataTable from '@/components/forms/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import ExcelDownloadBtn from '@/components/icons/DownloadBtn';
import PdfFile from '@/components/table/pdfFile';
import PDFDownloadButton from '@/components/icons/PDFDownload';

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
      Cell: ({ row }) => <div className="text-wrap whitespace-normal text-justify ">{row.details}</div>,
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
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" className="bg-red-400">
              <FaPlus/>Add new Trail
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
            <DialogTitle className="sr-only">Add New Trail</DialogTitle>
                <div className="p-4 bg-white rounded-lg">
                  <TrailForm />
                </div>
        </DialogContent>
        </Dialog>

        <div className="flex justify-end gap-2">
          <ExcelDownloadBtn data={trails} fileName={"Trails"} />
          <PDFDownloadButton 
            document={<PdfFile columns={columns} data={trails}/>} 
            filename={"Trails"} 
          />
        </div>
        
        <DataTable columns={columns} data={trails} />  

      </div>
    </div>
  )
}
