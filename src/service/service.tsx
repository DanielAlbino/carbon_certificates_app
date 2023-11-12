export async function getCertificatesDate() {
  const data: Array<Data> = await fetch(process.env.REACT_APP_API_URL, {
    headers: {
      "Content-Type": "application/json",
      API_ACCESS_TOKEN: process.env.REACT_APP_ACCESS_TOKEN,
    },
  })
    .then((result) => result.json())
    .then(({ result }) => result.data);

  return filterData(data);
}

function filterData(data: Array<Data>) {
  const filteredData: Array<FilteredData> = [];
  data.map((obj: Data) => {
    filteredData.push({
      uniqueID: obj.uniqueNumber,
      originator: obj.companyName,
      originatorCountry: obj.countryCode,
      owner: obj.carbonUser.company.name,
      ownerCountry: obj.carbonUser.company.address.country,
      status: obj.validity,
    });
  });
  return filteredData;
}
