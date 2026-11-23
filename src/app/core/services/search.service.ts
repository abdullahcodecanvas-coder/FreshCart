import { Service, signal } from '@angular/core';

@Service()
export class SearchService {
    serchItem = signal<string>('');
    setItem(value:string){
        this.serchItem.set(value)
    }
}
