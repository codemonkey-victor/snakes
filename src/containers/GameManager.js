import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as foodActionCreator from '../actions/food'
import * as snakeActionCreator from '../actions/snake'
import * as snakesActionCreator from '../actions/snakes'

import gameClinetLogic from '../game/clinetLogic'
import gameServerLogic from '../game/serverLogic'

class GameManager extends Component { 

  constructor(props) {
    super(props);

    // console.log(this.props)
    const { actions } = this.props

    /*setTimeout(function(){
      actions.move()
    },2000)*/

    /////////////////////////////////////////////////////////////////// 已从server获得snakes的状态，下面根据状态绘制


    // this.bindKeyControl(actions);

    gameClinetLogic.init(actions)

    // gameLogic.test()
  }

  render() {
    return (
      <div className="gameManager" />
    )
  }
/*
  // 绑定键盘控制事件
  bindKeyControl(actions){
    window.addEventListener('keypress', function(e){
      // up  119
      // down 115
      // left 97
      // right 100
      if(e.keyCode == 97){
        actions.turnLeft();
      }

      if(e.keyCode == 100){
        actions.turnRight();
      }

      if(e.keyCode == 119){
        actions.move();
      }
    });
  }
*/


}


function mapStateToProps(state) {  
  const props = {
    allState: state
  };
  return props;
}
function mapDispatchToProps(dispatch) {  
  const actions = snakesActionCreator;
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(GameManager);
