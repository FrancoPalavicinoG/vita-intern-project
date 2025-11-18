import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Vita</div>

      <ul className="navbar-links">
        <li>
          <Link className={isActive("/")} to="/">Clientes</Link>
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