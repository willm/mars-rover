/// <reference path="../typings/main.d.ts"/>
'use strict';

import i = require('./instructions');
import p = require('./positions');
export interface GameRun {
    startingPosition: p.Position,
    topRightBoundery: p.Cooridnate,
    instructions: Array<i.Instruction>
}
