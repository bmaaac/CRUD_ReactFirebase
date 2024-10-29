import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg border-bottom box-shadow">
      <div class="container">
        <Link class="navbar-brand" to="/">
          <img
            src="/icon.png"
            draggable="false"
            alt="Logo"
            width="30"
            class="me-2 align-text-center"
          />
          Restaurant
        </Link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link fw-semibold disabled">Product Management</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {/*  Non-functional - for visual purposes only */}
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <div className="text-center p-4 border-top">
      <img src="/icon.png" draggable="false" alt="" width="30" class="me-2" />
    </div>
  );
}
