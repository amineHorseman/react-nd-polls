import { FaCircleUser } from "react-icons/fa6"

export function displayUserAvatar(avatarURL) {
    // Display user avatar, or a profile icon if URL is null
    return (
        <span className="avatar">
        { avatarURL === null ? 
            <FaCircleUser /> : 
            <img src={avatarURL} className="rounded-circle" alt="User avatar"/>
        }
        </span>
    );
}
