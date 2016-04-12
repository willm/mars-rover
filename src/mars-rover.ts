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
    let finalSpot:FinalSpot = instructions.reduce((finalSpot, instruction): FinalSpot => {
        let position = finalSpot.cooridnate;
        if (finalSpot.lost) {
            return finalSpot;
        }
        if (instruction === i.Instructions.Forward) {
            position = position.orientation.forward(position);
        }
        if (instruction === i.Instructions.Right) {
            position = position.orientation.right(position);
        }
        if (instruction === i.Instructions.Left) {
            position =  position.orientation.left(position);
        }
        finalSpot.lost = lostConditions.some(isLost => {return isLost(topRightBoundery, finalSpot.cooridnate)});
        finalSpot.cooridnate.x = Math.max(0, Math.min(finalSpot.cooridnate.x, topRightBoundery.x));
        finalSpot.cooridnate.y = Math.max(0, Math.min(finalSpot.cooridnate.y, topRightBoundery.y));
        return finalSpot;

    }, { cooridnate: startingPosition, lost: false });
    return finalSpot;
}

export function createWorld (topRightBoundery:p.Cooridnate): World {
    return {
        robot: createRobot.bind(null, topRightBoundery)
    };
}
