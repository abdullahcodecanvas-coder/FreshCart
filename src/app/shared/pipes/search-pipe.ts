import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform<T>(items: T[] | null | undefined, term: string, key: keyof T): T[] {
    if (!items) return [];
    if (!term) return items;

    const search = term.toLowerCase();
    return items.filter((item) =>
      String(item[key] ?? '').toLowerCase().includes(search)
    );
  }
}