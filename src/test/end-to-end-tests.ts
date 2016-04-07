/// <reference path="../../typings/main.d.ts"/>
'use strict';

import test = require('tape');
import cp = require('child_process');
import fs = require('fs');
const exec = cp.exec;

test('A simple robot journey is reported', (assert) => {
    exec('npm start src/test/input.txt', (err, stdout, stderr) => {
        assert.notOk(err);
        const expected = `3 1 E\n`;
        assert.equal(stdout, expected);
        assert.end();
    });
});
