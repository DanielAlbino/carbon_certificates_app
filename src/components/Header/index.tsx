import React from "react";
import "./index.css";
function Header(props: any) {
  const { favoriteCertificates } = props;

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">CARBON CERTIFICATE </a>
          <button className="btn btn-primary" type="submit" disabled={!favoriteCertificates.length}>
            My certificates{" "}
            {favoriteCertificates.length ? (
              <span className="circle">{favoriteCertificates.length >= 99 ? "99+" : favoriteCertificates.length}</span>
            ) : ''}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
