import { SEND_EMAIL } from "../actions/types";

export default function emailReducer(state = [], action) {
  switch (action.type) {
    case SEND_EMAIL:
      return [...state, action.payload];
    default:
      return state;
  }
}
