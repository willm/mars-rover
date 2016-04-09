/// <reference path="../typings/main.d.ts"/>
'use strict';
import * as p from './positions';
import * as i from './instructions';

export interface FinalSpot {
    cooridnate:p.Position;
    lost: boolean;
}

interface Robot {
    move: (instructions: Array<i.Instruction>) => FinalSpot
}

interface World {
    robot: (startingPosition: p.Position) => Robot
}

function createRobot (topRightBoundery:p.Cooridnate, startingPosition:p.Position) {
    return {
        move: move.bind(null, topRightBoundery, startingPosition)
    };
}

function move (topRightBoundery:p.Cooridnate, startingPosition:p.Position, instructions: Array<i.Instruction>) {
    let finalCoordinate:p.Position = instructions.reduce((position, instruction) => {
        return position.orientation.forward(position);
    }, startingPosition);
    if (finalCoordinate.x > topRightBoundery.x) {
        finalCoordinate.x = topRightBoundery.x;
        return {
            cooridnate: finalCoordinate,
            lost: true
        };
    }
    if (finalCoordinate.y > topRightBoundery.y) {
        finalCoordinate.y = topRightBoundery.y;
        return {
            cooridnate: finalCoordinate,
            lost: true
        };
    }
    return {
        cooridnate: finalCoordinate,
        lost: false
    };
}

export function createWorld (topRightBoundery:p.Cooridnate): World {
    return {
        robot: createRobot.bind(null, topRightBoundery)
    };
}
