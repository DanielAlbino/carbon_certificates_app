import React, { useState } from "react";
import Pagination from "../Pagination";

function Table(props: TableProps) {
  const { certificateData, setFavoriteCerts, favoriteCerts } = props;
  const [showAlert, setShowAlert] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const certsPerPage: number = 10;

  const handleFavorites = (cert: FilteredData) => {
    const certificate = favoriteCerts.filter(
      (obj: any) => obj.uniqueID == cert.uniqueID
    );
    if (certificate.length) {
      setFavoriteCerts([
        ...favoriteCerts.filter(
          (obj: FilteredData) => obj.uniqueID !== cert.uniqueID
        ),
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

  const paginate = (number: number) => setCurrentPage(number);

  // Get current Certificates
  const indexOfLastCert = currentPage * certsPerPage;
  const indexofFirstCert = indexOfLastCert - certsPerPage;
  const pagination: Array<number> = [];

  for (let i = 1; i <= Math.ceil(certificateData.length / certsPerPage); i++) {
    pagination.push(i);
  }

  return certificateData?.length ? (
    <>
      <div style={{ height: 75 }} className="mt-3">
        {showAlert && (
          <div id="alert" className="alert alert-success" role="alert">
            <i className="bi bi-check2-circle"></i> Certificate ID copied.
          </div>
        )}
      </div>
      <div
        style={{ minHeight: 500, backgroundColor: "white" }}
        className="mb-3"
      >
        <table className="table table-hover">
          <thead>
            <tr>
              {Object.keys(certificateData[0]).map((key) => (
                <th id={key} key={key} scope="col">
                  {key.toUpperCase()}
                </th>
              ))}
              <th scope="col" style={{ width: 150 }}></th>
            </tr>
          </thead>
          <tbody>
            {certificateData
              .slice(indexofFirstCert, indexOfLastCert)
              .map((cert: FilteredData) => {
                return (
                  <tr id={cert.uniqueID} key={cert.uniqueID} className="certificate">
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
                        (obj: FilteredData) => obj.uniqueID == cert.uniqueID
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
      </div>
      <Pagination pagination={pagination} paginate={paginate} />
    </>
  ) : (
    <div>NO DATA</div>
  );
}

export default Table;
