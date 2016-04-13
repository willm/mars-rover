/// <reference path="../../typings/main.d.ts"/>
'use strict';

import test = require('tape');
import cp = require('child_process');
import fs = require('fs');
const exec = cp.exec;

test('A simple robot journey is reported', (assert) => {
    exec('node build/index.js src/test/test-scripts/input.txt', (err, stdout, stderr) => {
        assert.notOk(err);
        const expected = `3 1 E\n`;
        assert.equal(stdout, expected);
        assert.end();
    });
});

test('A lost robot', (assert) => {
    exec('node build/index.js src/test/test-scripts/lost-robot.txt', (err, stdout, stderr) => {
        assert.notOk(err);
        const expected = `3 3 N LOST\n`;
        assert.equal(stdout, expected);
        assert.end();
    });
});

test('A robot turning around', (assert) => {
    exec('node build/index.js src/test/test-scripts/turning-around.txt', (err, stdout, stderr) => {
        assert.notOk(err);
        const expected = `1 1 E\n`;
        assert.equal(stdout, expected);
        assert.end();
    });
});

test('A robot making a different journey', (assert) => {
    exec('node build/index.js src/test/test-scripts/another-journey.txt', (err, stdout, stderr) => {
        assert.notOk(err);
        const expected = `2 3 S\n`;
        assert.equal(stdout, expected);
        assert.end();
    });
});
