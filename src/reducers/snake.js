import * as types from '../actions/const'
import * as DIRECTION from '../constants/direction'
import * as GAME_CONFIG from '../constants/game'

class Joints {
    constructor(left, top, width, height, direction, isHead = false){
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        this.direction = direction
        this.isHead = isHead
    }
}

var defaultState = (function() {

    var head = new Joints(100, 100, GAME_CONFIG.JOINTS_WIDTH, GAME_CONFIG.JOINTS_HEIGHT, DIRECTION.LEFT, true)
	var speed = GAME_CONFIG.SNAKE_SPEED // 每秒走几个格子
    var count = GAME_CONFIG.DEFAULT_JOINTS_COUNT
	var jointses = []

	for(var i=0; i<count; i++){

		var joints = Object.assign({}, head, {
			left: head.left + (GAME_CONFIG.TILE_WIDTH * i),
			top: head.top,
			direction: DIRECTION.LEFT
		});

        if(i>0) joints.isHead = false
		
		jointses.push(joints)
	}

    return {
        jointses: jointses, // 每个关节的数据
        speed: speed
    }
})()

export default function snakeReducer(state = defaultState, action) {

    switch (action.type) {
    	case types.TURN_LEFT:
    		var newState = Object.assign({}, state) // 新完整蛇数据    		
    		var head = newState.jointses[0];

    		if(head.direction == DIRECTION.TOP)
    			head.direction = DIRECTION.LEFT
    		else if(head.direction == DIRECTION.LEFT)
    			head.direction = DIRECTION.BOTTOM
    		else if(head.direction == DIRECTION.BOTTOM)
    			head.direction = DIRECTION.RIGHT
    		else if(head.direction == DIRECTION.RIGHT)
    			head.direction = DIRECTION.TOP   		

            return newState

        case types.TURN_RIGHT:

        	var newState = Object.assign({}, state) // 新完整蛇数据
        	var head = newState.jointses[0];

        	if(head.direction == DIRECTION.TOP)
        		head.direction = DIRECTION.RIGHT
        	else if(head.direction == DIRECTION.RIGHT)
        		head.direction = DIRECTION.BOTTOM
        	else if(head.direction == DIRECTION.BOTTOM)
        		head.direction = DIRECTION.LEFT
        	else if(head.direction == DIRECTION.LEFT)
        		head.direction = DIRECTION.TOP

            return newState
        
    	case types.MOVE:

        	var newState = Object.assign({}, state) // 新完整蛇数据
        	var head = Object.assign({}, newState.jointses[0]); // 新蛇头数据

        	// 向左移动
        	if(head.direction == DIRECTION.LEFT){
        		head.left -= GAME_CONFIG.TILE_WIDTH
        	}

        	// 向右移动
        	if(head.direction == DIRECTION.RIGHT){
        		head.left += GAME_CONFIG.TILE_WIDTH
        	}

        	// 向上移动
        	if(head.direction == DIRECTION.TOP){
        		head.top -= GAME_CONFIG.TILE_HEIGHT
        	}

        	// 向下移动
        	if(head.direction == DIRECTION.BOTTOM){
        		head.top += GAME_CONFIG.TILE_HEIGHT
        	}



        	var lastJoints = null
        	newState.jointses = newState.jointses.map(function(joints){
        		if(!lastJoints){
        			// 头    				
        			lastJoints = Object.assign({}, joints)
        			joints = head;
        		}else{
        			// 其余节
        			var tpmJoints = Object.assign({}, joints)
        			joints.left = lastJoints.left
        			joints.top = lastJoints.top
        			joints.direction = lastJoints.direction
        			lastJoints = tpmJoints
        		}        			
        		return joints
        	})

            return newState

        case types.EAT_FOOD:
            const newState = Object.assign({}, state) // 新完整蛇数据

            const food = action.data.food
            const lastSnakeLastJointsPos = action.data.lastSnakeLastJointsPos
            newState.jointses.push(new Joints(lastSnakeLastJointsPos.left, lastSnakeLastJointsPos.top, GAME_CONFIG.JOINTS_WIDTH, GAME_CONFIG.JOINTS_HEIGHT, DIRECTION.LEFT, false))
            
            return newState

        default:
            return state
    }
}
