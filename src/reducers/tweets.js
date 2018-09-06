import { RECEIVE_TWEETS } from '../actions/tweets'

export default function tweets (state = {}, action ) {
  switch(action.type) {
    case RECEIVE_TWEETS : 
    // merge tweets onto the return object
      return {
        ...state,
        ...action.tweets
      }
    default :
    return state
  }
}