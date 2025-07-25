import { useReports } from '../hooks/useReports';
import GrnRegisterReport from '../components/reports/GrnRegisterReport';

const GrnRegisterReportPage = () => {
  const { grns } = useReports();

  return <GrnRegisterReport grns={grns} />;
};

export default GrnRegisterReportPage;