import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import type { Grn, Vendor, Branch } from '../types';

interface ColumnDefinition {
  header: string;
  key: string;
  formatter?: (value: any, rowData?: Grn, vendors?: Vendor[], branches?: Branch[]) => string | number;
  width?: number;
}

export const exportToExcel = (
  data: Grn[],
  fileName: string,
  columns: ColumnDefinition[],
  vendors: Vendor[] = [],
  branches: Branch[] = []
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('GRN Report');

  // Define columns
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width || 15,
  }));

  // Style header row
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFD3D3D3' }, // Light gray background
  };

  // Add data rows
  data.forEach((item) => {
    const rowData: Record<string, any> = {};
    columns.forEach((col) => {
      const keys = col.key.split('.');
      let value = item;
      for (const key of keys) {
        value = value ? (value as any)[key] : null;
      }
      rowData[col.key] = col.formatter ? col.formatter(value, item, vendors, branches) : value;
    });
    const row = worksheet.addRow(rowData);
    // Format Total Amount column as currency
    if (rowData['total_amount']) {
      const cell = row.getCell('total_amount');
      cell.numFmt = '$#,##0.00'; // Format as currency (e.g., 7080.00)
    }
  });

  // Auto-adjust column widths based on content (optional)
  worksheet.columns.forEach((column) => {
    let maxLength = column.header!.length;
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row
      const cellValue = row.getCell(column.key!).value?.toString() || '';
      maxLength = Math.max(maxLength, cellValue.length);
    });
    column.width = Math.min(maxLength + 2, 50); // Cap width at 50
  });

  // Generate and save the file
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${fileName}.xlsx`);
  });
};