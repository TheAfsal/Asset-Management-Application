"use client"

import type React from "react"

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
} from "@mui/material"
import {
  Dashboard,
  Receipt,
  Category,
  AccountTree,
  Business,
  Store,
  Factory,
  Assessment,
  ExpandLess,
  ExpandMore,
  Add,
  List as ListIcon,
} from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
}

const menuItems = [
  {
    title: "Dashboard",
    icon: Dashboard,
    path: "/",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "GRNs",
    icon: Receipt,
    color: "from-green-500 to-emerald-500",
    children: [
      { title: "View GRNs", path: "/grns", icon: ListIcon },
      { title: "Create GRN", path: "/grns/new", icon: Add },
    ],
  },
  {
    title: "Master Data",
    icon: Category,
    color: "from-purple-500 to-violet-500",
    children: [
      { title: "Asset Categories", path: "/asset-categories", icon: Category },
      { title: "Asset Subcategories", path: "/asset-subcategories", icon: AccountTree },
      { title: "Branches", path: "/branches", icon: Business },
      { title: "Vendors", path: "/vendors", icon: Store },
      { title: "Manufacturers", path: "/manufacturers", icon: Factory },
    ],
  },
  {
    title: "Reports",
    icon: Assessment,
    color: "from-orange-500 to-red-500",
    children: [
      { title: "GRN Register", path: "/reports/grn-register", icon: Receipt },
      { title: "Asset Summary", path: "/reports/asset-summary", icon: Assessment },
    ],
  },
]

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen, isMobile }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["GRNs"])
  const navigate = useNavigate()
  const location = useLocation()

  const handleExpand = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    if (isMobile) {
      setOpen(false)
    }
  }

  const isActive = (path: string) => location.pathname === path

  const sidebarContent = (
    <Box className="h-full bg-gradient-to-b from-white to-gray-50">
      <Box className="p-6 border-b border-gray-100">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Typography variant="h6" className="font-bold text-gray-800 mb-1">
            Asset Management
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            Luxury Edition
          </Typography>
        </motion.div>
      </Box>

      <List className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem disablePadding className="mb-2">
              <ListItemButton
                onClick={() => {
                  if (item.children) {
                    handleExpand(item.title)
                  } else {
                    handleNavigation(item.path!)
                  }
                }}
                className={`rounded-xl transition-all duration-300 hover:shadow-lg ${
                  isActive(item.path || "")
                    ? "bg-gradient-to-r " + item.color + " text-white shadow-lg"
                    : "hover:bg-gray-50"
                }`}
                sx={{ py: 1.5, px: 2 }}
              >
                <ListItemIcon>
                  <Box
                    className={`p-2 rounded-lg bg-gradient-to-r ${item.color} ${
                      isActive(item.path || "") ? "bg-white/20" : ""
                    }`}
                  >
                    <item.icon className={isActive(item.path || "") ? "text-white" : "text-white"} />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    className: `font-medium ${isActive(item.path || "") ? "text-white" : "text-gray-700"}`,
                  }}
                />
                {item.children &&
                  (expandedItems.includes(item.title) ? (
                    <ExpandLess className={isActive(item.path || "") ? "text-white" : "text-gray-400"} />
                  ) : (
                    <ExpandMore className={isActive(item.path || "") ? "text-white" : "text-gray-400"} />
                  ))}
              </ListItemButton>
            </ListItem>

            <AnimatePresence>
              {item.children && expandedItems.includes(item.title) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Collapse in={expandedItems.includes(item.title)}>
                    <List className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <motion.div
                          key={child.title}
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => handleNavigation(child.path)}
                              className={`rounded-lg transition-all duration-200 ${
                                isActive(child.path)
                                  ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                  : "hover:bg-gray-50 text-gray-600"
                              }`}
                              sx={{ py: 1, px: 2 }}
                            >
                              <ListItemIcon>
                                <child.icon
                                  className={`text-sm ${isActive(child.path) ? "text-indigo-600" : "text-gray-400"}`}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={child.title}
                                primaryTypographyProps={{
                                  className: `text-sm font-medium ${
                                    isActive(child.path) ? "text-indigo-600" : "text-gray-600"
                                  }`,
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        </motion.div>
                      ))}
                    </List>
                  </Collapse>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </List>
    </Box>
  )

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        className: "border-0 shadow-2xl",
        sx: {
          width: 320,
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {sidebarContent}
    </Drawer>
  )
}

export default Sidebar
