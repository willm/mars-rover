/// <reference path="../typings/main.d.ts"/>
'use strict';

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
