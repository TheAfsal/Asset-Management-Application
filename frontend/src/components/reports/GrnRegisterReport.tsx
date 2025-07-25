import { useState, useMemo } from 'react';
import { useReports } from '../../hooks/useReports';
import type { Grn } from '../../types';
import { exportToExcel } from '../../utils/excelUtils';

interface GrnRegisterReportProps {
  grns: Grn[];
}

const GrnRegisterReport: React.FC<GrnRegisterReportProps> = ({ grns }) => {
  const [filters, setFilters] = useState({
    dateRange: '',
    vendor: '',
    branch: '',
  });
  const [dateRangeError, setDateRangeError] = useState<string | null>(null);
  const { vendors, branches, loading, error } = useReports();

  const parseDateRange = (range: string): { start: Date | null; end: Date | null } => {
    if (!range) return { start: null, end: null };
    const [startStr, endStr] = range.split(' to ').map((s) => s.trim());
    if (!startStr || !endStr || isNaN(Date.parse(startStr)) || isNaN(Date.parse(endStr))) {
      setDateRangeError('Invalid date range. Use format: YYYY-MM-DD to YYYY-MM-DD');
      return { start: null, end: null };
    }
    const start = new Date(startStr);
    const end = new Date(endStr);
    if (start > end) {
      setDateRangeError('Start date must be before or equal to end date');
      return { start: null, end: null };
    }
    setDateRangeError(null);
    return { start, end };
  };

  const filteredGrns = useMemo(() => {
    const { dateRange, vendor, branch } = filters;
    const { start, end } = parseDateRange(dateRange);

    return grns.filter((grn) => {
      const grnDate = new Date(grn.header.grn_date);
      const matchesDate = (!start || grnDate >= start) && (!end || grnDate <= end);
      const matchesVendor = !vendor || grn.header.vendor_id === parseInt(vendor);
      const matchesBranch = !branch || grn.header.branch_id === parseInt(branch);

      return matchesDate && matchesVendor && matchesBranch;
    });
  }, [grns, filters]);

  const handleExport = () => {
    if (filteredGrns.length === 0) {
      alert('No GRNs to export. Please adjust filters or check data availability.');
      return;
    }
    exportToExcel(filteredGrns, 'grn_register', [
      { header: 'GRN Number', key: 'header.grn_number' },
      {
        header: 'GRN Date',
        key: 'header.grn_date',
        formatter: (date: string) => new Date(date).toLocaleDateString(),
      },
      { header: 'Invoice Number', key: 'header.invoice_number' },
      {
        header: 'Vendor',
        key: 'header.vendor_id',
        formatter: (id: number) => vendors.find((v) => v.id === id)?.name || 'N/A',
      },
      {
        header: 'Branch',
        key: 'header.branch_id',
        formatter: (id: number) => branches.find((b) => b.id === id)?.name || 'N/A',
      },
      {
        header: 'Total Amount',
        key: 'total_amount',
        formatter: (amount: number) => (amount ? amount.toFixed(2) : '0.00'),
      },
    ]);
  };

  return (
    <div>
      {(error || dateRangeError) && (
        <div className="mb-4 text-red-500">
          {error || dateRangeError}
        </div>
      )}
      {loading && (
        <div className="mb-4 text-center">Loading GRNs...</div>
      )}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Date Range (e.g., 2025-07-01 to 2025-07-31)"
          value={filters.dateRange}
          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
          className={`p-2 border rounded ${dateRangeError ? 'border-red-500' : ''}`}
        />
        <select
          value={filters.vendor}
          onChange={(e) => setFilters({ ...filters, vendor: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Vendors</option>
          {vendors.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <select
          value={filters.branch}
          onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Branches</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          disabled={loading || filteredGrns.length === 0}
        >
          Export to Excel
        </button>
      </div>
      {filteredGrns.length === 0 && !loading && !error && (
        <div className="mb-4 text-gray-500">No GRNs match the selected filters.</div>
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">GRN Number</th>
            <th className="p-2 text-left">GRN Date</th>
            <th className="p-2 text-left">Invoice Number</th>
            <th className="p-2 text-left">Vendor</th>
            <th className="p-2 text-left">Branch</th>
            <th className="p-2 text-left">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrns.map((grn) => (
            <tr key={grn.header.id}>
              <td className="p-2">{grn.header.grn_number}</td>
              <td className="p-2">{new Date(grn.header.grn_date).toLocaleDateString()}</td>
              <td className="p-2">{grn.header.invoice_number}</td>
              <td className="p-2">{vendors.find((v) => v.id === grn.header.vendor_id)?.name || 'N/A'}</td>
              <td className="p-2">{branches.find((b) => b.id === grn.header.branch_id)?.name || 'N/A'}</td>
              <td className="p-2">{grn.total_amount ? grn.total_amount.toFixed(2) : '0.00'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrnRegisterReport;