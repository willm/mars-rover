/// <reference path="../../typings/main.d.ts"/>
'use strict';

import test = require('tape');
import mr = require('../mars-rover');
const upperRightBoundery = { x:1, y: 1};

test('A robot with no instructions remains at the start position', (assert) => {
    const move = mr.createWorld({ x:0, y:0, orientation: mr.Orientations.North}, upperRightBoundery);
    const finalPosition = move([]);
    checkPosition(assert, {cooridnate: {x: 0, y:0}, lost: false}, finalPosition);
    assert.end();
});

test('Forward instruction moves robot forward north', (assert) => {
    const move = mr.createWorld({ x:0, y:0, orientation: mr.Orientations.North}, upperRightBoundery);
    const finalPosition = move([mr.Instructions.Forward]);
    checkPosition(assert, {cooridnate: {x: 0, y:1}, lost: false}, finalPosition);
    assert.end();
});

test('Forward instruction moves robot forward south', (assert) => {
    const move = mr.createWorld({ x:0, y:1, orientation: mr.Orientations.South}, upperRightBoundery);
    const finalPosition = move([mr.Instructions.Forward]);
    checkPosition(assert, {cooridnate: {x: 0, y:0}, lost: false}, finalPosition);
    assert.end();
});

test('Forward instruction moves robot forward east', (assert) => {
    const move = mr.createWorld({ x:0, y:0, orientation: mr.Orientations.East}, upperRightBoundery);
    const finalPosition = move([mr.Instructions.Forward]);
    checkPosition(assert, {cooridnate: {x: 1, y:0}, lost: false}, finalPosition);
    assert.end();
});

test('Moving off the grid marks the robot as lost', (assert) => {
    const move = mr.createWorld({ x:0, y:0, orientation: mr.Orientations.East}, upperRightBoundery);
    const finalPosition = move([mr.Instructions.Forward, mr.Instructions.Forward]);
    checkPosition(assert, {cooridnate: {x: 1, y:0}, lost: true}, finalPosition);
    assert.end();
});

function checkPosition (assert:test.Test, expected:mr.FinalSpot, actual:mr.FinalSpot) {
    assert.equal(expected.cooridnate.y, actual.cooridnate.y);
    assert.equal(expected.cooridnate.x, actual.cooridnate.x);
    assert.equal(expected.lost, actual.lost);
}
