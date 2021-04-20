import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail', //路径
    params: {  //需要传递的参数
      iid
    }
  })
}
export function getRecommend() {  
  return request({
    url:'/recommend'
  })
}

export class Goods {//类
  //因为数据来源于各种不同的对象里，所以使用类对象进行一个各种数据的总和
  constructor(itemInfo, columns, services) { //constructor,当我创建实例时会有的形参，我们传实参
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}


export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}


export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}





