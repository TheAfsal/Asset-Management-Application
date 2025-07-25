import { useFormContext } from "react-hook-form"
import { Grid, TextField, Box, Typography } from "@mui/material"
import { motion } from "framer-motion"
import React from "react"
import AutoCompleteSelect from "../common/AutoCompleteSelect"
import type { Vendor, Branch } from "../../types"

interface HeaderFormProps {
  vendors: Vendor[]
  branches: Branch[]
}

const HeaderForm: React.FC<HeaderFormProps> = ({ vendors, branches }) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext()

  React.useEffect(() => {
    setValue(
      "header.grn_number",
      `GRN-${new Date().toISOString().slice(0, 7).replace("-", "")}-${Math.floor(100 + Math.random() * 900)}`,
    )
    setValue("header.grn_date", new Date().toISOString().slice(0, 10))
  }, [setValue])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Box className="mb-6">
        <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
          Header Information
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <TextField
              {...register("header.grn_number")}
              label="GRN Number"
              fullWidth
              InputProps={{ readOnly: true }}
              className="bg-gray-50"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
              error={!!errors.header?.grn_number}
              helperText={errors.header?.grn_number?.message}
            />
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <TextField
              {...register("header.grn_date")}
              label="GRN Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
              error={!!errors.header?.grn_date}
              helperText={errors.header?.grn_date?.message}
            />
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <TextField
              {...register("header.invoice_number")}
              label="Invoice Number"
              fullWidth
              inputProps={{ maxLength: 30 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
              error={!!errors.header?.invoice_number}
              helperText={errors.header?.invoice_number?.message}
            />
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <AutoCompleteSelect
              name="header.vendor_id"
              label="Vendor"
              options={vendors.map((v) => ({ value: v.id, label: v.name }))}
              error={!!errors.header?.vendor_id}
              helperText={errors.header?.vendor_id?.message}
            />
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <AutoCompleteSelect
              name="header.branch_id"
              label="Branch"
              options={branches.map((b) => ({ value: b.id, label: b.name }))}
              error={!!errors.header?.branch_id}
              helperText={errors.header?.branch_id?.message}
            />
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export default HeaderForm
