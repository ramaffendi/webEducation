import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
const IconsPlay = "/icons8-play-100.png";

function Cards({ item }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [authUser] = useAuth(); // Ambil status login dari AuthProvider

  const handleCardClick = () => {
    if (!authUser) {
      // Jika belum login, tampilkan toast error
      toast.error("Anda harus login terlebih dahulu untuk melihat course!", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    // Jika sudah login, navigasikan ke halaman detail course
    if (item && item._id) {
      navigate(`/course/${item._id}`);
    } else {
      console.error("Item ID tidak ditemukan!");
    }
  };

  return (
    <div className="mt-4 my-3 p-3" onClick={handleCardClick}>
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure className="relative">
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80 dark:bg-gray-800/80">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-pink-500 font-medium">Loading video...</p>
              </div>
            </div>
          )}

          <img
            src={IconsPlay} // Pastikan gambar berada di folder public
            alt={item.name}
            className="w-32 h-32 object-cover rounded-lg shadow-md"
            onLoad={() => setIsLoading(false)}
            loading="lazy"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between">
            <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
              Play
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
