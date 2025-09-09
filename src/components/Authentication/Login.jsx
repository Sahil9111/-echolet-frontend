import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


//context
import { useContext } from "react";
import { UserContext } from "../../context/user/UserContex.jsx";




function Login() {
  const { login } = useContext(UserContext)
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/login",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );


      if (data.user) {
        console.log({ "Login successful": data });
        login(data.user)
        navigate("/chat");
      }
    } catch (error) {
      console.error({ "Error during login": error.response?.data || error.message });
      alert(error.response?.data?.errors ? error.response.data.errors.join(', ') : error.message);
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name='email' value={form.email} onChange={handleChange}
            />
          </div>

          <div>
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
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
