import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    list: {
        status: 'INIT',
        data: [],
        isLast: false
    },
    star: {
        status: 'INIT',
        error: -1
    },
    searchList:{
      status: 'INIT',
      data:[],
      isLast: false
    },
    myList:{
      status: 'INIT',
      data:[],
      isLast: false
    }
};

export default function game(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
      case types.GAME_LIST:
          return update(state, {
              list: {
                  status: { $set: 'WAITING' },
              }
          });
      case types.GAME_LIST_SUCCESS:
          console.log("GAME_LIST_SUCCESS")
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data: { $push: action.data },
                    isLast: { $set: action.data.length < 6 }
                }
            })
          // loading older or newer GAME
          // to be implemented..
          return state;
      case types.GAME_LIST_FAILURE:
          return update(state, {
              list: {
                  status: { $set: 'FAILURE' }
              }
          })

      case types.GAME_STAR:
          return update(state, {
              star: {
                  status: { $set: 'WAITING' },
                  error: { $set: -1 }
              }
          });
      case types.GAME_STAR_SUCCESS:
          return update(state, {
              star: {
                  status: { $set: 'SUCCESS' }
              },
              list: {
                  data: {
                      [action.index]: {
                        mystar: { $set: action.score }
                      }
                  }
              }
          });
      case types.GAME_STAR_FAILURE:
          return update(state, {
              star: {
                  status: { $set: 'FAILURE' },
                  error: { $set: action.error }
              }
          });

      case types.GAME_LIST_RESET_SUCCESS:
          console.log("GAME_LIST_RESET_SUCCESS")
          return update(state, {
              list: {
                  status: { $set: 'INIT' },
                  data: { $set: [] },
                  isLast: { $set: false }
              }
          });

      case types.GAME_SEARCH:
          return update(state, {
              searchList: {
                  status: { $set: 'WAITING' },
              }
          });

      case types.GAME_SEARCH_SUCCESS:
            return update(state, {
                searchList: {
                    status: { $set: 'SUCCESS' },
                    data: { $push: action.data },
                    isLast: { $set: action.data.length < 6 }
                }
            });

      case types.GAME_SEARCH_FAILURE:
          return update(state, {
              searchList: {
                  status: { $set: 'FAILURE' }
              }
          });

      case types.GAME_SEARCH_RESET_SUCCESS:
          console.log("GAME_SEARCH_RESET_SUCCESS")
          return update(state, {
              searchList: {
                  status: { $set: 'INIT' },
                  data: { $set: [] },
                  isLast: { $set: false }
              }
          });

//my List
          case types.MY_GAME:
              return update(state, {
                  myList: {
                      status: { $set: 'WAITING' },
                  }
              });

          case types.MY_GAME_SUCCESS:
              console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                return update(state, {
                    myList: {
                        status: { $set: 'SUCCESS' },
                        data: { $push: action.data },
                        isLast: { $set: action.data.length < 6 }
                    }
                });

          case types.MY_GAME_FAILURE:
              return update(state, {
                  myList: {
                      status: { $set: 'FAILURE' }
                  }
              });

          case types.MY_GAME_RESET_SUCCESS:
              return update(state, {
                  myList: {
                      status: { $set: 'INIT' },
                      data: { $set: [] },
                      isLast: { $set: false }
                  }
              });

        default:
            return state;
    }
}
