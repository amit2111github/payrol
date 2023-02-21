import React from "react";
import { Link } from "react-router-dom";
import "../navbar/Navbar.css";

function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        style={{ background: "#100134", padding: "0%" }}
      >
        <div className="container-fluid ">
          <button type="button" className="btn btn-warning my-2 titlecolor ">
            <strong>Payrol</strong>
          </button>
          <button
            className="navbar-toggler bg-light hambur"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon hambur"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <div className="my-3">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-light marginlittle"
                    to="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <b>Product</b>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item " to="/">
                        hello1
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        hello2
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/">
                        hello3
                      </Link>
                    </li>
                  </ul>
                </li>
              </div>
              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  aria-current="page"
                  to="/home"
                >
                  <div className="my-3">
                    <b>Pricing</b>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  aria-current="page"
                  to="/home"
                >
                  <div className="my-3">
                    <b>Customers</b>
                  </div>
                </Link>
              </li>
              <div className="my-3">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-light"
                    to="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <b>Resources</b>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item " to="/">
                        Hello1
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Hello2
                      </Link>
                    </li>
                    <li></li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        hello3
                      </Link>
                    </li>
                  </ul>
                </li>
              </div>
            </ul>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
              <div
                onClick={() => (window.location.href = "/" + "signup")}
                className="btn btn-outline-danger colorBlue"
                type="button"
                data-bs-toggle="button"
              >
                Register your company
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
