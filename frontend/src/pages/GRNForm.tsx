import type React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Save, Send, Cancel } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGRN } from "../hooks/useGRN";
import HeaderForm from "../components/grn/HeaderForm";
import LineItemTable from "../components/grn/LineItemTable";
import TotalsPanel from "../components/grn/TotalsPanel";
import type { GrnFormData } from "../types";

const schema = yup.object({
  header: yup.object({
    grn_number: yup.string().required("GRN Number is required"),
    grn_date: yup.string().required("GRN Date is required"),
    invoice_number: yup.string().max(30).required("Invoice Number is required"),
    vendor_id: yup.number().required("Vendor is required"),
    branch_id: yup.number().required("Branch is required"),
    status: yup.string().oneOf(["draft", "submitted"]).required(),
    description: yup.string().optional(),
  }),
  lineItems: yup
    .array()
    .of(
      yup.object({
        subcategory_id: yup.number().required("Subcategory is required"),
        item_description: yup
          .string()
          .max(100)
          .required("Description is required"),
        quantity: yup.number().min(1).required("Quantity is required"),
        unit_price: yup.number().min(0).required("Unit Price is required"),
        tax_percent: yup.number().min(0).max(100).required("Tax % is required"),
        taxable_value: yup.number().optional(),
        total_amount: yup.number().optional(),
      })
    )
    .min(1, "At least one line item is required"),
});

const steps = ["Header Information", "Line Items", "Review & Submit"];

const GRNForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const { vendors, branches, subcategories, submitGrn, updateGrn, getGrnById, loading } = useGRN();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<GrnFormData>({
    //@ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      header: {
        grn_number: "",
        grn_date: new Date().toISOString().split('T')[0],
        invoice_number: "",
        vendor_id: undefined,
        branch_id: undefined,
        status: "draft",
        //@ts-ignore
        description: "",
      },
      lineItems: [],
    },
  });

  useEffect(() => {
    if (isEditing) {
      const fetchGrn = async () => {
        try {
          const grnData = await getGrnById(parseInt(id!));
          methods.reset(grnData);
        } catch {
          setError("Failed to load GRN data");
        }
      };
      fetchGrn();
    }
  }, [id, isEditing, getGrnById, methods]);

  const onSubmit = async (data: GrnFormData) => {
    try {
      if (isEditing) {
        await updateGrn(parseInt(id!), data);
      } else {
        await submitGrn(data);
      }
      methods.reset();
      setIsDirty(false);
      navigate("/grns");
    } catch {
      setError(isEditing ? "Failed to update GRN" : "Failed to create GRN");
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to cancel?"
        )
      ) {
        navigate("/grns");
      }
    } else {
      navigate("/grns");
    }
  };

  const handleSaveDraft = () => {
    methods.setValue("header.status", "draft");
    //@ts-ignore
    methods.handleSubmit(onSubmit)();
  };

  const handleSubmitFinal = () => {
    methods.setValue("header.status", "submitted");
    //@ts-ignore
    methods.handleSubmit(onSubmit)();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <HeaderForm vendors={vendors} branches={branches} />;
      case 1:
        return <LineItemTable subcategories={subcategories} />;
      case 2:
        return (
          <Box>
            <HeaderForm vendors={vendors} branches={branches} />
            <Box className="mt-6">
              <LineItemTable subcategories={subcategories} />
            </Box>
            <TotalsPanel />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FormProvider {...methods}>
        <Box className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Typography variant="h4" className="font-bold text-gray-800 mb-2">
              {isEditing ? "Edit GRN" : "Create New GRN"}
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              {isEditing
                ? "Update an existing Goods Receipt Note"
                : "Add a new Goods Receipt Note to your system"}
            </Typography>
          </motion.div>
        </Box>

        {error && (
          <Box className="mb-4">
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        {loading && (
          <Box className="mb-4 flex justify-center">
            <CircularProgress />
          </Box>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="luxury-card border-0 mb-6">
            <CardContent className="p-6">
              <Stepper activeStep={activeStep} className="mb-6">
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="luxury-card border-0 mb-6">
            <CardContent className="p-6">
              <form
              //@ts-ignore
                onSubmit={methods.handleSubmit(onSubmit)}
                onChange={() => setIsDirty(true)}
              >
                {renderStepContent(activeStep)}
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Paper className="p-4 flex justify-between items-center luxury-card border-0">
            <Box>
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  className="mr-2 text-gray-600 hover:text-gray-800"
                >
                  Back
                </Button>
              )}
            </Box>

            <Box className="flex gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  startIcon={<Cancel />}
                  className="border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600"
                >
                  Cancel
                </Button>
              </motion.div>

              {activeStep < steps.length - 1 ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    Next
                  </Button>
                </motion.div>
              ) : (
                <Box className="flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleSaveDraft}
                      startIcon={<Save />}
                      className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                    >
                      Save Draft
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleSubmitFinal}
                      startIcon={<Send />}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      {isEditing ? "Update" : "Submit"}
                    </Button>
                  </motion.div>
                </Box>
              )}
            </Box>
          </Paper>
        </motion.div>
      </FormProvider>
    </motion.div>
  );
};

export default GRNForm;