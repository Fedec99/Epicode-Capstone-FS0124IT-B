import { Pipe, PipeTransform } from '@angular/core';
import { Wallettype } from '../enumerated/wallettype';

@Pipe({
  name: 'walletype'
})
export class WalletTypePipe implements PipeTransform {

  transform(value: Wallettype): string {
    switch (value) {
      case Wallettype.CONTO_CORRENTE:
        return 'CONTO CORRENTE';
      case Wallettype.CONTO_TITOLI:
        return 'CONTO TITOLI';
      case Wallettype.CONTO_DEPOSITO:
        return 'CONTO DEPOSITO';
      case Wallettype.CRYPTO_WALLET:
          return 'WALLET CRYPTO';
      default:
        return "";

  }
}

}
