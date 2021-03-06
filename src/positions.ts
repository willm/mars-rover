/// <reference path="../typings/main.d.ts"/>
'use strict';

export interface Orientation {
    forward: (position:Position) => Position;
    right:  (position:Position) => Position;
    left:  (position:Position) => Position;
    command: string;
};

export interface Cooridnate {
    x: number;
    y: number;
}

export interface Position extends Cooridnate {
    orientation: Orientation;
}

export const orientations = [
    {
        forward: (position:Position) => {
            position.y++;
            return position;
        },
        right: (position:Position) => {
            position.orientation = Orientations.East;
            return position;
        },
        left: (position:Position) => {
            position.orientation = Orientations.West;
            return position;
        },
        command: 'N'
    },
    {
        forward: (position:Position) => {
            position.y--;
            return position;
        },
        right: (position:Position) => {
            position.orientation = Orientations.West;
            return position;
        },
        left: (position:Position) => {
            position.orientation = Orientations.East;
            return position;
        },
        command: 'S'
    },
    {
        forward: (position:Position) => {
            position.x++;
            return position;
        },
        right: (position:Position) => {
            position.orientation = Orientations.South;
            return position;
        },
        left: (position:Position) => {
            position.orientation = Orientations.North;
            return position;
        },
        command: 'E'
    },
    {
        forward: (position:Position) => {
            position.x--;
            return position;
        },
        left: (position:Position) => {
            position.orientation = Orientations.South;
            return position;
        },
        right: (position:Position) => {
            position.orientation = Orientations.North;
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
