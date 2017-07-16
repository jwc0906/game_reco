import React from 'react';

import { connect } from 'react-redux';
import { SearchList, GameFinder } from 'components';
import { gameStarRequest, gameSearchRequest, gameSearchReset } from 'actions/game';


class Finder extends React.Component {

  constructor(props) {
        super(props);

        this.state = {
            loadingState: false,
            firstUpdate: true
        };
        this.loadNewGame = this.loadNewGame.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
  }

  loadNewGame(game_name, paltform, price, year, genre) {

    console.log("start loadNewGame()")
    // CANCEL IF THERE IS A PENDING REQUEST
    if(this.props.isLast) {
        return new Promise(
            (resolve, reject)=> {
                if(this.props.isLast) {
                    Materialize.toast('You are reading the last page', 2000);
                }
                resolve();
            }
        );
    }

    // IF PAGE IS EMPTY, DO THE INITIAL LOADING
    if(this.props.searchData.length === 0 ){
      console.log("first!!")
      return this.props.gameSearchRequest(true,'createdAt', "", game_name, paltform, price, year, genre);
    }

    console.log("more!!")
    return this.props.gameSearchRequest(false, 'createdAt', this.props.searchData[this.props.searchData.length - 1].createdAt, game_name, paltform, price, year, genre).then(()=>{
    })
  }

/*

  componentDidMount() {

    console.log("component did mount------------------")

    const loadUntilScrollable = () => {
            // IF THE SCROLLBAR DOES NOT EXIST,
            if(this.props.searchData.length<7) {
                this.loadNewGame().then(
                    () => {
                        // DO THIS RECURSIVELY UNLESS IT'S LAST PAGE
                        if(!this.props.isLast) {
                            loadUntilScrollable();
                            console.log("first load")
                        }
                    }
                );
            }
        };


    loadUntilScrollable();

    $(window).scroll(() => {
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                if(!this.state.loadingState){

                    this.loadNewGame().then(()=>{
                      console.log("more load");
                      console.log("NOW ALL DATA: ");
                      console.log(this.props.searchData);

                    });

                    this.setState({
                        loadingState: true
                    });


                }
            } else {
                if(this.state.loadingState){
                    this.setState({
                        loadingState: false
                    });
                }
            }
        });
  }

*/

  componentWillUnmount () {
    // REMOVE WINDOWS SCROLL LISTENER
    $(window).unbind();
    this.props.gameSearchReset();
}


// isInitial, order, last_value
handleSearch(game_name, paltform, price, year, genre) {

  $(window).unbind();
  this.props.gameSearchReset();
/*
  if(this.props.status=="INIT"){
    console.log("search status: INIT");
    var isInitial=true;
    var order='createdAt';
    var last_value=""
  }
*/

const loadUntilScrollable = () => {
        // IF THE SCROLLBAR DOES NOT EXIST,
        if(this.props.searchData.length<7) {
            this.loadNewGame(game_name, paltform, price, year, genre).then(
                () => {
                    // DO THIS RECURSIVELY UNLESS IT'S LAST PAGE
                    if(!this.props.isLast) {
                        loadUntilScrollable();
                        console.log("first load")
                    }
                }
            );
        }
    };


loadUntilScrollable();

$(window).scroll(() => {
        // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
        if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
            if(!this.state.loadingState){

                this.loadNewGame(game_name, paltform, price, year, genre).then(()=>{
                  console.log("more load");
                  console.log("NOW ALL DATA: ");
                  console.log(this.props.searchData);

                });

                this.setState({
                    loadingState: true
                });


            }
        } else {
            if(this.state.loadingState){
                this.setState({
                    loadingState: false
                });
            }
        }
    });







    /*
    return this.props.gameSearchRequest(isInitial, order, last_value, game_name, paltform, price, year, genre).then(
        () => {
            if(this.props.status === "FAILURE") {
                Materialize.toast('Search false!!', 2000);
                return false;
            }


        }
    ).catch(function (reason) {
        Materialize.toast(reason.message, 3000);
      }
    )
    */
}

    render() {
        return (
            <div className="row">
              <GameFinder onSearch={this.handleSearch}/>

              <SearchList
              data={this.props.searchData}
              currentUser={this.props.currentUser}
              onChange={this.props.gameStarRequest}
              />

            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.status.currentUser,
        searchData: state.game.searchList.data,
        isLast: state.game.searchList.isLast,
        status: state.game.searchList.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        gameSearchRequest: (isInitial, order, last_value, game_name, paltform, price, year, genre) => {
            return dispatch(gameSearchRequest(isInitial, order, last_value, game_name, paltform, price, year, genre));
        },
        gameStarRequest: (game, score, index)=>{
            return dispatch(gameStarRequest(game, score, index));
        },
        gameSearchReset: ()=>{
          return dispatch(gameSearchReset());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finder);
