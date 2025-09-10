import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const [profileImage, setProfileImage] = useState(null); // file goes here
  const [uploading, setUploading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setProfileImage(event.target.files[0]); // store file in state
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!profileImage) return alert("Please select a profile image!");

    const formData = new FormData();
    formData.append("profileImage", profileImage); // 👈 must match multer field name
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);

    try {
      setUploading(true);
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        // withCredentials: true ,
      });
      if (data.user) {
        console.log({ "Signup successful": data });
        login(data.user)
        navigate("/chat");
      }
      alert("Signup successful!");
      if (data.user) {
        console.log('idhar navigation karna hai');
      }
    } catch (error) {
      console.error({ "Signup failed!": error.response?.data || error.message });
      alert(error.response?.data?.errors ? error.response.data.errors.join(', ') : error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div>            
          <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm rounded-lg focus:ring-2  border focus:ring-blue-500  focus:outline-none text-gray-600 
         file:mr-4 file:py-2 file:px-4 
         file:rounded-full file:border-0  
         file:text-sm file:font-semibold 
         file:bg-blue-50 file:text-blue-500 
         hover:file:bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John smith"
              name='username'
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              name='email'
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="********"
              name='password'
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {uploading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
