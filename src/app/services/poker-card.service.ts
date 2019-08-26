import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PokerCard} from '../models/poker-card';
import {PokerCardCommand} from "../models/poker-card-command";
import {General} from "../models/general";

@Injectable({
  providedIn: 'root'
})
export class PokerCardService {

  constructor(private httpClient: HttpClient) {
  }

  public fetch(): Promise<PokerCard[]> {
    return this.httpClient.get('http://192.168.253.158:8080/api/pokercard').toPromise().then(response => response as PokerCard[]);
  }

  public fetchGeneral(): Promise<General> {
    return this.httpClient.get('http://192.168.253.158:8080/api/general').toPromise().then(response => response as General);
  }

  public update(pokerCard: PokerCard) {
    return this.httpClient.put('http://192.168.253.158:8080/api/pokercard', pokerCard).toPromise();
  }

  public add(pokerCardCommand: PokerCardCommand) {
    return this.httpClient.post('http://192.168.253.158:8080/api/pokercard', pokerCardCommand).toPromise();
  }
}
