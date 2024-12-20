import { SiMicrosoftexcel } from "react-icons/si";
import * as XLSX from "xlsx/xlsx.mjs";

const ExcelDownloadBtn = ({ data = [], fileName }) => {
  return (
    <button
      className="download-btn"
      onClick={() => {
        const datas = data?.length ? data : [];
        const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
      }}
    >
      <div className="flex items-center text-white rounded-lg gap-2 bg-customPrBg p-2">
        <SiMicrosoftexcel />
        Download
      </div>
    </button>
  );
};

export default ExcelDownloadBtn;