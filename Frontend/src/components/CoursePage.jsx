import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CoursePage() {
  const { id } = useParams(); // Mengambil id dari URL
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mengambil data buku berdasarkan id
    axios
      .get(`http://localhost:4001/book/${id}`)
      .then((response) => {
        setCourseData(response.data);
        setIsLoading(false); // Data sudah diterima
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, [id]); // Mengambil data setiap kali id berubah

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{courseData.name}</h1>
      <p>{courseData.title}</p>
      <iframe
        src={courseData.videoUrl} // Menggunakan videoUrl dari data buku
        title={courseData.name}
        className="w-full h-56"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default CoursePage;
