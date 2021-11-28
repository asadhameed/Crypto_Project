import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import coinApi from "./api";

class CoinAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://rest.coinapi.io/v1/";
  }
  willSendRequest(request: RequestOptions) {
    request.headers.set(
      "X-CoinAPI-Key",
      "42DBA91A-1A72-49ED-9D08-51635BA3CAF8"
    );
  }

  coinReducer(coin: any) {
    return {
      asset_id: coin.asset_id || 0,
      name: coin.name,
      type_is_crypto: coin.type_is_crypto,
      data_start: coin.data_start,
      data_end: coin.data_end,
      data_quote_start: coin.data_quote_start,
      data_quote_end: coin.data_quote_end,
      data_orderbook_start: coin.data_orderbook_start,
      data_orderbook_end: coin.data_orderbook_end,
      data_trade_start: coin.data_trade_start,
      data_trade_end: coin.data_trade_end,
      data_symbols_count: coin.data_symbols_count,
      volume_1hrs_usd: coin.volume_1hrs_usd,
      volume_1day_usd: coin.volume_1day_usd,
      volume_1mth_usd: coin.volume_1mth_usd,
      price_usd: coin.price_usd,
      url: coin.url,
    };
  }

  async getAllCoins({ limit, filterAsset }: any) {
    try {
      let response;
      if(filterAsset){
        response = await coinApi.get(`/assets?filter_asset_id=${filterAsset}`);
      }
      else{
        response = await coinApi.get("/assets");
      }
    
      const coinsData = response.data
        .filter((c: any) => c.type_is_crypto === 1)
        .filter((c: any) => c.price_usd)
        .sort((a: any, b: any) => b.data_symbols_count - a.data_symbols_count);

      const responseIcon = await coinApi.get("/assets/icons/100");
      const coinsIcon = responseIcon.data;

      const coins = coinsData.map((c: any) => {
        const icon = coinsIcon.find(
          (icon: any) => icon.asset_id === c.asset_id
        );
        return icon ? { url: icon.url, ...c } : c;
      });

      const topCoins = limit ? coins.slice(0, limit) : coins;

      return Array.isArray(topCoins)
        ? topCoins.map((coin) => this.coinReducer(coin))
        : [];
      
    } catch (err) {
      console.log(
        "🚀 ~ file: coinAPI.ts ~ line 64 ~ CoinAPI ~ getAllCoins ~ err",
        err
      );
      return [];
    }
  }
  async getCoinHistory({ coinId, period_id, limit }: any) {
    let times = 100 * 24 * 3600 * 1000; // date 100 days ago in milliseconds
    let period= "7DAY";

    switch (period_id) {
      case "1M":
        period = "1MIN";
        times = (limit - 1) * 60 * 1000; // Last n time minutes data
        break;
      case "1H":
        times = (limit - 1) * 60 * 60 * 1000; //last n time hours data
        period = "1HRS";
        break;
      case "4H":
        times = (limit * 4 - 1) * 60 * 60 * 1000; //last n time 4hours data
        period = "4HRS";
        break;
      case "1D":
        times = (limit - 1) * 24 * 60 * 60 * 1000; //last n time 1 day data
        period = "1DAY";
        break;

      default:
        times = (limit * 7 - 1) * 24 * 60 * 60 * 1000; //last n time 1 day data
        period = "7DAY";
        
    }
  
    const startTime = new Date(Date.now() - times).toISOString();

    try {
      const res = await coinApi.get(
        `/exchangerate/${coinId}/USD/history?period_id=${period}&time_start=${startTime}&limit=${limit}`
      );
    
      return res.data;
    } catch (err) {
      console.log(
        "🚀 ~ file: coinAPI.ts ~ line 105 ~ CoinAPI ~ getCoinHistory ~ err",
        err
      );
      return [];
    }
  }
}

export default CoinAPI;
