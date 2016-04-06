/// <reference path="../../typings/main.d.ts"/>
'use strict';

import test = require('tape');
import mr = require('../mars-rover');

test('A robot with no instructions remains at the start position', (assert) => {
    const move = mr.createWorld({ x:0, y:0, orientation: mr.Orientations.North});
    const finalPosition = move([]);
    checkPosition(assert, {x: 0, y:0}, finalPosition);
    assert.end();
});

test('Forward instruction moves robot forward north', (assert) => {
    const move = mr.createWorld({ x:0, y:0, orientation: mr.Orientations.North});
    const finalPosition = move([mr.Instruction.Forward]);
    checkPosition(assert, {x: 0, y:1}, finalPosition);
    assert.end();
});

test('Forward instruction moves robot forward south', (assert) => {
    const move = mr.createWorld({ x:0, y:1, orientation: mr.Orientations.South});
    const finalPosition = move([mr.Instruction.Forward]);
    checkPosition(assert, {x: 0, y:0}, finalPosition);
    assert.end();
});

test('Forward instruction moves robot forward east', (assert) => {
    const move = mr.createWorld({ x:0, y:0, orientation: mr.Orientations.East});
    const finalPosition = move([mr.Instruction.Forward]);
    checkPosition(assert, {x: 1, y:0}, finalPosition);
    assert.end();
});

function checkPosition (assert:test.Test, expected:mr.Cooridnate, actual:mr.Cooridnate) {
    assert.equal(expected.x, actual.x);
    assert.equal(expected.y, actual.y);
}
