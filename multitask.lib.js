const { spawn } = require("child_process");
let monitor = [];

if (!process.stdout) {
  process.stdout = {
    rows: 40,
    columns: 80,
    write: console.log,
  };
}

/*
 * Create Process
 * createProcess(command, args, options)
 * command <string>: The command to run.
 * args: <array>: List of string arguments.
 * options <Object>: https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
 */
function createProcess(p, a, o) {
  let l = monitor.length;
  let Spawn = spawn(p, a, o);
  let promise = new Promise((res) => {
    monitor[l] = [];
    Spawn.stdout.on("data", (data) => {
      if (!monitor[l]) return;
      monitor[l].push(data);
      print();
    });

    Spawn.stderr.on("data", (data) => Spawn.stdout.emit("data", data));
    Spawn.on("exit", (c) => {
      monitor = monitor.filter((i) => i != monitor[l]);
      res(c, Spawn);
    });
  });

  print();

  promise.spawn = Spawn;
  return promise;
}

// Generate Bars like
// ___________________

/*
 * bar(length, bar)
 * length <Number>: Length of bar that should be generated
 * ar <string>: Bar symbols (Default: "_")
 */
function bar(l, b) {
  let bars = "";
  while (bars.length < (l || process.stdout.columns)) {
    bars += b || "_";
  }
  return bars;
}

function print() {
  monitor.forEach((screen, index) => {
    if (screen.length > process.stdout.rows / monitor.length) {
      monitor[index] = monitor[index].slice(1);
    }
  });

  let co = monitor.filter((s) => s.length).map((s) => s.join(""));

  console.clear();
  process.stdout.write(co.join(bar()));
}

createProcess.bar = bar;
module.exports = createProcess;
