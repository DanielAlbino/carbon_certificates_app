import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import Header from "../../components/Header";
import { getCertificatesDate } from "../../service/service";
import Modal from "../../components/Modal";


function CertificatesModule() {
  const [certificateData, setCertificatesData] = useState<FilteredData[]>([]);
  const [favoriteCerts, setFavoriteCerts] = useState<FilteredData[]>([]);
  const [toggle, setToggle] = useState<Boolean>(false);

  const handleData = async () => {
    const data: Array<FilteredData> = await getCertificatesDate();
    setCertificatesData(data);
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      {toggle && (
        <Modal
          setToggle={setToggle}
          toggle={toggle}
          setFavoriteCerts={setFavoriteCerts}
          favoriteCerts={favoriteCerts}
        />
      )}
      <Header favoriteCertificates={favoriteCerts} setToggle={setToggle} />
      <Table
        certificateData={certificateData}
        setFavoriteCerts={setFavoriteCerts}
        favoriteCerts={favoriteCerts}
      />
    </>
  );
}

export default CertificatesModule;
