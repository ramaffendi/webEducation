import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Pastikan menggunakan _id, bukan id
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

          <iframe
            src={item.videoUrl}
            title={item.name}
            className="w-full h-56"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
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
            <div className="badge badge-outline">${item.price}</div>
            <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
