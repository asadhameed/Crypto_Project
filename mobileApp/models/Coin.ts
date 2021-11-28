  class Coin {
      id:string;
    name: string;
    price: number
    iconUrl?:string
    volume24H:number

   
    constructor(id:string, name:string ,price:number,volume24H:number, iconUrl?:string ) {
      this.name = name
      this.id = id;
      this.price=price
      this.iconUrl=iconUrl
      this.volume24H=volume24H
    }

  }

  export default Coin