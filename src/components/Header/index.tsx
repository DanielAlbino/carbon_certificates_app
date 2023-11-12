import React, { useState } from "react";
import "./index.css";

function Header(props: HeaderProps) {
  const { favoriteCertificates, setToggle } = props;


  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">CARBON CERTIFICATE </a>
          <button className="btn btn-primary" type="submit" disabled={!favoriteCertificates.length} onClick={() => setToggle(true)}>
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
