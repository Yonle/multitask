#!/usr/bin/env node
const multitask = require("./multitask.lib.js");
let tasks = require(process.argv.slice(2)[0] || process.env.HOME + "/Tasks.json");
let limit = Number(process.env.MULTITASK_LIMIT) || 4;
let curTask = 0;

function run() {
	curTask++
	if (curTask > limit) return curTask--;
	if (!tasks.length) return process.exit(0);
	let task = tasks.shift();
	if (!task) return;
	
	multitask(task[0], task[1], task[2]).then((c) => {
		curTask--
		run();
	});

	if (tasks.length !== 0) run();
}

if (tasks.length) {
	console.log(
		"Total Tasks: " + tasks.length +
		"\nEach-Task limit per run: " + limit
	);
}

run();
