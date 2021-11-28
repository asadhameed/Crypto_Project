import Axios from 'axios'

export default Axios.create({
    baseURL: "https://rest.coinapi.io/v1/",
    headers: {'X-CoinAPI-Key': '42DBA91A-1A72-49ED-9D08-51635BA3CAF8'}
  });