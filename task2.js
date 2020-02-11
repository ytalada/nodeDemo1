const { execFile } = require('child_process');
const os = require('os');

const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log('Node Version is:', stdout);
});

console.log('Number of cores in CPU : ', os.cpus().length)