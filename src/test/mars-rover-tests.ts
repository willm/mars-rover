/// <reference path="../../typings/main.d.ts"/>
'use strict';

import test = require('tape');
import mr = require('../mars-rover');

test('A robot with no instructions remains at the start position', (assert) => {
    const move = mr.createWorld({ x:0, y:0, orientation: mr.Orientation.North});
    const finalPosition = move([]);
    assert.equal(finalPosition.x, 0);
    assert.equal(finalPosition.y, 0);
    assert.end();
});

test('Forward instruction moves robot forward north', (assert) => {
    const move = mr.createWorld({ x:0, y:0, orientation: mr.Orientation.North});
    const finalPosition = move([mr.Instruction.Forward]);
    assert.equal(finalPosition.x, 0);
    assert.equal(finalPosition.y, 1);
    assert.end();
});
