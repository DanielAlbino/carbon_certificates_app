import React, { useState } from "react";

function Table(props: any) {
  const { certificateData, setFavoriteCerts, favoriteCerts } = props;
  const [showAlert, setShowAlert] = useState(false);
  const handleFavorites = (cert: any) => {
    const certificate = favoriteCerts.filter(
      (obj: any) => obj.uniqueID == cert.uniqueID
    );
    if (certificate.length) {
      setFavoriteCerts([
        ...favoriteCerts.filter((obj: any) => obj.uniqueID !== cert.uniqueID),
      ]);
    } else {
      setFavoriteCerts([...favoriteCerts, cert]);
    }
  };

  const copyCertificateId = (certID: string) => {
    navigator.clipboard.writeText(certID);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return certificateData?.length ? (
    <>
      <div style={{height:75}} className="mt-3">
        {showAlert && (
          <div id="alert" className="alert alert-success" role="alert">
            <i className="bi bi-check2-circle"></i> Certificate ID copied.
          </div>
        )}
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            {Object.keys(certificateData[0]).map((key) => (
              <th scope="col">{key}</th>
            ))}
            <th scope="col" style={{ width: 150 }}></th>
          </tr>
        </thead>
        <tbody>
          {certificateData.map((cert: any) => {
            return (
              <tr className="certificate">
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    copyCertificateId(cert.uniqueID);
                  }}
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Click to copy the certificate ID"
                >{`${cert.uniqueID.substr(0, 30)}...`}</th>
                <td>{cert.originator}</td>
                <td>{cert.originatorCountry}</td>
                <td>{cert.owner}</td>
                <td>{cert.ownerCountry}</td>
                <td>{cert.status}</td>
                <td
                  onClick={() => handleFavorites(cert)}
                  style={{ cursor: "pointer" }}
                >
                  {favoriteCerts.filter(
                    (obj: any) => obj.uniqueID == cert.uniqueID
                  ).length ? (
                    <i className="bi bi-bookmark-fill"></i>
                  ) : (
                    <i className="bi bi-bookmark"></i>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  ) : (
    <div>NO DATA</div>
  );
}

export default Table;
