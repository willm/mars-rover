/// <reference path="../typings/main.d.ts"/>
'use strict';

export interface Cooridnate {
    x: number;
    y: number;
}

export interface Position extends Cooridnate {
    orientation: Orientation;
}

interface Orientation {
    forward: (position:Position) => Position;
}

export const Orientations = {
    North: {
        forward: (position:Position) => {
            position.y++;
            return position;
        }
    },
    South: {
        forward: (position:Position) => {
            position.y--;
            return position;
        }
    },
    East: {
        forward: (position:Position) => {
            position.x++;
            return position;
        }
    },
    West: {
        forward: (position:Position) => {
            position.x--;
            return position;
        }
    }
}

export enum Instruction {
    Forward,
    Left,
    Right
}

export function createWorld (startingPosition:Position) {
    return function move (instructions: Array<Instruction>): Cooridnate {
        return instructions.reduce((position, instruction) => {
            return position.orientation.forward(position);
        }, startingPosition);
    }
}
