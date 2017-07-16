import React from 'react';

import ReatingUI from 'react-rating';
import Parse from 'parse';

const SVGIcon_empty = (props) =>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="#fffde7" stroke="#ffb300" strokeWidth="1.5" width="26" height="26" viewBox="0 0 24 24"   ><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
  </div>;

const SVGIcon_full = (props) =>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffb300" stroke="#ffb300" strokeWidth="1.5" width="26" height="26" viewBox="0 0 24 24"   ><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
  </div>;



class MyGameCard extends React.Component {

    constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);

            this.state = {
              displatStar: this.props.data.mystar
            };
            this.handleRatingHover = this.handleRatingHover.bind(this);
        }

    handleRatingHover(rate: ?number) {
      console.log("handleRatingHover setstate!!")
      console.log(this.state)
      this.setState({
        displatStar: rate,
      });
    }

    handleChange(score){
      this.props.onChange(this.props.data._id, score, this.props.data.index)
    }


    render() {


      const MyGameCardView = (
        <div className="row white z-depth-1 ca">
            <img src={"http://localhost:4000/img/"+this.props.data.img_url} height="80" width="auto" className="col no"/>
            <div id="marg">
              <span className="flow-text col m6 mo">{this.props.data.korean_title}</span>
              <ReatingUI className="col m6"
                empty={<SVGIcon_empty href="#icon-star-empty" className="icon" />}
                full={<SVGIcon_full href="#icon-star-empty" className="icon" />}
                onChange={this.handleChange}
                onClick={this.handleRatingHover}
                initialRate={this.state.displatStar}
              />
            </div>
        </div>
      );

        return (
          <div>
              {MyGameCardView}
          </div>

        );
    }
}

MyGameCard.propTypes = {
    data: React.PropTypes.object,
    onChange: React.PropTypes.func
};

MyGameCard.defaultProps = {
    data: {},
    onChange: (game, score, index) => { console.error("onChange not defined"); },
}

export default MyGameCard;
