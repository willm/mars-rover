/// <reference path="../../typings/main.d.ts"/>
'use strict';

import test = require('tape');
import os = require('os');
import mr = require('../mars-rover');
const lineBreak = os.EOL;
const inputParser  = function (script:string):GameRun {
    const parts = script.split(lineBreak).map(line => { return line.split(' ')});
    const topRightBoundery = parseTopRightBoundery(parts[0]);
    const startingPosition = parseStartingPosition(parts[1]);
    const instructions = parseInstructions(parts[2]);
    return {
        startingPosition: startingPosition,
        topRightBoundery: topRightBoundery,
        instructions: instructions
    }
}//= require('../file-parser');

function parseTopRightBoundery (properties:Array<string>):mr.Cooridnate {
    return parseCordinate(properties);
}

function parseCordinate (properties:Array<string>):mr.Cooridnate {
    return { x: Number(properties[0]), y: Number(properties[1]) };
}
function parseStartingPosition (properties:Array<string>):mr.Position {
    let startingPosition:any = parseCordinate(properties);
    startingPosition.orientation = mr.Orientations.East;
    return startingPosition;
}

function parseInstructions(properties: Array<string>): Array<mr.Instruction> {
    return [mr.Instruction.Forward, mr.Instruction.Forward];
};

interface GameRun {
    startingPosition: mr.Position,
    topRightBoundery: mr.Cooridnate,
    instructions: Array<mr.Instruction>
}

test('Parses a one robot script', (assert) => {
    const script = ['5 3', '1 1 E', 'FF'].join(lineBreak);
    const gameRun = inputParser(script);
    assert.deepEqual(gameRun.topRightBoundery, {x: 5, y: 3});
    assert.deepEqual(gameRun.startingPosition, {
        x: 1,
        y: 1,
        orientation: mr.Orientations.East
    });
    assert.deepEqual(gameRun.instructions, [
        mr.Instruction.Forward,
        mr.Instruction.Forward
    ]);
    assert.end();
});
