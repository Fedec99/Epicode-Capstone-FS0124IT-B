import { Assetclass } from "../enumerated/assetclass";
import { Assettype } from "../enumerated/assettype";
import { Assetzone } from "../enumerated/assetzone";

export interface Asset {
  id?:number;
	walletId?:number;
	name?:string;
	ticker?:string;
	assetType?:Assettype;
  assetClass?:Assetclass;
	zone?:Assetzone;
	issuer?:string;
	intermediary?:string;
	amount?:number;
  ISIN?:string;
  tax?:number;
  exchange?:string;
  averagePurchasePrice?:number;
  paidCommission?:number;
  marketPrice?:number;
  marketValue?:number;
}
