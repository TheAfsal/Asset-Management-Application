import type React from "react"

import { useWatch } from "react-hook-form"
import { Box, Typography, Card, CardContent, Divider } from "@mui/material"
import { motion } from "framer-motion"

const TotalsPanel: React.FC = () => {
  const lineItems = useWatch({ name: "lineItems" }) || []

  const subtotal = lineItems.reduce((sum: number, item: any) => sum + Number.parseFloat(item?.taxable_value || 0), 0)

  const totalTax = lineItems.reduce((sum: number, item: any) => {
    const taxPercent = Number.parseFloat(item?.tax_percent || 0)
    const taxableValue = Number.parseFloat(item?.taxable_value || 0)
    const taxAmount = taxableValue * (taxPercent / 100)
    return sum + taxAmount
  }, 0)

  const grandTotal = subtotal + totalTax

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
      <Box className="flex justify-end">
        <Card className="luxury-card border-0 w-full max-w-md">
          <CardContent className="p-6">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
              Order Summary
            </Typography>

            <Box className="space-y-3">
              <Box className="flex justify-between items-center">
                <Typography variant="body1" className="text-gray-600">
                  Subtotal:
                </Typography>
                <Typography variant="body1" className="font-medium">
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>

              <Box className="flex justify-between items-center">
                <Typography variant="body1" className="text-gray-600">
                  Total Tax:
                </Typography>
                <Typography variant="body1" className="font-medium">
                  ${totalTax.toFixed(2)}
                </Typography>
              </Box>

              <Divider />

              <Box className="flex justify-between items-center">
                <Typography variant="h6" className="font-bold text-gray-800">
                  Grand Total:
                </Typography>
                <Typography variant="h6" className="font-bold text-indigo-600">
                  ${grandTotal.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </motion.div>
  )
}

export default TotalsPanel
