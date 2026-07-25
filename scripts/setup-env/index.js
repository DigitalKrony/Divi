const { exec, spawn } = require('node:child_process');
const data = require('./package.json');

const checkRemoteCmd = (package) => `npm view ${package} versions --json`;
const checkBaseCmd = (package) => `npm ls -g ${package} --depth=0 --json`;
const installBaseCmd = (packages) => `npm i -g ${packages.join(' ')}`;
const setVersionConstraint = (version) => version === 'latest' ? 'latest' : (new RegExp(/^(\^)/, 'i')).test(version) ? 'patch' : (new RegExp(/^(~)/, 'i')).test(version) ? 'minor' : 'exact';

const dependencyMeta = {};
const packageInstallationList = [];

const chalkColors = {
  standard_colors: {
    foreground: {
      'black': '\x1b[30m',
      'red': '\x1b[31m',
      'green': '\x1b[32m',
      'yellow': '\x1b[33m',
      'blue': '\x1b[34m',
      'magenta': '\x1b[35m',
      'cyan': '\x1b[36m',
      'white': '\x1b[37m'
    },
    bright_foreground: {
      'black': '\x1b[90m',
      'red': '\x1b[91m',
      'green': '\x1b[92m',
      'yellow': '\x1b[93m',
      'blue': '\x1b[94m',
      'magenta': '\x1b[95m',
      'cyan': '\x1b[96m',
      'white': '\x1b[97m'
    },
    background: {
      'black': '\x1b[40m',
      'red': '\x1b[41m',
      'green': '\x1b[42m',
      'yellow': '\x1b[43m',
      'blue': '\x1b[44m',
      'magenta': '\x1b[45m',
      'cyan': '\x1b[46m',
      'white': '\x1b[47m'
    },
    bright_background: {
      'black': '\x1b[100m',
      'red': '\x1b[101m',
      'green': '\x1b[102m',
      'yellow': '\x1b[103m',
      'blue': '\x1b[104m',
      'magenta': '\x1b[105m',
      'cyan': '\x1b[106m',
      'white': '\x1b[107m'
    },
  },
  styles: {
    'bold': '\x1b[1m',
    'dim': '\x1b[2m',
    'italic': '\x1b[3m',
    'underline': '\x1b[4m',
    'blink_slow': '\x1b[5m',
    'blink_rapid': '\x1b[6m',
    'inverse': '\x1b[7m',
    'hidden': '\x1b[8m',
    'strikethrough': '\x1b[9m',
    'reset_bold_dim': '\x1b[22m',
    'reset_italic_fraktur': '\x1b[23m',
    'reset_underline': '\x1b[24m',
    'reset_blink': '\x1b[25m',
    'reset_inverse': '\x1b[27m',
    'reset_hidden': '\x1b[28m',
    'reset_strikethrough': '\x1b[29m'
  },
  reset: '\x1b[0m',
  color_256: {
    foreground: {
      'format_string': '\x1b[38;5;{color_code}m',
      'description': 'Replace {color_code} with a number from 0 to 255. The first 16 values (0-15) correspond to the standard and bright colors. Values 16-231 are a 6x6x6 RGB cube, and 232-255 are grayscale.'
    },
    background: {
      'format_string': '\x1b[48;5;{color_code}m',
      'description': 'Replace {color_code} with a number from 0 to 255, similar to foreground.'
    }
  },
  true_color_rgb: {
    foreground: {
      'format_string': '\x1b[38;2;{r};{g};{b}m',
      'description': 'Replace {r}, {g}, and {b} with red, green, and blue values from 0 to 255.'
    },
    background: {
      'format_string': '\x1b[48;2;{r};{g};{b}m',
      'description': 'Replace {r}, {g}, and {b} with red, green, and blue values from 0 to 255.'
    }
  },
}

const miniChalk = {
  green: function (str) { return `${chalkColors.standard_colors.bright_foreground.green}${str}${chalkColors.reset}` },
  yellow: function (str) { return `${chalkColors.standard_colors.bright_foreground.yellow}${str}${chalkColors.reset}` },
  red: function (str) { return `${chalkColors.standard_colors.bright_foreground.red}${str}${chalkColors.reset}` },
}

const buildDependencyDetails = () => {
  const globalDependencies = data.globalDependencies;

  console.log(miniChalk.green('--- Starting Global Check and Install ---'));

  Object.keys(globalDependencies).forEach((key, i, depList) => {
    const version = globalDependencies[key];

    console.log(miniChalk.yellow(`Checking ${key}...`));

    exec(checkRemoteCmd(key), (error, stdout, stderr) => {
      if (error !== null) console.error(`Error checking ${key}:`, error);

      console.log(miniChalk.yellow(`Getting version list of ${key}...`));

      dependencyMeta[key] = {
        name: key,
        version: version,
        versionConstraint: setVersionConstraint(version),
        installed: false,
        available: [],
      };

      dependencyMeta[key].available = JSON.parse(stdout);

      exec(checkBaseCmd(key), (error, stdout, stderr) => {
        const isLast = i === Object.keys(dependencyMeta).length - 1;

        if (error !== null) {
          console.log(`${key} not yet installed`);
        } else {
          const value = JSON.parse(stdout);
          const { version } = value.dependencies[key];

          dependencyMeta[key].installed = version;
        }

        // If Last Item Check
        if (isLast) {
          packageVersionAssignment();
        }
      });
    });
  })
};

const packageVersionAssignment = () => {
  Object.keys(dependencyMeta).forEach((key, i, keys) => {
    const isLast = i === Object.keys(dependencyMeta).length - 1;
    const entry = dependencyMeta[key];

    switch(entry.versionConstraint) {
      case 'patch':
        console.log(`${key} set to ${entry.versionConstraint}`);
        break;
      case 'minor':
        console.log(`${key} set to ${entry.versionConstraint}`);
        break;
      case 'exact':
        console.log(`${key} set to ${entry.versionConstraint}`);
        packageInstallationList.push(packageInstallationList);
        break;
      case 'latest':
        console.log(`${key} set to ${entry.versionConstraint}`);
        packageInstallationList.push(`${key}@latest`);
        break;
      default:
        console.error(`${key} does not have a restraint set, setting to 'latest'`);
        packageInstallationList.push(`${key}@latest`);
        break;
    }

    if (isLast) runInstall();
  });
}

const runInstall = () => {
  if (packageInstallationList.length > 0) {
    console.log(miniChalk.green('--- Running install ---'));

    const install = spawn(`${installBaseCmd(packageInstallationList)} --color=always`, [], { stdio: 'pipe', shell: true });

    install.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    install.stderr.on('data', (data) => {
      console.error(`${data}`);
    });

    install.on('error', (err) => {
      console.error(miniChalk.red(`Failed to start child process:\n${err}`));
    });

    install.on('close', (code) => {
      if (code === 0) return;

      console.log(miniChalk.yellow(`child process exited with code ${code}`));
    });
  } else {
    console.log('Nothing to install...');
  }
};

buildDependencyDetails();
