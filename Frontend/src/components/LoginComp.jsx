import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider"; // Context Auth
import axios from "axios";
import toast from "react-hot-toast";

function LoginComp() {
  const navigate = useNavigate();
  const [, setAuthUser] = useAuth(); // Perbaikan destructuring

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_API}/user/login`,
        userInfo
      );

      if (res.data.user) {
        toast.success("Login successful");

        // Simpan user ke localStorage
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        // Set state auth global
        setAuthUser({
          user: res.data.user, // Simpan user tanpa token
        });

        // Redirect ke home tanpa reload
        navigate("/");
      } else {
        toast.error("Invalid login credentials");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Try again!"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-bold mb-4 text-center">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Button */}
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Login
          </button>

          <p className="text-center mt-4">
            Not registered?{" "}
            <Link to="/signup" className="text-blue-400 underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginComp;
