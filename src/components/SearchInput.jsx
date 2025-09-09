import { memo } from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import axios from "axios";

//context
import { useContext } from 'react';
import { UserContext } from '../context/user/UserContex.jsx';

function SearchInput() {
    const { setSearchResult, user } = useContext(UserContext)
    const [query, setQuery] = useState("");
    const handleSearch = async (e) => {
        e.preventDefault();

        if (query !== "") {
            try {
                const { data } = await axios.get(`/api/user?search=${query}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user?.accessToken}`,
                        },
                    }
                );

                console.log({ "Search result": data });
                setSearchResult(data)
            } catch (error) {
                console.error({ "Error while searching": error.response?.data || error.message });
                alert(error.response?.data?.errors ? error.response.data.errors.join(', ') : error.message);
            }
        };
    }
    // console.log(search.usename)
    return (
        <>
            <form
                onSubmit={handleSearch}
                className="relative group my-4 flex items-center w-full"
            >
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value.trim() === "") {
                            setSearchResult([]);
                        }
                    }}
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="absolute right-3 text-gray-500 hover:text-blue-600"
                >
                    <Search size={18} />
                </button>

            </form>
        </>
    )
}

export default memo(SearchInput)