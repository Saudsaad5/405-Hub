export default function ProfileHeader({ name, level }) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">👤</div>
          <h2 className="text-lg font-semibold">{name}</h2>
        </div>
        <div className="text-red-500 font-bold">🔥 Level {level}</div>
      </div>
    );
  }
  