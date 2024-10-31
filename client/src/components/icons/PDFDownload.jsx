// PDFDownloadButton.js
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaFilePdf } from 'react-icons/fa';

const PDFDownloadButton = ({ document, filename, style }) => {
    return (
        <PDFDownloadLink
            className='flex'
            document={document}
            filename={filename}
        >
            
        <div className="flex items-center
            text-white rounded-lg 
            gap-2 bg-customPrBg p-2 width-[180px]">
            <FaFilePdf/>
            Download
        </div>
                   
        </PDFDownloadLink>
    );
};

export default PDFDownloadButton;
