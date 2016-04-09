#!/usr/bin/node
/// <reference path="../typings/main.d.ts"/>
'use strict';
import inputParser = require('./input-parser');
import mr = require('./mars-rover');
import fs = require('fs');

const filePath = process.argv[2];
const fileContent = fs.readFileSync(filePath, 'utf-8');
const gameMove = inputParser(fileContent);
const finalSpot = mr.createWorld(gameMove.topRightBoundery)
    .robot(gameMove.startingPosition)
    .move(gameMove.instructions);

console.log(buildOutput(finalSpot));

function buildOutput(finalSpot:mr.FinalSpot): string {
    let output = finalSpot.cooridnate.x.toString() +
        ' ' +
        finalSpot.cooridnate.y.toString() +
        ' ' +
        finalSpot.cooridnate.orientation.command;
    return finalSpot.lost ? output += ' LOST' : output;
}
