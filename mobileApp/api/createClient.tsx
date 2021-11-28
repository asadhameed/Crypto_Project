import Axios from "axios";

export const createClient = Axios.create({
  baseURL: "http://9fbf-31-208-107-239.ngrok.io/",
});

export const coinQuery = (limit?: number, filterAsset?: string) => {
  return {
    query: `
  query Query($limit: Int, $filterAsset: String)  {
    getCryptoCoins(limit: $limit , filterAsset: $filterAsset) {
      asset_id
      name
      url
      price_usd
      volume_1day_usd
    }
  }`,
    variables: {
      limit,
      filterAsset,
    },
  };
};

export const coinHistory = (
  limit: number,
  coinId?: string,
  periodId?: string
) => {
  return {
    query: `
    query Query($coinId: ID!,  $periodId: String, $limit: Int) {
      getCoinHistory(coinId: $coinId, period_id: $periodId, limit: $limit) {
        time_period_end
        rate_close
      }
    }`,
    variables: {
      coinId,
      periodId,
      limit,
    },
  };
};
