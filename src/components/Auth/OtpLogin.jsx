import { useState, useContext } from "react";
import { Phone, Lock, LogIn } from "lucide-react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { generateOTP, validateOTP } from "../../api/documentManagement";

const OtpLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("request");
  const [message, setMessage] = useState("");

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    if (mobile.length === 10) {
      try {
        const data = await generateOTP(mobile);
        if (data.ok) {
          setStep("validate");
          setMessage("OTP sent to your mobile number.");
        } else {
          setMessage(data.message || "Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error requesting OTP:", error);
        setMessage("Network error. Please try again later.");
      }
    } else {
      setMessage("Please enter a valid 10-digit mobile number.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const responseData = await validateOTP(mobile, otp);
      if (
        responseData.ok &&
        responseData.data &&
        responseData.data.status &&
        responseData.data.data &&
        responseData.data.data.token &&
        responseData.data.data.user_id
      ) {
        login(responseData.data.data.token, responseData.data.data.user_id);
        navigate("/dashboard");
      } else {
        setMessage(responseData.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Login with OTP
      </h2>
      <form
        onSubmit={step === "request" ? handleRequestOtp : handleLogin}
        className="space-y-4"
      >
        {message && (
          <p
            className={`text-sm text-center ${
              message.includes("sent") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="relative">
          <Phone className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled={step === "validate"}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            required
          />
        </div>

        {step === "validate" && (
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter OTP (e.g., 123456)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <LogIn className="w-5 h-5 mr-2" />
          {step === "request" ? "Send OTP" : "Validate & Login"}
        </button>
      </form>
    </div>
  );
};

export default OtpLogin;
