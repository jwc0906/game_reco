import React from 'react';
import { connect } from 'react-redux';
import { MyGameList } from 'components';

import { myGameRequest, gameStarRequest, myGameReset } from 'actions/game';

class MyPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingState: false,
            firstUpdate: true
        };
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
        return this.props.myGameRequest(true,'createdAt');
      }

      console.log("more!!")
      return this.props.myGameRequest(false, 'createdAt', this.props.gameData[this.props.gameData.length - 1].createdAt).then(()=>{
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
      this.props.myGameReset();
  }


    render() {
        return (
            <div className="container">
                <MyGameList
                  data={this.props.gameData}
                  onChange={this.props.gameStarRequest}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gameData: state.game.myList.data,
        isLast: state.game.myList.isLast
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        myGameRequest: (isInitial, order, last_value) => {
            return dispatch(myGameRequest(isInitial, order, last_value));
        },
        gameStarRequest: (game, score, index)=>{
            return dispatch(gameStarRequest(game, score, index));
        },
        myGameReset: ()=>{
            return dispatch(myGameReset());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
