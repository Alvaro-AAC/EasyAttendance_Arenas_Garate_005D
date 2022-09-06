import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {

  public static user: string;
  public static loged: string;

  constructor() { }
}
