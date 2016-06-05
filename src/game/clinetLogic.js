/**
 * 客户端业务
 */
import * as _ from 'underscore'
import  socket from './socket'
import * as actions from '../constants/socket'
import { RANDOM_NAMES } from '../constants/game'


/*
socket.on(actions.MSG_BIRTH, function(data){
	// 实例当前蛇的初始化状态，如果已存在，则覆盖

})

socket.on(actions.MSG_DEAD, function(data){
	// 通知当前蛇死亡
})
*/
const gameLogic = {

	data: {
		socketId: '',
		user: {}
	},

	test(){
		socket.send('my other event', 'test hello 1')
	},

	init(actions){		
		this.syncSankesState(actions.syncSnakes)
		this.syncFoodsState(actions.syncFoods)

		var username = this.setUserName()

		this.join(username)
	},

	setUserName(){
		// return 'victor'
		// return prompt('填上你的昵称~')
		
		return _.sample(RANDOM_NAMES)
	},

	// 加入游戏
	join(name){
		socket.send(actions.ACTION_JOIN, { name })
	},

	move(){
		socket.send(actions.ACTION_MOVE)
	},
	turnLeft(){
		socket.send(actions.ACTION_TURN_LEFT)
	},
	turnRight(){
		socket.send(actions.ACTION_TURN_RIGHT)	
	},

	// 全部snake的状态，用于绘制所有的蛇
	syncSankesState(syncSnakesAction) {
		socket.on(actions.MSG_ALL_STATUS, function(data){
			
			// console.log('server sync snakes')
			// console.log(data)

			syncSnakesAction(data)
		})
	},

	syncFoodsState(syncFoodsAction){
		socket.on(actions.MSG_FOODS_STATUS, function(data){

			// console.log('server sync foods')
			// console.log(data)

			syncFoodsAction(data)
		})
	}

}

export default gameLogic