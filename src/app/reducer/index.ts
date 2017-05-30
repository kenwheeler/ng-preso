import { Action } from '@ngrx/store';
import * as Actions from '../actions';

export interface State {
  slide: number;
}

export const initialState: State = {
  slide: 0,
};

export function slideReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case Actions.CHANGE_SLIDE:
      return Object.assign({}, state, {
        slide: action.payload
      });

    default:
      return state;
  }
}
