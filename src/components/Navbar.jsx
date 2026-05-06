import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const { cart, search, setSearch, sort, setSort, products } =
    useContext(CartContext);

  const [scrolled, setScrolled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // suggestions logic
  const suggestions = products.filter((p) => {
    const query = search.toLowerCase().trim();
    const name = p.product_name.toLowerCase();

    return query && name.includes(query);
  });

  return (
    <nav
      className={`navbar navbar-expand-md navbar-light scroll-margin-top: 100px; bg-secondary px-3 fixed-top ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      {/* Brand */}
      <NavLink to="/" className="navbar-brand d-flex align-items-center">
        <img
          src={logo}
          alt="Cova Kicks"
          style={{ height: "60px", width: "60px", objectFit: "contain" }}
        />
        <span className="ms-2 fw-bold text-white">Cova Kicks</span>
      </NavLink>

      {/* Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navMenu">
        <div className="navbar-nav ms-auto d-flex align-items-center gap-2">

          {/* SEARCH + SUGGESTIONS */}
          <div className="position-relative" style={{ width: "220px" }}>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onBlur={() =>
                  setTimeout(() => setShowSuggestions(false), 150)
                }
              />
            </div>

            {/* DROPDOWN */}
           {showSuggestions && suggestions.length > 0 && (
  <ul
    className="list-group position-absolute w-100"
    style={{
      top: "100%",
      left: 0,
      zIndex: 9999,
      maxHeight: "250px",
      overflowY: "auto"
    }}
  >
    {suggestions.slice(0, 5).map((item) => (
      <li
        key={item.id}
        className="list-group-item list-group-item-action d-flex align-items-center gap-2"
        style={{ cursor: "pointer" }}
        onClick={() => {

          setSearch(item.product_name);
          setShowSuggestions(false);
          window.location.href = `/#product-${item.id}`;
        }}
      >
        {/* 🖼 IMAGE */}
        <img
          src={`http://dumafidel.alwaysdata.net/static/images/${item.product_photo}`}
          alt=""
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "5px"
          }}
        />

        {/*  INFO */}
        <div className="flex-grow-1">
          <div style={{ fontSize: "14px", fontWeight: "500" }}>
            {item.product_name}
          </div>
          <div style={{ fontSize: "12px", color: "gray" }}>
            Ksh {item.product_cost}
          </div>
        </div>
      </li>
    ))}
  </ul>
)}
          </div>

          {/* SORT */}
          <select
            className="form-select form-select-sm mx-2"
            style={{ width: "140px" }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

          {/* CART */}
          <NavLink to="/cart" className="position-relative nav-link text-white">
            <i className="bi bi-cart" style={{ fontSize: "1.3rem" }}></i>

            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </NavLink>

          {/* SIGN IN */}
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? "btn btn-dark btn-sm" : "btn btn-primary btn-sm"
            }
          >
            Sign In
          </NavLink>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;