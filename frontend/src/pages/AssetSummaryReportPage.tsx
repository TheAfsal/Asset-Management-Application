import { useEffect } from 'react';
import { useReports } from '../hooks/useReports';
import AssetSummaryReport from '../components/reports/AssetSummaryReport';

const AssetSummaryReportPage: React.FC = () => {
  const { summaries, fetchAssetSummaries } = useReports();

  useEffect(() => {
    fetchAssetSummaries();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Asset Summary Report</h1>
      <AssetSummaryReport summaries={summaries} />
    </div>
  );
};

export default AssetSummaryReportPage;