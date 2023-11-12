import React, { useState } from "react";
import "./index.css";

function Modal({ setToggle, toggle, setFavoriteCerts, favoriteCerts }: any) {
  const [tempFavoriteCerts, setTempFavoriteCerts] = useState(favoriteCerts);
  const [searchCertificate, setSearchCertificate] = useState("");

  const onSaveChanges = () => {
    setFavoriteCerts([...tempFavoriteCerts]);
  };

  const copyCertificateId = (uniqueID: string) => {
    navigator.clipboard.writeText(uniqueID);
  };

  const onSearch = (certId: string) => {
    setSearchCertificate(certId);
  };

  return (
    <div
      className="modal bg-color"
      role="dialog"
      style={{ display: toggle ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">My Favorite Certificates</h5>
          </div>
          <div className="modal-body">
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Search by certificate ID, originator or status"
                value={searchCertificate}
                onChange={(event) => onSearch(event.target.value)}
              />
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">UNIQUEID</th>
                  <th scope="col">ORIGINATOR</th>
                  <th scope="col">OWNER</th>
                  <th scope="col">STATUS</th>
                  <th scope="col" style={{ width: 150 }}></th>
                </tr>
              </thead>
              <tbody>
                {tempFavoriteCerts
                  ?.filter(
                    (certs: FilteredData) =>
                      certs.uniqueID.includes(searchCertificate) ||
                      certs.originator.includes(searchCertificate) ||
                      certs.status.includes(searchCertificate)
                  )
                  .map((cert: FilteredData, index: string) => (
                    <tr id={index} key={index}className="certificate">
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
                      <td>{cert.owner}</td>
                      <td>{cert.status}</td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setTempFavoriteCerts([
                            ...tempFavoriteCerts.filter(
                              (obj: FilteredData) => obj.uniqueID !== cert.uniqueID
                            ),
                          ])
                        }
                      >
                        <i className="bi bi-trash"></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onSaveChanges();
                setToggle(false);
              }}
            >
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => setToggle(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
