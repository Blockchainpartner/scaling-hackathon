export type UserId = {
  cell: string;
  dob: { date: string; age: number };
  email: string;
  gender: string;
  id: {
    name: string;
    value: null;
  };
  location: {
    city: string;
    coordinates: { latitude: string; longitude: string };
    country: string;
    postcode: string;
    state: string;
    street: { number: number; name: string };
    timezone: { offset: string; description: string };
  };
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };
  name: { first: string; last: string; title: string };

  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: { age: number; date: string };
};

export type MockService = {
  id: number;
  logo: string;
  title: string;
  issuer: string;
  description: string;
  cta?: string;
};
