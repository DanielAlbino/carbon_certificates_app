type FilteredData = {
  uniqueID: string;
  originator: string;
  originatorCountry: string;
  owner: string;
  ownerCountry: string;
  status: string;
};

type Data = {
  uniqueNumber: string;
  companyName: string;
  countryCode: string;
  owner: string;
  ownerCountry: string;
  carbonUser: {
    company: {
      name: string;
      address: {
        country: string;
      };
    };
  };
  validity: string;
};

type PaginationProps = {
  pagination: Array<number>;
  paginate: any;
};

type TableProps = {
  certificateData: Array<FilteredData>;
  setFavoriteCerts: any;
  favoriteCerts: Array<FilteredData>;
};

type HeaderProps = {
  favoriteCertificates: Array<FilteredData>;
  setToggle: any;
};
