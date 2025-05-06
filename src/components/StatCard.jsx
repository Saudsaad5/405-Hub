export default function StatCard({ icon, label }) {
    return (
      <div className="flex items-center gap-1 bg-gray-100 rounded px-3 py-2 shadow">
        <span>{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
    );
  }