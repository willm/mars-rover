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

const lostConditions = [
    function lostEast(topRightBoundery:p.Cooridnate, finalCoordinate:p.Cooridnate) {
        return finalCoordinate.x > topRightBoundery.x;
    },
    function lostNorth(topRightBoundery:p.Cooridnate, finalCoordinate:p.Cooridnate) {
        return finalCoordinate.y > topRightBoundery.y;
    },
    function lostSouth(topRightBoundery:p.Cooridnate, finalCoordinate:p.Cooridnate) {
        return finalCoordinate.y < 0;
    },
    function lostWest(topRightBoundery:p.Cooridnate, finalCoordinate:p.Cooridnate) {
        return finalCoordinate.x < 0;
    }
];

function move (topRightBoundery:p.Cooridnate, startingPosition:p.Position, instructions: Array<i.Instruction>): FinalSpot {
    let finalCoordinate:p.Position = instructions.reduce((position, instruction) => {
        return position.orientation.forward(position);
    }, startingPosition);
    return {
        cooridnate: {
            x: Math.max(0, Math.min(finalCoordinate.x, topRightBoundery.x)),
            y: Math.max(0, Math.min(finalCoordinate.y, topRightBoundery.y)),
            orientation: finalCoordinate.orientation
        },
        lost: lostConditions.some(isLost => {return isLost(topRightBoundery, finalCoordinate)})
    };
}

export function createWorld (topRightBoundery:p.Cooridnate): World {
    return {
        robot: createRobot.bind(null, topRightBoundery)
    };
}