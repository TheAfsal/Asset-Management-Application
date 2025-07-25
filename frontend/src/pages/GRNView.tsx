// import type React from "react";
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Box, Typography, Button, Card, CardContent } from "@mui/material";
// import { motion } from "framer-motion";
// import { useGRN } from "../hooks/useGRN";
// import type { GrnFormData } from "../types";

// const GRNView: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { getGrnById } = useGRN();
//   const navigate = useNavigate();
//   const [grn, setGrn] = useState<GrnFormData | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchGrn = async () => {
//       try {
//         const grnData = await getGrnById(parseInt(id!));
//         setGrn(grnData);
//       } catch {
//         setError("Failed to load GRN data");
//       }
//     };
//     fetchGrn();
//   }, [id, getGrnById]);

//   if (error) {
//     return (
//       <Box className="p-4">
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   if (!grn) {
//     return <Box className="p-4"><Typography>Loading...</Typography></Box>;
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <Box className="mb-6">
//         <Typography variant="h4" className="font-bold text-gray-800 mb-2">
//           GRN Details
//         </Typography>
//         <Typography variant="body1" className="text-gray-600">
//           Viewing GRN {grn.header.grn_number}
//         </Typography>
//       </Box>
//       <Card className="luxury-card border-0">
//         <CardContent className="p-6">
//           <Typography><strong>GRN Number:</strong> {grn.header.grn_number}</Typography>
//           <Typography><strong>Date:</strong> {grn.header.grn_date}</Typography>
//           <Typography><strong>Invoice Number:</strong> {grn.header.invoice_number}</Typography>
//           <Typography><strong>Vendor ID:</strong> {grn.header.vendor_id}</Typography>
//           <Typography><strong>Branch ID:</strong> {grn.header.branch_id}</Typography>
//           <Typography><strong>Status:</strong> {grn.header.status}</Typography>
//           <Typography className="mt-4"><strong>Line Items:</strong></Typography>
//           {grn.lineItems.map((item, index) => (
//             <Box key={index} className="mt-2">
//               <Typography><strong>Item {index + 1}:</strong></Typography>
//               <Typography>Subcategory ID: {item.subcategory_id}</Typography>
//               <Typography>Description: {item.item_description}</Typography>
//               <Typography>Quantity: {item.quantity}</Typography>
//               <Typography>Unit Price: {item.unit_price}</Typography>
//               <Typography>Tax %: {item.tax_percent}</Typography>
//             </Box>
//           ))}
//           <Button
//             variant="contained"
//             onClick={() => navigate("/grns")}
//             className="mt-4"
//           >
//             Back to GRN List
//           </Button>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// export default GRNView;