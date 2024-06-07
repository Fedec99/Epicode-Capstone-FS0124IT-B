import { Currencyoptions } from "src/app/enumerated/currencyoptions";

export interface Registerdata {
  "name": string,
  "username": string,
  "currency": Currencyoptions,
  "email": string,
  "password": string
}
