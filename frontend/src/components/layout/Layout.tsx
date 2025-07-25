import type React from "react";

import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
      />

      <Box className="flex">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          isMobile={isMobile}
        />

        <Box
          component="main"
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen && !isMobile ? "ml-80" : "ml-0"
          }`}
          sx={{
            minHeight: "calc(100vh - 80px)",
            mt: "80px",
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {children}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
