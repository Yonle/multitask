# multitask
A simple multitask script that used for development like compile/building.

**Note: This is NOT Terminal Multiplexer**

## Installing
```sh
npm install @yonle/multitask
```
Or install as global
```sh
npm install @yonle/multitask -g
multitask
```

## CLI Usage
```sh
multitask [File(optional)]
```
By default, Multitask cli will reads a file in `Tasks.json` for Tasks list. 

Each task is written in Array format. `Tasks.json` sometime can looks like this:

```json
[
	["echo", ["Hello World"]],
	["pwd", [], {
		"cwd": "/home/username",
		"shell": true
	}]
]
```
This will result:
```
Hello World
___________________________________
/home/username
```

### API
#### `createProcess(command, args, options)`
* `command` <string>: The command to run.
* `args` <array>: List of string arguments.
* `options` <Object>: https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options

Returns `Promise`. Promise Resolve exit code of process
```
[Promise <pending>] {
	spawn: // ....
}
```

#### `bar(length, bar)`
* `length` <Number>: Length of bar that should be generated
* `bar` <string>: Bar symbols (Default: "_")

Returns `String`.
