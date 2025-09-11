// src/nav/TopBar.tsx
export default function TopBar() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-3 sm:px-4 py-2 shadow-sm">
      <div className="flex items-center gap-3">
        {/* שדה חיפוש נמתח */}
        <input
          className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:bg-white"
          placeholder="...חיפוש מסמכים, תיקים, לקוחות"
        />

        {/* כפתור התראות */}
        <button
          type="button"
          aria-label="התראות"
          className="relative shrink-0 h-9 w-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50"
        >
          <span className="text-lg leading-none">🔔</span>
          <span className="absolute -top-1 -left-1 grid h-5 w-5 place-items-center rounded-full bg-indigo-600 text-white text-[10px]">
            3
          </span>
        </button>
      </div>
    </div>
  );
}
