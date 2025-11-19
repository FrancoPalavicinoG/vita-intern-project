import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-blue-500 font-semibold border-b-2 border-blue-500"
      : "text-gray-600 hover:text-gray-800";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">Vita Project</div>

      {/* Links */}
      <ul className="flex gap-6 text-lg">
        <li>
          <Link className={isActive("/")} to="/">
            Clientes
          </Link>
        </li>
        <li>
          <Link className={isActive("/summary")} to="/summary">
            Resumen del día
          </Link>
        </li>
      </ul>
    </nav>
  );
}