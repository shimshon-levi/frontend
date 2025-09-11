import LogoutButton from "./LogoutButton";

export default function PrivateHeader() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="mx-auto max-w-screen px-3 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        <div className="font-semibold">Smart Docs</div>
        <LogoutButton />
      </div>
    </header>
  );
}
