"use client"

import type React from "react"

import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import { Visibility, VisibilityOff, Google, Facebook } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const navigate = useNavigate()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock signup process
    navigate("/login")
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }))
  }

  return (
    <Box className="min-h-screen animated-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="luxury-card border-0 overflow-hidden">
          <CardContent className="p-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <Box className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <Typography variant="h4" className="text-white font-bold">
                  A
                </Typography>
              </Box>
              <Typography
                variant="h4"
                className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2"
              >
                Create Account
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Join AssetFlow and start managing your assets
              </Typography>
            </motion.div>

            {/* Social Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 mb-6"
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                className="border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 py-3"
              >
                Sign up with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                className="border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 py-3"
              >
                Sign up with Facebook
              </Button>
            </motion.div>

            <Divider className="mb-6">
              <Typography variant="body2" className="text-gray-500 px-4">
                or sign up with email
              </Typography>
            </Divider>

            {/* Signup Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSignup}
              className="space-y-4"
            >
              <Box className="grid grid-cols-2 gap-4">
                <TextField
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
                <TextField
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange("lastName")}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </Box>

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange("agreeToTerms")}
                    className="text-indigo-600"
                  />
                }
                label={
                  <Typography variant="body2" className="text-gray-600">
                    I agree to the{" "}
                    <Link href="#" className="text-indigo-600 hover:text-indigo-800">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-indigo-600 hover:text-indigo-800">
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 py-3 rounded-xl shadow-lg"
                  disabled={!formData.agreeToTerms}
                >
                  Create Account
                </Button>
              </motion.div>
            </motion.form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-6"
            >
              <Typography variant="body2" className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Sign in
                </Link>
              </Typography>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

export default SignupPage
