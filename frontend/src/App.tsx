import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import GRNList from './pages/GRNList';
import GRNForm from './pages/GRNForm';
import AssetCategoryList from './pages/AssetCategoryList';
import AssetSubcategoryList from './pages/AssetSubcategoryList';
import BranchList from './pages/BranchList';
import VendorList from './pages/VendorList';
import ManufacturerList from './pages/ManufacturerList';
import GrnRegisterReportPage from './pages/GrnRegisterReportPage';
import AssetSummaryReportPage from './pages/AssetSummaryReportPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/grns" element={<GRNList />} />
            <Route path="/grns/new" element={<GRNForm />} />
            <Route path="/asset-categories" element={<AssetCategoryList />} />
            <Route path="/asset-subcategories" element={<AssetSubcategoryList />} />
            <Route path="/branches" element={<BranchList />} />
            <Route path="/vendors" element={<VendorList />} />
            <Route path="/manufacturers" element={<ManufacturerList />} />
            <Route path="/reports/grn-register" element={<GrnRegisterReportPage />} />
            <Route path="/reports/asset-summary" element={<AssetSummaryReportPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;