import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CoursePage() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_REACT_API}/book/${id}`)
      .then((response) => {
        setCourseData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
        setError("Gagal memuat data kursus. Silakan coba lagi.");
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400 font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-gray-400 text-center mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-300 mb-4">
            Error
          </h2>
          <p className="text-gray-400 text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen pb-12 text-gray-300">
      {/* Header dengan background gradient */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 pt-8 pb-16 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-200">
            {courseData.name}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">{courseData.title}</p>
        </div>
      </div>

      {/* Content yang overlap dengan header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Video Section */}
          <div className="aspect-w-16 aspect-h-9 w-full">
            <iframe
              src={courseData.videoUrl}
              title={courseData.name}
              className="w-full h-96"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Course Details */}
          <div className="p-6">
            {courseData.description && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">
                  Deskripsi
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {courseData.description}
                </p>
              </div>
            )}

            {courseData.author && (
              <div className="flex items-center mb-6">
                <div className="bg-gray-700 rounded-full p-3 mr-4">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 font-medium">
                    Instruktur
                  </h3>
                  <p className="text-lg font-medium text-gray-300">
                    {courseData.author}
                  </p>
                </div>
              </div>
            )}

            {/* Additional course metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-700 pt-6">
              {courseData.duration && (
                <div className="flex items-center">
                  <div className="bg-gray-700 rounded-full p-2 mr-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Durasi</h3>
                    <p className="text-gray-300 font-medium">
                      {courseData.duration}
                    </p>
                  </div>
                </div>
              )}

              {courseData.level && (
                <div className="flex items-center">
                  <div className="bg-gray-700 rounded-full p-2 mr-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Level</h3>
                    <p className="text-gray-300 font-medium">
                      {courseData.level}
                    </p>
                  </div>
                </div>
              )}

              {courseData.rating && (
                <div className="flex items-center">
                  <div className="bg-gray-700 rounded-full p-2 mr-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Rating</h3>
                    <p className="text-gray-300 font-medium">
                      {courseData.rating}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
