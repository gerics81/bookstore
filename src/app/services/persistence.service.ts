import { Injectable } from '@angular/core';

@Injectable()
export class PersistenceService {

    public put(key: string, value: any): void {
        localStorage.setItem(key, value);
    }

    public get(key: string): any {
        return localStorage.getItem(key);
    }
}