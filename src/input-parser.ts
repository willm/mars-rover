/// <reference path="../typings/main.d.ts"/>
'use strict';
import p = require('./positions');
import os = require('os');
const lineBreak = os.EOL;
import i = require('./instructions');
import g = require('./game-run');

export = function (script:string):g.GameRun {
    const parts = script.split(lineBreak);
    const topRightBoundery = parseTopRightBoundery(parts[0].split(' '));
    const startingPosition = parseStartingPosition(parts[1].split(' '));
    const instructions = parseInstructions(parts[2].split(''));
    return {
        startingPosition: startingPosition,
        topRightBoundery: topRightBoundery,
        instructions: instructions
    }
}

function parseTopRightBoundery (properties:Array<string>):p.Cooridnate {
    return parseCordinate(properties);
}

function parseCordinate (properties:Array<string>):p.Cooridnate {
    return { x: Number(properties[0]), y: Number(properties[1]) };
}
function parseStartingPosition (properties:Array<string>):p.Position {
    let startingPosition = <p.Position>parseCordinate(properties);
    startingPosition.orientation = p.orientations.filter(o => o.command === properties[2])[0];
    return startingPosition;
}

function parseInstructions(commands: Array<string>): Array<i.Instruction> {
    return commands
        .map((cmd) => {
            return i.instructions.filter((i) => i.command === cmd)[0];
        });
};
