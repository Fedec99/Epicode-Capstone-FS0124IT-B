import { Movementtype } from "../enumerated/movementtype";

export interface Movement {
  id?: number;
	movementType?: Movementtype;
	userId?: number;
	number?: number;
	startingWalletId?: number;
  endingWalletId?: number;
	startingAssetId?: number;
	endingAssetId?: number;
	startingAssetAmmount?: number;
	endingAssetAmmount?: number;
	purchasePrice?: number;
	date?:Date;
}
