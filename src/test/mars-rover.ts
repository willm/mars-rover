/// <reference path="../../typings/main.d.ts"/>
'use strict';

import test = require('tape');

test('A robot with no instructions remains at the start position', (assert) => {
    const move = createWorld({ x:0, y:0, orientation: Orientation.North});
    const finalPosition = move([]);
    assert.equal(finalPosition.x, 0);
    assert.equal(finalPosition.y, 0);
    assert.end();
});

interface Cooridnate {
    x: number;
    y: number;
}

interface Position extends Cooridnate {
    orientation: Orientation;
}

enum Orientation {
    North,
    South,
    East,
    West
}

enum Instruction {
    Forward,
    Left,
    Right
}

function createWorld (startingPosition:Position) {
    return function move (instructions: Array<Instruction>): Cooridnate {
        return startingPosition;
    }
}
