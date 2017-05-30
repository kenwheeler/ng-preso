import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  Component,
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
} from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import { createHashHistory } from 'history';

import { SlideComponent } from '../slide/slide.component';
import * as Actions from '../actions';

interface AppState {
  slide: number;
}

@Component({
  selector: 'app-deck',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements AfterContentInit, AfterViewChecked {
  @ContentChildren(SlideComponent) slides: QueryList<SlideComponent>;

  private displaySlide: SlideComponent;
  private history: any; // Ugh
  private slide: Observable<number>;
  private slideRef: number;

  constructor(private store: Store<AppState>) {
    this.history = createHashHistory();
    this.checkSlide(this.history.location);
    this.history.listen(location => {
      this.checkSlide(location);
    });

    this.slide = store.select('slide');
    this.slide.subscribe(data => {
      this.slideRef = data;
      this.displaySlide = this.slides ? this.slides.toArray()[data] : null;
      if (this.slides) {
        this.handleSlides();
      }
    });

    const keyListener = Observable.fromEvent(window, 'keydown');
    keyListener.subscribe(data => this.handleKeys(data));
  }

  ngAfterContentInit() {
    this.handleSlides();
  }

  ngAfterViewChecked() {
    (<any>window).Prism.highlightAll();
  }

  checkSlide(location) {
    const slide = parseInt(location.pathname.replace('/', ''), 10);
    if (isNaN(slide)) {
      this.history.push('/0');
    } else {
      this.store.dispatch(new Actions.ChangeSlide(slide));
    }
  }

  handleSlides() {
    this.slides.forEach((slide, index) => {
      slide.active = index === this.slideRef;
      if (slide.active) {
        document.body.style.background = slide.bgColor;
      }
    });
  }

  setDirection(direction: string) {
    this.slides.forEach((slide, index) => {
      slide.reverse = direction;
      slide.changeDetectorRef.detectChanges();
    });
  }

  handleKeys({ code = '' }) {
    const currentSlide = this.slideRef;
    switch (code) {
      case 'ArrowLeft':
        if (currentSlide === 0) {
          return;
        }
        this.setDirection('forward');
        this.history.push(`/${currentSlide - 1}`);
        break;
      case 'ArrowRight':
        if (currentSlide + 1 > this.slides.length - 1) {
          return;
        }
        this.setDirection('reverse');
        this.history.push(`/${currentSlide + 1}`);
        break;
      default:
        break;
    }
  }
}
