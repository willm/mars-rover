/// <reference path="../typings/main.d.ts"/>
'use strict';

export interface Cooridnate {
    x: number;
    y: number;
}

export interface Position extends Cooridnate {
    orientation: Orientation;
}

export enum Orientation {
    North,
    South,
    East,
    West
}

export enum Instruction {
    Forward,
    Left,
    Right
}

export function createWorld (startingPosition:Position) {
    return function move (instructions: Array<Instruction>): Cooridnate {
        return instructions.reduce((position, instruction) => {
            if (startingPosition.orientation === Orientation.North) {
                position.y ++;
            }
            if (startingPosition.orientation === Orientation.South) {
                position.y --;
            }
            return position;
        }, startingPosition);
    }
}
