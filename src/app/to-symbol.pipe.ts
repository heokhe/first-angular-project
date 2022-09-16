import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toSymbol',
})
export class ToSymbolPipe implements PipeTransform {
  transform(operator: string): string {
    return operator === 'add' ? '+' : operator === 'multiply' ? '*' : operator;
  }
}
