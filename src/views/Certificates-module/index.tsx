import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import Header from "../../components/Header";
import { getCertificatesDate } from "../../service/service";

function CertificatesModule() {
  const [certificateData, setCertificatesData] = useState([]);
  const [favoriteCerts, setFavoriteCerts] = useState([]);

  const handleData = async () => {
    const data = await getCertificatesDate();
    setCertificatesData(data);
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <Header favoriteCertificates={favoriteCerts}/>
      <Table certificateData={certificateData} setFavoriteCerts={setFavoriteCerts} favoriteCerts={favoriteCerts}/>
    </>
  );
}

export default CertificatesModule;
