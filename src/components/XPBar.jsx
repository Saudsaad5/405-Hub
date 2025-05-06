export default function XPBar({ currentXP, maxXP }) {
  const percentage = (currentXP / maxXP) * 100;
  return (
    <div className="w-full bg-gray-200 rounded h-4 my-2">
      <div
        className="bg-blue-500 h-4 rounded"
        style={{ width: `${percentage}%` }}
      ></div>
      <p className="text-sm text-right mt-1">
        XP: {currentXP} / {maxXP}
      </p>
    </div>
  );
}
