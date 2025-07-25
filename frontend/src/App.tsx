import type React from "react"

import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import GRNList from "./pages/GRNList"
import GRNForm from "./pages/GRNForm"
import AssetCategoryList from "./pages/AssetCategoryList"
import AssetSubcategoryList from "./pages/AssetSubcategoryList"
import BranchList from "./pages/BranchList"
import VendorList from "./pages/VendorList"
import ManufacturerList from "./pages/ManufacturerList"
import GrnRegisterReportPage from "./pages/GrnRegisterReportPage"
import AssetSummaryReportPage from "./pages/AssetSummaryReportPage"

const App: React.FC = () => {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const authPages = ["/login", "/signup"]
  const isAuthPage = authPages.includes(location.pathname)

  if (isAuthPage) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AnimatePresence>
    )
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
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
      </AnimatePresence>
    </Layout>
  )
}

export default App
