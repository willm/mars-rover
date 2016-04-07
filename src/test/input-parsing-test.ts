/// <reference path="../../typings/main.d.ts"/>
'use strict';

import test = require('tape');
import os = require('os');
import mr = require('../mars-rover');
const lineBreak = os.EOL;
const inputParser  = function (script:string):GameRun {
    const parts = script.split(lineBreak);
    const topRightBoundery = parseTopRightBoundery(parts[0].split(' '));
    const startingPosition = parseStartingPosition(parts[1].split(' '));
    const instructions = parseInstructions(parts[2].split(''));
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
    let startingPosition = <mr.Position>parseCordinate(properties);
    startingPosition.orientation = mr.orientations.filter(o => o.command === properties[2])[0];
    return startingPosition;
}

function parseInstructions(commands: Array<string>): Array<mr.Instruction> {
    return commands
        .map((cmd) => {
            return mr.instructions.filter((i) => i.command === cmd)[0];
        });
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
    assert.equal(gameRun.startingPosition.x, 1);
    assert.equal(gameRun.startingPosition.y, 1);
    assert.equal(gameRun.startingPosition.orientation.command, 'E');
    assert.deepEqual(gameRun.instructions, [
        mr.Instructions.Forward,
        mr.Instructions.Forward
    ]);
    assert.end();
});

test('Parses a different one robot script', (assert) => {
    const script = ['4 2', '0 1 N', 'F'].join(lineBreak);
    const gameRun = inputParser(script);
    assert.deepEqual(gameRun.topRightBoundery, {x: 4, y: 2});
    assert.equal(gameRun.startingPosition.x, 0);
    assert.equal(gameRun.startingPosition.y, 1);
    assert.equal(gameRun.startingPosition.orientation.command, 'N');
    assert.deepEqual(gameRun.instructions, [
        mr.Instructions.Forward
    ]);
    assert.end();
});
