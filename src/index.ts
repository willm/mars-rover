#!/usr/bin/node
/// <reference path="../typings/main.d.ts"/>
'use strict';
import inputParser = require('./input-parser');
import mr = require('./mars-rover');
import fs = require('fs');

const filePath = process.argv[2];
const fileContent = fs.readFileSync(filePath, 'utf-8');
const gameMove = inputParser(fileContent);
const move = mr.createWorld(gameMove.startingPosition, gameMove.topRightBoundery);
const finalSpot = move(gameMove.instructions);
console.log(`${finalSpot.cooridnate.x} ${finalSpot.cooridnate.y} ${finalSpot.cooridnate.orientation.command}`);
