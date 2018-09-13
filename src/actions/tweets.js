import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

function addTweet (tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  }
}

export function handleAddTweet (text, replyingTo) {
  
  return (dispatch, getState) => {
    const { authedUser } = getState()
    
    dispatch(showLoading())
    return saveTweet({
      text,
      author: authedUser,
      replyingTo
    })
      .then((tweet) => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}
// Action Creator
function toggleTweet ({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}
// Asynchronous action creator is responsible for invoking the saveLikeToggle() api call.
export function handleToggleTweet (info) {
  // return a function so we can dispatch whenever we like
  return (dispatch) => {
    // We are using optomistic updates by calling the dispatch before the API call. 
    dispatch(toggleTweet(info))

    // THE API CALL
    return saveLikeToggle(info)
      .catch((e) => {
        console.warn('Error in handleToggleTweet: ', e)
        dispatch(toggleTweet(info))
        alert('There was an error liking the tweet. Try again.')
      })
  }
}