import type React from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GRNList from "./pages/GRNList";
import GRNForm from "./pages/GRNForm";
import AssetCategoryList from "./pages/AssetCategoryList/index";
import AssetSubcategoryList from "./pages/AssetSubcategoryList/index";
import BranchList from "./pages/BranchList/index";
import VendorList from "./pages/VendorList/index";
import ManufacturerList from "./pages/ManufacturerList/index";
import GrnRegisterReportPage from "./pages/GrnRegisterReportPage";
import GRNView from "./pages/GRNView";

const App: React.FC = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authPages = ["/login", "/signup"];
  const isAuthPage = authPages.includes(location.pathname);

  console.log(isAuthenticated);

  if (isAuthPage) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/grns" element={<GRNList />} />
          <Route path="/grns/new" element={<GRNForm />} />
          <Route path="/grns/edit/:id" element={<GRNForm />} />
          <Route path="/grns/view/:id" element={<GRNView />} />
          <Route path="/asset-categories" element={<AssetCategoryList />} />
          <Route
            path="/asset-subcategories"
            element={<AssetSubcategoryList />}
          />
          <Route path="/branches" element={<BranchList />} />
          <Route path="/vendors" element={<VendorList />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route
            path="/reports/grn-register"
            element={<GrnRegisterReportPage />}
          />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
