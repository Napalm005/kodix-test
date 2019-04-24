import { SET_FILTER } from '../actions/PageActions'

export const initialState = {
  filter: 'price',
}

export function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, filter: action.payload }

    default:
      return state
  }
}