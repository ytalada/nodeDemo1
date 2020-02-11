const readline = require('readline');
const os = require('os');
const { spawn } = require('child_process');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let targetDirectory;

const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Please Enter target directory :  ', (answer) => {
            targetDirectory = answer;
            resolve();
        })
    })
};

const main = async () => {
    await question1();
    rl.close();
    let ls;
    if (os.platform() === 'win32') {
        ls = spawn('cmd', ['/c', 'dir'], {cwd:targetDirectory});
    } else {
        ls = spawn('ls', ['-lh'], {cwd:targetDirectory});
    }

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
}

main();