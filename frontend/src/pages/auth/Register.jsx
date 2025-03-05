import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  // credentials
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
// credentials end
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate password strength
  const validatePassword = (password) => {
    return password.length >= 8; // Minimum 8 characters
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await register(username,email, password);
    if (success) {
      navigate("/login");
    } else {
      setMessage("Sign up error");
    }
    setErrors({}); // Clear previous errors

    // Validate inputs
    const newErrors = {};
    if (!username) {
      newErrors.username = "username is required.";
    } 

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call for registration
  //   try {
  //     // Replace with your actual API call
  //     const response = await fetch("http://localhost:3000/api/auth/register", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     const data = await response.json();

  //     if (response.ok) {
  //       setMessage("Registration successful! Redirecting...");
  //       // Redirect to login page after a delay
  //       setTimeout(() => {
  //         window.location.href = "/login";
  //       }, 2000);
  //     } else {
  //       setMessage(data.message || "Registration failed. Please try again.");
  //     }
  //   } catch (error) {
  //     setMessage("An error occurred. Please try again.");
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex-col mb-8">
          <h1 className="font-bold text-3xl text-center text-blue-600 opacity-80">
            Register to Ostrich
          </h1>
          <p className="text-center m-2 text-gray-500">Simplified Auctioning</p>
        </div>

        {/* Inputs container */}
        <div className="shadow p-6 rounded-xl bg-white">
          <CustomInput
            label={"Username"}
            value={username}
            placeholder={"E.g. John"}
            type={"text"}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />
          <CustomInput
            label={"Email"}
            value={email}
            placeholder={"E.g. foo@email.com"}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <CustomInput
            label={"Password"}
            value={password}
            placeholder={"Enter your password"}
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
            error={errors.password}
          />

          <CustomInput
            label={"Confirm password"}
            value={confirmPassword}
            placeholder={"Re-enter your password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={"password"}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="p-2 bg-blue-600 text-white font-extrabold mt-4 w-full rounded hover:bg-blue-700 transition duration-300"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already signed up?{" "}
              <Link to="/login" className="text-blue-600 font-bold">
                Sign in
              </Link>
            </p>
            <Link to="/forgot-password" className="text-gray-500 text-sm mt-2 block">
              Forgot your password?
            </Link>
          </div>

          {message && (
            <p className="text-center mt-4 text-blue-500 font-bold">{message}</p>
          )}
        </div>
      </form>
    </div>
  );
}