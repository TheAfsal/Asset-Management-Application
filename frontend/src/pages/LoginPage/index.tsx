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
} from "@mui/material"
import { Visibility, VisibilityOff, Google, Facebook } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface LoginPageProps {
  setIsAuthenticated: (auth: boolean) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication
    setIsAuthenticated(true)
    navigate("/")
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
                Welcome Back
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Sign in to your AssetFlow account
              </Typography>
            </motion.div>

            {/* Social Login */}
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
                Continue with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                className="border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 py-3"
              >
                Continue with Facebook
              </Button>
            </motion.div>

            <Divider className="mb-6">
              <Typography variant="body2" className="text-gray-500 px-4">
                or continue with email
              </Typography>
            </Divider>

            {/* Login Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

              <Box className="flex justify-between items-center mb-6">
                <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                  Forgot password?
                </Link>
              </Box>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 py-3 rounded-xl shadow-lg"
                >
                  Sign In
                </Button>
              </motion.div>
            </motion.form>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-6"
            >
              <Typography variant="body2" className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Sign up
                </Link>
              </Typography>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

export default LoginPage
