#!/usr/bin/env node
'use strict';

// do `node split` in the src folder to save all the data from the commands.json and events.json
// into `commands` and `events` back one folder.

// you must have a folders named `commands` and `events` along with the src folder

const fs = require("fs");
const path = require("path");
const sanitize = require("sanitize-filename");

console.log("\n\nConverting data from Commands and Events...\n");

let data_path = path.join(__dirname, "commands.json");
let filePath = path.normalize("../commands");
let datas = JSON.parse(fs.readFileSync(data_path, "utf8"));
let count = 0;
console.log("Attempting to save Commands from commands.json...");
datas.forEach(data =>{
    if(data && data.name) {
        try {
            count++;
            const outPath = path.join(filePath, count + "_" + sanitize(data.name) + ".json");       
            fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
            console.log(`Saved Command'${data.name}' To ${sanitize(data.name)}.json`);
        } catch (err){console.error(err)}
       
    }
});
console.log(`Saved ${(count - 1)} Commands!\n\n`);


console.log("Attempting to save Events from events.json...");
data_path = path.join(__dirname, "events.json");
datas = JSON.parse(fs.readFileSync(data_path, "utf8"));
count = 0;
datas.forEach(data =>{
    if(data && data.name) {
        try {
            count++;
            const filePath = path.normalize("../events/"+ count + "_" + sanitize(data.name) + ".json");       
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Saved Event'${data.name}' To ${sanitize(data.name)}.json`);
        } catch (err){console.error(err)}
       
    }
});
console.log(`Saved ${(count - 1)} Events!`);


