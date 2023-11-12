export async function getCertificatesDate() {
  const data = await fetch("https://demo.api.agreena.com/api/public/carbon_registry/v1/certificates?includeMeta=true", {
    headers: {
      "Content-Type": "application/json",
      "API_ACCESS_TOKEN":"Commoditrader-React-FE-Farmer",
    },
  }).then(result => result.json()).then(({result}) => result.data);
  
  return filterData(data)
}


function filterData(data: any){
    const filteredData: any = []
    data.map((obj: any) => {
        filteredData.push({
            uniqueID: obj.uniqueNumber,
            originator: obj.companyName,
            originatorCountry: obj.countryCode,
            owner: obj.carbonUser.company.name,
            ownerCountry: obj.carbonUser.company.address.country ,
            status: obj.validity

        })
    })
    return filteredData;
}