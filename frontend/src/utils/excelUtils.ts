import * as XLSX from "exceljs";
import axios from "axios";

export const exportToExcel = async (
  data: any[],
  fileName: string,
  columns: { header: string; key: string; formatter?: (value: any) => string }[]
) => {
  const workbook = new XLSX.Workbook();
  const worksheet = workbook.addWorksheet(fileName);

  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
  }));
  data.forEach((item) => {
    worksheet.addRow(
      columns.reduce((row, col) => {
        //@ts-ignore
        row[col.key] = col.formatter
          ? col.formatter(item[col.key])
          : item[col.key];
        return row;
      }, {})
    );
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;
  link.click();
};

export const importFromExcel = async (file: File, endpoint: string) => {
  const workbook = new XLSX.Workbook();
  const arrayBuffer = await file.arrayBuffer();
  await workbook.xlsx.load(arrayBuffer);
  const worksheet = workbook.getWorksheet(1);
  const data: any[] = [];

  if (!worksheet) {
    return;
  }

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const rowData: any = {};
      row.eachCell((cell, colNumber) => {
        rowData[worksheet.columns[colNumber - 1]!.key!] = cell.value;
      });
      data.push(rowData);
    }
  });

  await Promise.all(data.map((item) => axios.post(endpoint, item)));
};
