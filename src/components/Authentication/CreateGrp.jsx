import { useState } from "react";
import axios from "axios";

function CreateGrp() {
    const [form, setForm] = useState({ name: '', users: '' });

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
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/chat/group`,
                form,
                {
                    headers: { "Content-Type": "application/json"}
                }
            );
            if (data) {
                console.log({ "Created successfully": data });
            }
        } catch (error) {
            console.error({ "Error during creating group": error.response?.data || error.message });
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
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="whats'app"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            name='name' value={form.name} onChange={handleChange}
                        />
                    </div>

                    <div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Users</label>
                            <input
                                type="text"
                                placeholder="user id's"
                                name='users'
                                value={form.users}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateGrp;
