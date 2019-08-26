import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { PokerCard } from './models/poker-card';
import {PokerCardService} from './services/poker-card.service';
import {PokerCardCommand} from "./models/poker-card-command";
import {General} from "./models/general";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  pokerCards: PokerCard[] = [];

  areAllCardsExpanded = false;
  isAutoUpdateOn = true;
  nameToAdd = 'No name';

  pokerCardCommand: PokerCardCommand = new PokerCardCommand();
  general: General = new General();

  numer = 3;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private pokerCardService: PokerCardService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.fetchPokerCards();
    this.loop();
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  private addPokerCard(): void {
    this.pokerCardCommand.name = this.nameToAdd;
    this.pokerCardCommand.value = 0;

    this.pokerCardService.add(this.pokerCardCommand).then(() => {
      this.fetchPokerCards();
    }).catch(err => {
      console.error('add() error: ' + err);
    });
  }

  private fetchPokerCards(): void {
    this.pokerCardService.fetch().then(response => {
      this.pokerCards = response;
    });
    /*
    this.pokerCardService.fetchGeneral().then(response => {

      this.general = response;
    });
    */
  }

  private expandAllcards(): void {
    this.fetchPokerCards();
    this.areAllCardsExpanded = !this.areAllCardsExpanded;
  }

  private changeAutoUpdate() {
    this.isAutoUpdateOn = !this.isAutoUpdateOn;
    this.loop();
  }

  private loop(): void {
    // const theLoop: (i: number) => void = (i: number) => {
    //   setTimeout(() => {
    //     if (this.isAutoUpdateOn) {
    //       this.fetchPokerCards();
    //       theLoop(i);
    //     }
    //   }, 300);
    // };
    // theLoop(10);
  }

  private deleteAllCards(): void {
    while (this.pokerCards.length > 0) {
      this.pokerCards.pop();
    }
  }

  private updatePokerCard(pokerCard: PokerCard): void {
    this.pokerCardCommand = pokerCard;

    console.log('updatePokerCard:', pokerCard);

    this.pokerCardService.update(this.pokerCardCommand).then(() => {
    }).catch(err => {
      console.error('updateColor() error: ' + err);
    });
  }

}

