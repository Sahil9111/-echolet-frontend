import { memo } from "react";
import { useContext } from 'react'
import { UserContext } from '../context/user/UserContex.jsx'



function UserIcon() {
    const { user } = useContext(UserContext)
    return (
        <div>
            <div
                className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300"
            >
                <img
                    src={user?.profileImage || "/default-avatar.png"}
                    alt={user?.username || "Profile"}
                    className="w-full h-full object-cover"
                />
            </div>
            {user?.username}</div>
    )
}

export default memo(UserIcon)