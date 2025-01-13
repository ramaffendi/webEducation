import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
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
        "http://localhost:4001/user/signup",
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
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[600px]">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Signup</h3>
            {/* Fullname */}
            <div className="mt-4 space-y-2">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your fullname"
                className="input input-bordered w-80"
                {...register("fullname", { required: "Name is required" })}
              />
              {errors.fullname && (
                <span className="text-sm text-red-500">
                  {errors.fullname.message}
                </span>
              )}
            </div>
            {/* Email */}
            <div className="mt-4 space-y-2">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-80"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            {/* Password */}
            <div className="mt-4 space-y-2">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-80"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
            {/* Button */}
            <div className="flex justify-around mt-4">
              <button className="btn btn-primary">Signup</button>
              <p className="text-xl">
                Have account?{" "}
                <button
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </button>
              </p>
              <Login />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
