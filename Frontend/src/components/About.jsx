import Navbar from "./Navbar";
import Footer from "./Footer";
import Education from "../../public/b725599ba3b23dad832920296eb9062e.png";

function About() {
  return (
    <>
      {/* Navbar dengan background yang sesuai */}
      <div className="bg-gray-900">
        <Navbar />
      </div>

      {/* Konten Halaman About */}
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6 py-12">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Bagian Kiri - Deskripsi dengan Animasi */}
          <div className="space-y-4 animate-fadeInLeft transition-opacity duration-700 ease-in-out">
            <h2 className="text-4xl font-bold text-blue-400">About Us</h2>
            <p className="text-gray-300 leading-relaxed">
              We are a company committed to providing the best services for our
              customers. With years of experience, we strive to deliver
              high-quality products and exceptional customer satisfaction.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our team consists of talented professionals who are passionate
              about innovation and excellence. We believe in continuous
              improvement and always aim to exceed expectations.
            </p>
          </div>

          {/* Bagian Kanan - Gambar dengan Animasi */}
          <div className="flex justify-center">
            <img
              src={Education}
              alt="About Us"
              className="rounded-lg shadow-lg border-gray-700 w-full max-w-xs md:max-w-sm 
              animate-fadeInRight transition-transform duration-700 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default About;
