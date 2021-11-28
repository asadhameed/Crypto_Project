export default  {
    Query: {
        getCryptoCoins: (_ :any, { limit, filterAsset } :any, { dataSources }:any) =>
        dataSources.coinApi.getAllCoins({ limit, filterAsset }),
        getCoinHistory: (_ :any, { coinId,period_id, limit } :any, { dataSources }:any) =>
        dataSources.coinApi.getCoinHistory({ coinId, period_id, limit})

    }
  };

  