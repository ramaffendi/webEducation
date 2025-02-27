import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Bagian Kiri - Informasi */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-300 mb-4">
              Have questions? We’d love to hear from you. Fill out the form and
              our team will get back to you as soon as possible.
            </p>
            <p className="text-gray-400">
              📍 Address: 123 Example St, Tambun, Jakarta <br />
              📞 Phone: +123 456 7890 <br />
              ✉️ Email: ramadhaneffendi98@gmail.com
            </p>
          </div>

          {/* Bagian Kanan - Form */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-md text-white focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-md text-white focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-md text-white focus:ring focus:ring-blue-500"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
