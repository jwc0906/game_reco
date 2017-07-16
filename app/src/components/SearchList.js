import React from 'react';
import { GameCard } from 'components';


class SearchList extends React.Component{
    constructor(props) {
      super(props);
    }

    render() {

        const mapToComponents = data => {
            return data.map((game, i) => {

                return (
                  <div className="col m4">
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
            <div className="col m6">
              <div className="row">
              {mapToComponents(this.props.data)}
              </div>
            </div>
        );
    }
};

SearchList.propTypes = {
    data: React.PropTypes.array,
    onChange: React.PropTypes.func
};

SearchList.defaultProps = {
    data: [],
    onChange: (game, score, index) => { console.error("onChange not defined!!!!"); }
};

export default SearchList;
