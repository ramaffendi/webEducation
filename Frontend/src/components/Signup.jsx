import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_API}/user/signup`,
        userInfo
      );
      toast.success("Signup Successfully");
      navigate(from, { replace: true });
      localStorage.setItem(
        "Users",
        JSON.stringify({
          fullname: res.data.user.fullname,
          email: res.data.user.email,
        })
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Close Button */}
          <div className="flex justify-end">
            <Link to="/" className="text-gray-400 hover:text-red-500 text-xl">
              ✕
            </Link>
          </div>

          <h3 className="text-2xl font-bold text-center">Signup</h3>

          {/* Fullname */}
          <div>
            <label className="block text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="Enter your fullname"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("fullname", { required: "Name is required" })}
            />
            {errors.fullname && (
              <p className="text-red-400 text-sm mt-1">
                {errors.fullname.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Signup Button */}
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Signup
          </button>

          {/* Login Redirect */}
          <p className="text-center text-gray-400 mt-2">
            Already have an account?{" "}
            <button
              className="text-blue-400 hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
