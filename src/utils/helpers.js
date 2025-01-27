import { FaCircleUser } from "react-icons/fa6"

export function displayAvatar(avatarURL) {
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

export function displayElapsedTime(timestamp) {
    // Display elapsed time since 'timestamp' in a readable text format
    const elapsedTimeString = getElapsedTime(timestamp);
    return <span className="text-muted">{ elapsedTimeString }</span>;
}

export function getElapsedTime(timestamp) {
    // Compute the elapsed time since 'timestamp', and returns it as a readable string
    const elapsedTimestamp = Date.now() - timestamp; 
    const minutes = Math.floor(elapsedTimestamp / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 1)
        return `${years} year(s) ago`
    else if (months > 1)
            return `${months} days ago`
    else if (days > 1)
        return `${days} days ago`
    else if (hours > 1)
        return `${hours} hours ago`
    else if (minutes > 1)
        return `${minutes} minutes ago`
    else
        return 'less than a minute ago'
}

export const handleFormChange = (e, field, setFormState) => {
    setFormState(formState => ({...formState, 
        [field]: e.target.value,
        error: ''}));
}
