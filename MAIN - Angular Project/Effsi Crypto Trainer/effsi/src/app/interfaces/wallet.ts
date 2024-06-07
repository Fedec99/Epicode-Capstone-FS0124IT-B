import { Wallettype } from "../enumerated/wallettype";

export interface Wallet {
	id?: number;
	walletType?: Wallettype;
  name: string;
	userId?: number;
	value?: number;
}
