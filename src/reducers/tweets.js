import { RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets'

export default function tweets (state = {}, action ) {
  switch(action.type) {
    case RECEIVE_TWEETS : 
    // merge tweets onto the return object
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET :
      return { 
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked === true
            // filter out the authenticated User if they have already liked the tweet.
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
           
            : state[action.id].likes.concat([action.authedUser])
        } 
      }
    default :
    return state
  }
}