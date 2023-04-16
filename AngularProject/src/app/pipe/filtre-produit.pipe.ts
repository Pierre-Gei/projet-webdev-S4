import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtreProduit'
})
export class FiltreProduitPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
