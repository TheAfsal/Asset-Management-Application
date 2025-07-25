import type React from "react"

import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Badge, Tooltip } from "@mui/material"
import { Menu as MenuIcon, Notifications, Settings, AccountCircle, Logout } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useState } from "react"

interface NavbarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  isMobile: boolean
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="fixed"
      className="glass-effect border-0"
      sx={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        zIndex: 1300,
      }}
    >
      <Toolbar className="h-20">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <IconButton
            edge="start"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 text-gray-700 hover:bg-indigo-50"
          >
            <MenuIcon />
          </IconButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <Box className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <Typography variant="h6" className="text-white font-bold">
              A
            </Typography>
          </Box>
          <Typography
            variant="h5"
            className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            AssetFlow
          </Typography>
        </motion.div>

        <Box className="flex-1" />

        <Box className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Tooltip title="Notifications">
              <IconButton className="text-gray-700 hover:bg-indigo-50">
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Tooltip title="Settings">
              <IconButton className="text-gray-700 hover:bg-indigo-50">
                <Settings />
              </IconButton>
            </Tooltip>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <IconButton onClick={handleMenu} className="ml-2">
              <Avatar
                className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500"
                src="/placeholder.svg?height=40&width=40"
              >
                <AccountCircle />
              </Avatar>
            </IconButton>
          </motion.div>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="mt-2"
            PaperProps={{
              className: "luxury-card border-0 min-w-48",
            }}
          >
            <MenuItem onClick={handleClose} className="hover:bg-indigo-50">
              <AccountCircle className="mr-3 text-gray-600" />
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} className="hover:bg-indigo-50">
              <Settings className="mr-3 text-gray-600" />
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose} className="hover:bg-red-50 text-red-600">
              <Logout className="mr-3" />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
