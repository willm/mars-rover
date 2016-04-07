/// <reference path="../typings/main.d.ts"/>
'use strict';
import * as p from './positions';
import * as i from './instructions';

export interface FinalSpot {
    cooridnate:p.Position;
    lost: boolean;
}

export function createWorld (startingPosition:p.Position, topRightBoundery:p.Cooridnate) {
    return function move (instructions: Array<i.Instruction>): FinalSpot {
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
        return {
            cooridnate: finalCoordinate,
            lost: false
        };

    }
}
