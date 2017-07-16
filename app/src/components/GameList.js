import React from 'react';
import { GameCard } from 'components';


class GameList extends React.Component{
    constructor(props) {
      super(props);
    }

    render() {

        const mapToComponents = data => {
            return data.map((game, i) => {

                return (
                  <div className="col m3">
                    <GameCard
                      data={game}
                      key={game._id}
                      index={i}
                      onChange={this.props.onChange}
                    />
                  </div>
                );
            });
        };
        return (
            <div className="col m7">
              <div className="row">
              {mapToComponents(this.props.data)}
              </div>
            </div>
        );
    }
};

GameList.propTypes = {
    data: React.PropTypes.array,
    onChange: React.PropTypes.func
};

GameList.defaultProps = {
    data: [],
    onChange: (game, score, index) => { console.error("onChange not defined!!!!"); }
};

export default GameList;
