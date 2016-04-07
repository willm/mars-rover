/// <reference path="../../typings/main.d.ts"/>
'use strict';

import p = require('../positions');
import i = require('../instructions');
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

interface GameRun {
    startingPosition: p.Position,
    topRightBoundery: p.Cooridnate,
    instructions: Array<i.Instruction>
}

test('Parses a one robot script', (assert) => {
    const script = ['5 3', '1 1 E', 'FF'].join(lineBreak);
    const gameRun = inputParser(script);
    assert.deepEqual(gameRun.topRightBoundery, {x: 5, y: 3});
    assert.equal(gameRun.startingPosition.x, 1);
    assert.equal(gameRun.startingPosition.y, 1);
    assert.equal(gameRun.startingPosition.orientation.command, 'E');
    assert.deepEqual(gameRun.instructions, [
        i.Instructions.Forward,
        i.Instructions.Forward
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
        i.Instructions.Forward
    ]);
    assert.end();
});
