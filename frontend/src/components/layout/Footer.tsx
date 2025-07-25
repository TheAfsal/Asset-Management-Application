import type React from "react"

import { Box, Typography, Container, Grid, Link, IconButton } from "@mui/material"
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material"
import { motion } from "framer-motion"

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-auto"
      sx={{ py: 6 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Typography
                variant="h5"
                className="font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
              >
                AssetFlow
              </Typography>
              <Typography variant="body2" className="text-gray-300 mb-4">
                Luxury Asset Management System designed for modern businesses. Streamline your operations with elegance
                and efficiency.
              </Typography>
              <Box className="flex space-x-2">
                {[Facebook, Twitter, LinkedIn, Instagram].map((Icon, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <IconButton className="text-gray-400 hover:text-indigo-400 transition-colors" size="small">
                      <Icon />
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={2}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Typography variant="h6" className="font-semibold mb-4 text-indigo-400">
                Features
              </Typography>
              <Box className="space-y-2">
                {["Asset Tracking", "GRN Management", "Reports", "Analytics"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block text-gray-300 hover:text-white transition-colors text-sm"
                    underline="none"
                  >
                    {item}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={3}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Typography variant="h6" className="font-semibold mb-4 text-indigo-400">
                Support
              </Typography>
              <Box className="space-y-2">
                {["Documentation", "Help Center", "Contact Us", "API Reference"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block text-gray-300 hover:text-white transition-colors text-sm"
                    underline="none"
                  >
                    {item}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={3}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Typography variant="h6" className="font-semibold mb-4 text-indigo-400">
                Company
              </Typography>
              <Box className="space-y-2">
                {["About Us", "Careers", "Privacy Policy", "Terms of Service"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block text-gray-300 hover:text-white transition-colors text-sm"
                    underline="none"
                  >
                    {item}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Box className="border-t border-gray-700 mt-8 pt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <Typography variant="body2" className="text-gray-400">
              © 2024 AssetFlow. All rights reserved.
            </Typography>
            <Typography variant="body2" className="text-gray-400 mt-2 md:mt-0">
              Made with ❤️ for modern businesses
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
