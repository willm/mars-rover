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

export function createWorld (topRightBoundery:p.Cooridnate): World {
    return {
        robot: function (startingPosition:p.Position) {
            return {
                move: function move (instructions: Array<i.Instruction>): FinalSpot {
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
        }
    }
}
