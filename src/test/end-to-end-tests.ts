/// <reference path="../../typings/main.d.ts"/>
'use strict';

import test = require('tape');
import cp = require('child_process');
import fs = require('fs');
const exec = cp.exec;

test('A simple robot journey is reported', (assert) => {
    exec('build/index.js src/test/test-scripts/input.txt', (err, stdout, stderr) => {
        assert.notOk(err);
        const expected = `3 1 E\n`;
        assert.equal(stdout, expected);
        assert.end();
    });
});

test('A robot lost too far east', (assert) => {
    exec('build/index.js src/test/test-scripts/lost-robot.txt', (err, stdout, stderr) => {
        assert.notOk(err);
        const expected = `3 0 E LOST\n`;
        assert.equal(stdout, expected);
        assert.end();
    });
});
