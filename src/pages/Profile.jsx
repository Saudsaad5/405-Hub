import ProfileHeader from "../components/ProfileHeader";
import XPBar from "../components/XPBar";
import StatCard from "../components/StatCard";

export default function Profile() {
    return (
        <div className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4">
            <ProfileHeader name="Saud Saad" level={3} />
            <XPBar currentXP={1200} maxXP={1600} />
            <div className="flex justify-between">
                <StatCard icon="⚡" label="Streak: 4 Days" />
                <StatCard icon="🏆" label="Badges: 3" />
                <StatCard icon="🔥" label="Rank: #12" />
            </div>
            <div className="flex justify-between">
                <button className="bg-green-500 text-white px-4 py-2 rounded">🎮 Start Task</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">👀 View Badges</button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded">📝 Edit Profile</button>
            </div>
        </div>
    );
}
