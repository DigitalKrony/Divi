const Glaze = require('./../utilities/glaze');
const { spawn } = require('node:child_process');
const pkgFile = require(`${process.cwd()}/package.json`);

const installCorepackCmd = `npm i -g corepack`;
const yarnVersionCmd = (version) =>`yarn set version ${version}`;

const installCorepack = () => {
  console.log(Glaze.yellow(`Installing Corepack...`));
  const install = spawn(`${installCorepackCmd} --color=always`, [], { stdio: 'pipe', shell: true });
  
  install.stdout.on('data', (data) => {
    console.log(`${data}`);
    packageManagerSetup();
  });

  install.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  install.on('error', (err) => {
    console.error(Glaze.red(`Failed to start child process:\n${err}`));
  });

  install.on('close', (code) => {
    if (code === 0) return;
  });

  install.on('exit', (code) => {
    if (code === 0) return;
  });
}

const packageManagerSetup = () => {
  console.log(Glaze.yellow(`Setting Yarn version...`));

  const version = pkgFile.packageManager.split('@')[1];
  const install = spawn(`${yarnVersionCmd(version)}`, [], { stdio: 'pipe', shell: true });
  
  install.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  install.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  install.on('error', (err) => {
  if (code === 0) return;
  });

  install.on('close', (code) => {
  if (code === 0) return;
  });
}

console.log(Glaze.yellow(`--- Starting Preinstall Package Manager Setup ---`));
installCorepack();