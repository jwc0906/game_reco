import React from 'react';

import { connect } from 'react-redux';
import { GameList } from 'components';
import { gameListRequest, gameStarRequest, gameListReset } from 'actions/game';


class Rating extends React.Component {

  constructor(props) {
        super(props);

        this.state = {
            loadingState: false,
            firstUpdate: true
        };
        this.loadNewGame = this.loadNewGame.bind(this);
  }

  loadNewGame() {

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
    if(this.props.gameData.length === 0 ){
      console.log("first!!")
      return this.props.gameListRequest(true,'createdAt');
    }

    console.log("more!!")
    return this.props.gameListRequest(false, 'createdAt', this.props.gameData[this.props.gameData.length - 1].createdAt).then(()=>{
    })
  }



  componentDidMount() {

    console.log("component did mount------------------")

    const loadUntilScrollable = () => {
            // IF THE SCROLLBAR DOES NOT EXIST,
            if($("body").height() < $(window).height()) {
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
                      console.log(this.props.gameData);

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


  componentWillUnmount () {
    // REMOVE WINDOWS SCROLL LISTENER
    $(window).unbind();
    this.props.gameListReset();
}


    render() {
        return (
            <div className="container">
              <GameList
              data={this.props.gameData}
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
        gameData: state.game.list.data,
        isLast: state.game.list.isLast
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        gameListRequest: (isInitial, order, last_value, username) => {
            return dispatch(gameListRequest(isInitial, order, last_value, username));
        },
        gameStarRequest: (game, score, index)=>{
            return dispatch(gameStarRequest(game, score, index));
        },
        gameListReset: ()=>{
            return dispatch(gameListReset());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
