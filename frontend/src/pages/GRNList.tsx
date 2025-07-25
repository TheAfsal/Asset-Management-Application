import type React from "react";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Fab,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  GetApp,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGRN } from "../hooks/useGRN";
import type { GrnHeader } from "../types";

const GRNList: React.FC = () => {
  const { grns, fetchGrns } = useGRN();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGrns, setFilteredGrns] = useState<GrnHeader[]>([]);

  useEffect(() => {
    fetchGrns();
  }, []);

  useEffect(() => {
    const filtered = grns.filter(
      (grn) =>
        grn.grn_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grn.invoice_number.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGrns(filtered);
  }, [grns, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "success";
      case "draft":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Typography variant="h4" className="font-bold text-gray-800 mb-2">
            Goods Receipt Notes
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Manage and track all your GRN records
          </Typography>
        </motion.div>
      </Box>

      {/* Search and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="luxury-card border-0 mb-6">
          <CardContent className="p-6">
            <Box className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <TextField
                placeholder="Search GRNs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                className="flex-1 max-w-md"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <Box className="flex gap-2">
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  className="border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
                >
                  Filter
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GetApp />}
                  className="border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
                >
                  Export
                </Button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate("/grns/new")}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    Create GRN
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* GRN Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="luxury-card border-0">
          <TableContainer component={Paper} className="border-0">
            <Table>
              <TableHead>
                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <TableCell className="font-semibold text-gray-700">
                    GRN Number
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Date
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Invoice Number
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Vendor
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Branch
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Status
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <AnimatePresence>
                  {filteredGrns.map((grn, index) => (
                    <motion.tr
                      key={grn.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      component={TableRow}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium text-indigo-600">
                        {grn.grn_number}
                      </TableCell>
                      <TableCell>
                        {new Date(grn.grn_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{grn.invoice_number}</TableCell>
                      <TableCell>{grn.vendor_id}</TableCell>
                      <TableCell>{grn.branch_id}</TableCell>
                      <TableCell>
                        <Chip
                          label={grn.status}
                          color={getStatusColor(grn.status) as any}
                          size="small"
                          className="capitalize"
                        />
                      </TableCell>
                      <TableCell>
                        <Box className="flex gap-1">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <IconButton
                              size="small"
                              className="text-blue-600 hover:bg-blue-50"
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <IconButton
                              size="small"
                              className="text-green-600 hover:bg-green-50"
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <IconButton
                              size="small"
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </motion.div>
                        </Box>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </motion.div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6"
      >
        <Fab
          color="primary"
          onClick={() => navigate("/grns/new")}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-2xl"
        >
          <Add />
        </Fab>
      </motion.div>
    </motion.div>
  );
};

export default GRNList;
