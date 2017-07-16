
import React from 'react';
import { MyGameCard } from 'components';


class MyGameList extends React.Component{
    constructor(props) {
      super(props);
    }

    render() {

        const mapToComponents = data => {
            return data.map((game, i) => {

                return (
                  <div>
                    <MyGameCard
                      data={game}
                      onChange={this.props.onChange}
                    />
                  </div>
                );
            });
        };

        var myState=(
          <div className="card-panel up blue-grey darken-1">
            <h4 className="white-text">게임 취향통계</h4><br/>
            <p className="white-text">플레이 게임 수:</p>
            <p className="white-text">가장 많이 플레이한 장르:</p>
            <p className="white-text">가장 별점이 높은 장르:</p>
            <p className="white-text">asdf:34</p>
          </div>
        );

        return (
          <div>
            <div className="row">
              <br/>
              <div className="row">
                <div className="col m5">
                  <br/><br/><br/><br/><br/>
                  {myState}
                </div>
                <div className="col m5 offset-m1">
                  <span id="middle-title">내가해본게임</span>
                  <a className="waves-effect waves-light red lighten-2 btn dd right">최근순</a>
                  <a className="waves-effect waves-light red btn dd right">별점순</a>
                  {mapToComponents(this.props.data)}
                </div>
              </div>
            </div>
          </div>
        );
    }
};

MyGameList.propTypes = {
    data: React.PropTypes.array,
    onChange: React.PropTypes.func
};

MyGameList.defaultProps = {
    data: [],
    onChange: (game, score, index) => { console.error("onChange not defined!!!!"); }
};

export default MyGameList;
