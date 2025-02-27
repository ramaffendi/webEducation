import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate(); // Gunakan useNavigate untuk redirect

  const handleLogout = () => {
    try {
      // Hapus token dari localStorage
      localStorage.removeItem("Users");
      localStorage.removeItem("token"); // Jika token disimpan dengan key 'token'

      // Reset state user
      setAuthUser({
        ...authUser,
        user: null,
      });

      toast.success("Logout successfully");

      // Redirect ke halaman login atau home tanpa reload
      setTimeout(() => {
        navigate("/login"); // Bisa diganti ke "/"
      }, 1000);
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
