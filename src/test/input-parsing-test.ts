/// <reference path="../../typings/main.d.ts"/>
'use strict';

import p = require('../positions');
import i = require('../instructions');
import test = require('tape');
import os = require('os');
import mr = require('../mars-rover');
const lineBreak = os.EOL;
import inputParser = require('../input-parser');

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
