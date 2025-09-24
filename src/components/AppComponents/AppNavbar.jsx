import ROUTES from "../../constants/routes";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-3'>
      <div className='container-fluid'>
        {/* Brand */}
        <Link className='navbar-brand fw-bold' to={ROUTES.HOME}>
          App
        </Link>

        {/* Hamburger button for small screens */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          size={"20px"}
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* Collapsible menu */}
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' to={ROUTES.HOME}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to={ROUTES.DASHBOARD}>
                dashboard
              </Link>
            </li>
          </ul>

          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' to={ROUTES.LOGIN}>
                Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to={ROUTES.REGISTER}>
                Register
              </Link>
            </li>
          </ul>
          {/* Theme toggle button */}
          <button
            className='btn btn-outline-secondary ms-lg-3'
            onClick={toggleTheme}
            type='button'
          >
            {theme === "light" ? "🌙 " : "☀️ "}
          </button>
        </div>
      </div>
    </nav>
  );
}
