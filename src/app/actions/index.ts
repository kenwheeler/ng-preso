import { Action } from '@ngrx/store';

export const CHANGE_SLIDE = 'INCREMENT';

export class ChangeSlide implements Action {
  readonly type = CHANGE_SLIDE;

  constructor(public payload: number) { }
}
