import { IorderItems } from "./iorder-items"

export interface Iorder {
  "id": number,
  "buyerEmail": string,
  "orderDate": string,
  "deliveryMethod": string,
  "subtotal": number,
  "shippingPrice": number,
  "shipToAddress": {
    "firstname": string,
    "lastname": string,
    "street": string,
    "city": string,
    "state": string,
    "zipCode": string
  },
  "orderItems": IorderItems[],
  "status": string,
  "total": number
}
