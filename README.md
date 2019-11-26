# Root Code Challenge

_Clean code is key_

Track driver history with `Node.js` / `JavaScript`.

I haven't had much practice with processing files, so I don't know which way is preferred in Node. This works, but may not be best practice. Here's the docs on Node's
[File System - readFileSync][node-fs]

[node-fs]: https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options

## Running the program

Use this in the command line with the command:
```
node main './path/to/your/file'
```

## Reasoning
Initially, I had the code in one function, but read that it should not be confined to just one. I moved some utility functions outside of the bulk of code. These functions could possibly be used again as the application grows.

I made sure this worked with edge cases in my input file, but didn't write a whole test suite. Tests can be written in Mocha, but I thought could be expanded on later.

The main functionality lives in `generateDriverHistory()`. As it iterates through each line, it removes the command and the driver from the line and stores them in separate variables. I built this program with the ability to grow with commands.

There are many conditionals set up throughout. There are also error cases that may be handled in the future. Right now, the output is in the console and the original file remains the same.

