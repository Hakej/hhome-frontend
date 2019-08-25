import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { PokerCard } from './models/poker-card';

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

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.initDefaultPokerCards();
    this.loop();
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  private initDefaultPokerCards(): void {
    for (let i = 0; i < 5; i++) {
      this.addPokerCard();
    }
  }

  private addPokerCard(): void {
    this.pokerCards.push(new PokerCard(this.nameToAdd));
  }

  private fetchPokerCards(): void {
    console.log('Fetch!');
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
    const theLoop: (i: number) => void = (i: number) => {
      setTimeout(() => {
        if (this.isAutoUpdateOn) {
          this.fetchPokerCards();
          theLoop(i);
        }
      }, 300);
    };
    theLoop(10);
  }

  private deleteAllCards(): void {
    while (this.pokerCards.length > 0) {
      this.pokerCards.pop();
    }
  }
}

