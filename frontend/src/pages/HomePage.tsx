import type React from "react";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Inventory,
  ArrowForward,
  Receipt,
  Category,
  Business,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Assets",
      value: "2,847",
      change: "+12%",
      color: "from-blue-500 to-cyan-500",
      icon: Inventory,
    },
    {
      title: "Active GRNs",
      value: "156",
      change: "+8%",
      color: "from-green-500 to-emerald-500",
      icon: Receipt,
    },
    {
      title: "Categories",
      value: "24",
      change: "+3%",
      color: "from-purple-500 to-violet-500",
      icon: Category,
    },
    {
      title: "Branches",
      value: "12",
      change: "+2%",
      color: "from-orange-500 to-red-500",
      icon: Business,
    },
  ];

  const quickActions = [
    {
      title: "Create New GRN",
      description: "Add new goods receipt note",
      path: "/grns/new",
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "View Reports",
      description: "Access detailed analytics",
      path: "/reports/grn-register",
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "Manage Assets",
      description: "Organize asset categories",
      path: "/asset-categories",
      color: "from-green-500 to-teal-600",
    },
    {
      title: "Vendor Management",
      description: "Handle vendor information",
      path: "/vendors",
      color: "from-yellow-500 to-orange-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <Container maxWidth="xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Box className="text-center mb-12 flex flex-col items-center justify-center">
            <Typography
              variant="h2"
              className="font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Welcome to AssetFlow
            </Typography>
            <Typography
              variant="h6"
              className="text-gray-600 max-w-2xl text-center"
            >
              Your luxury asset management solution. Streamline operations,
              track assets, and generate insights with elegance.
            </Typography>
          </Box>
        </motion.div>

        {/* Stats Cards */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          className="mb-8 text-center"
        >
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={stat.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="luxury-card h-full border-0 overflow-hidden relative">
                  <Box
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}
                  />
                  <CardContent className="p-6">
                    <Box className="flex items-center justify-between mb-4">
                      <Avatar
                        className={`bg-gradient-to-r ${stat.color} w-12 h-12`}
                      >
                        <stat.icon />
                      </Avatar>
                      <Chip
                        label={stat.change}
                        size="small"
                        className="bg-green-100 text-green-800 font-medium"
                      />
                    </Box>
                    <Typography
                      variant="h4"
                      className="font-bold text-gray-800 mb-1"
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Typography
            variant="h4"
            className="font-bold text-gray-800 mb-6 text-center"
          >
            Quick Actions
          </Typography>
          <Grid container spacing={3} justifyContent="center" marginTop={3}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} lg={3} key={action.title}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className="luxury-card h-full cursor-pointer border-0 overflow-hidden relative group"
                    onClick={() => navigate(action.path)}
                  >
                    <Box
                      className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    <CardContent className="p-6 text-center">
                      <Box
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}
                      >
                        <ArrowForward className="text-white" />
                      </Box>
                      <Typography
                        variant="h6"
                        className="font-semibold text-gray-800 mb-2"
                      >
                        {action.title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 p-2">
                        {action.description}
                      </Typography>
                      <Button
                        variant="outlined"
                        className="border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
                        endIcon={<ArrowForward />}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Card className="luxury-card border-0">
            <CardContent className="p-6">
              <Typography variant="h5" className="font-bold text-gray-800 mb-6">
                Recent Activity
              </Typography>
              <Box className="space-y-4">
                {[
                  {
                    action: "New GRN created",
                    time: "2 hours ago",
                    type: "success",
                  },
                  {
                    action: "Asset category updated",
                    time: "4 hours ago",
                    type: "info",
                  },
                  {
                    action: "Vendor information modified",
                    time: "1 day ago",
                    type: "warning",
                  },
                  {
                    action: "Report generated",
                    time: "2 days ago",
                    type: "success",
                  },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <Box className="flex items-center space-x-3">
                      <Box
                        className={`w-3 h-3 rounded-full ${
                          activity.type === "success"
                            ? "bg-green-500"
                            : activity.type === "info"
                            ? "bg-blue-500"
                            : activity.type === "warning"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                      />
                      <Typography variant="body1" className="text-gray-800">
                        {activity.action}
                      </Typography>
                    </Box>
                    <Typography variant="body2" className="text-gray-500">
                      {activity.time}
                    </Typography>
                  </motion.div>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default HomePage;
