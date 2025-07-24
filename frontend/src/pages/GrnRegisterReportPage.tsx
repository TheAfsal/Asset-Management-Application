import { useEffect } from "react";
import { useReports } from "../hooks/useReports";
import GrnRegisterReport from "../components/reports/GrnRegisterReport";

const GrnRegisterReportPage: React.FC = () => {
  const { grns, fetchGrns } = useReports();

  useEffect(() => {
    fetchGrns();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GRN Register Report</h1>
      <GrnRegisterReport grns={grns} />
    </div>
  );
};

export default GrnRegisterReportPage;
