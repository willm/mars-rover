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
    command: string;
}

export interface FinalSpot {
    cooridnate:Cooridnate;
    lost: boolean;
}

export const orientations = [
    {
        forward: (position:Position) => {
            position.y++;
            return position;
        },
        command: 'N'
    },
    {
        forward: (position:Position) => {
            position.y--;
            return position;
        },
        command: 'S'
    },
    {
        forward: (position:Position) => {
            position.x++;
            return position;
        },
        command: 'E'
    },
    {
        forward: (position:Position) => {
            position.x--;
            return position;
        },
        command: 'W'
    }
];

export const Orientations = {
    North: orientations[0],
    South: orientations[1],
    East: orientations[2],
    West: orientations[3]
};


export const instructions = [
    {command: 'F'},
    {command: 'L'},
    {command: 'R'}
];

export interface Instruction {
    command: string;
}

export const Instructions = {
    Forward: instructions[0],
    Left: instructions[1],
    Right: instructions[2]
}

export function createWorld (startingPosition:Position, topRightBoundery:Cooridnate) {
    return function move (instructions: Array<Instruction>): FinalSpot {
        let finalCoordinate = instructions.reduce((position, instruction) => {
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
