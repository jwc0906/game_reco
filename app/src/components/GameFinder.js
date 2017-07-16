import React from 'react';

class GameFinder extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        game_name: "",
        platform1: false,
        platform2: false,
        price1: false,
        price2: false,
        price3: false,
        start_year: 1900,
        last_year: 2017,
        genre1: false, genre2: false ,genre3: false, genre4: false,
        genre5: false, genre6: false, genre7: false, genre8: false,
        genre9: false, genre10: false, genre11: false, genre12: false,
        genre13: false, genre14: false, genre15: false, genre16: false,
        genre17: false, genre18: false, genre19: false, genre20: false,
        genre21: false, genre22: false, genre23: false, genre24: false,
        genre25: false, genre26: false, genre27: false, genre28: false,
        genre29: false
      }
      this.valueHandleChange = this.valueHandleChange.bind(this);
      this.booleanHandleChange = this.booleanHandleChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }
    valueHandleChange(e) {
        let nextState = {};
        nextState[e.target.id] = e.target.value;
        this.setState(nextState);
        console.log(this.state)
    }
    booleanHandleChange(e) {
      let nextState = {};
      if(e.target.value=="false"){
        nextState[e.target.id] = true
      }
      else if(e.target.value=="true"){
        nextState[e.target.id] = false
      }

      console.log(nextState)
      this.setState(nextState);
      console.log(this.state)
    }

    handleSearch(){
      let game_name=this.state.game_name;
      let paltform=[this.state.platform1, this.state.platform2]
      let price=[this.state.price1, this.state.price2, this.state.price3]
      let year=[this.state.start_year, this.state.last_year]
      let genre=[
        this.state.genre1, this.state.genre2, this.state.genre3, this.state.genre4,
        this.state.genre5, this.state.genre6, this.state.genre7, this.state.genre8,
        this.state.genre9, this.state.genre10, this.state.genre11, this.state.genre12,
        this.state.genre13, this.state.genre14, this.state.genre15, this.state.genre16,
        this.state.genre17, this.state.genre18, this.state.genre19, this.state.genre20,
        this.state.genre21, this.state.genre22, this.state.genre23, this.state.genre24,
        this.state.genre25, this.state.genre26, this.state.genre27, this.state.genre28,
        this.state.genre29]

      this.props.onSearch(game_name, paltform, price, year, genre).then(
        (success)=>{
          if (!success){
            this.setState({
              game_name: "",
              platform1: false,
              platform2: false,
              price1: false,
              price2: false,
              price3: false,
              start_year: 1900,
              last_year: 2017,
              genre1: false, genre2: false ,genre3: false, genre4: false,
              genre5: false, genre6: false, genre7: false, genre8: false,
              genre9: false, genre10: false, genre11: false, genre12: false,
              genre13: false, genre14: false, genre15: false, genre16: false,
              genre17: false, genre18: false, genre19: false, genre20: false,
              genre21: false, genre22: false, genre23: false, genre24: false,
              genre25: false, genre26: false, genre27: false, genre28: false,
              genre29: false
            })
          }
        }
      )


    }



    render() {

      const sideNav=(
        <div className="col m4">


        <div className="card" id="sidenav">
        <div className="input-field col s12">
          <input id="game_name" type="text" className="validate" value={this.state.game_name} onChange={this.valueHandleChange}/>
          <label htmlFor="game_name">게임 이름</label>
        </div>

        <table>
                <tbody>

                  <tr className="blue lighten-5">
                    <td className="">
                      플랫폼
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="platform1" value={this.state.platform1} onChange={this.booleanHandleChange}/>
                      <label htmlFor="platform1">PC</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="platform2" value={this.state.platform2} onChange={this.booleanHandleChange}/>
                      <label htmlFor="platform2">콘솔</label>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                  </tr>

                  <tr className="blue lighten-5">
                    <td>
                      가격정책
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="price1" value={this.state.price1} onChange={this.booleanHandleChange}/>
                      <label htmlFor="price1">패키지</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="price2" value={this.state.price2} onChange={this.booleanHandleChange}/>
                      <label htmlFor="price2">부분유료화</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="price3" value={this.state.price3} onChange={this.booleanHandleChange}/>
                      <label htmlFor="price3">정액제</label>
                    </td>
                    <td>
                    </td>
                  </tr>

                  <tr className="blue lighten-5">
                    <td>
                      출시년도
                    </td>
                    <td>
                      시작
                    </td>
                    <td>
                      <p className="range-field">
                        <input type="range" id="start_year" min="1900" max="2017" value={this.state.start_year} onChange={this.valueHandleChange}/>
                      </p>
                    </td>
                    <td>
                      끝
                    </td>
                    <td>
                      <p className="range-field">
                        <input type="range" id="last_year" min="1900" max="2017" value={this.state.last_year} onChange={this.valueHandleChange}/>
                      </p>
                    </td>

                  </tr>

                  <tr className="yellow lighten-5">
                    <td>
                      장르
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre1" value={this.state.genre1} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre1">시뮬레이션</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre2" value={this.state.genre2} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre2">액션</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre3" value={this.state.genre3} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre3">슈팅</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre4" value={this.state.genre4} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre4">RPG</label>
                    </td>

                  </tr>

                  <tr className="yellow lighten-5">
                    <td>

                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre5" value={this.state.genr5} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre5">AOS</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre6" value={this.state.genre6} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre6">RTS</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre7" value={this.state.genre7} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre7">FPS</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre8" value={this.state.genre8} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre8">TPS</label>
                    </td>
                  </tr>

                  <tr className="yellow lighten-5">
                    <td>

                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre9" value={this.state.genre9} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre9">탄막슈팅</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre10" value={this.state.genre10} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre10">샌드박스</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre11" value={this.state.genre11} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre11">스포츠</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre12" value={this.state.genre12} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre12">레이싱</label>
                    </td>
                  </tr>

                  <tr className="yellow lighten-5">
                    <td>

                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre13" value={this.state.genre13} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre13">아케이드</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre14" value={this.state.genre14} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre14">어드밴쳐</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre15" value={this.state.genre15} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre15">로그라이크</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre16" value={this.state.genre16} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre16">리듬</label>
                    </td>
                  </tr>

                  <tr className="yellow lighten-5">
                    <td>

                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre17" value={this.state.genre17} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre17">플랫포머</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre18" value={this.state.genre18} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre18">디펜스</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre19" value={this.state.genre19} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre19">퍼즐</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre20" value={this.state.genre20} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre20">보드</label>
                    </td>
                  </tr>

                  <tr className="yellow lighten-5">
                    <td>

                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre21" value={this.state.genre21} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre21">웹</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre22" value={this.state.genre22} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre22">TCG</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre23" value={this.state.genre23} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre23">생존</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre24" value={this.state.genre24} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre24">호러</label>
                    </td>
                  </tr>

                  <tr className="yellow lighten-5">
                    <td>

                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre25" value={this.state.genre25} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre25">캐쥬얼</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre26" value={this.state.genre26} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre26">경영</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre27" value={this.state.genre27} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre27">대전</label>
                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre28" value={this.state.genre28} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre28">잠입</label>
                    </td>
                  </tr>

                  <tr className="yellow lighten-5">
                    <td>

                    </td>
                    <td>
                      <input type="checkbox" className="filled-in" id="genre29" value={this.state.genre29} onChange={this.booleanHandleChange}/>
                      <label htmlFor="genre29">전략</label>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                  </tr>

                </tbody>
              </table>
        </div>
        <a onClick={this.handleSearch}
          className="waves-effect waves-light btn col s4 offset-s8">검색</a>
      </div>




      );


        return (
            <div>
            <form action="#">
              {sideNav}

            </form>
            </div>


        );

    }
};

GameFinder.propTypes = {
    onSearch: React.PropTypes.func
};

GameFinder.defaultProps = {
    onSearch: (game_name, paltform, price, year, genre) => { console.error("onSearch not defined"); }
};



export default GameFinder;
