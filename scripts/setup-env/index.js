const Glaze = require("./../utilities/glaze");
const { exec, spawn } = require("node:child_process");
const pkgFile = require(`./../../package.json`);

const checkRemoteCmd = (pkg) => `npm view ${pkg} versions --json`;
const checkBaseCmd = (pkg) => `npm global list ${pkg} --depth=0 --json`;
const installBaseCmd = (pkgs) => `npm i -g ${pkgs.join(" ")}"`;
const setVersionConstraint = (version) =>
  version === "latest"
    ? "latest"
    : new RegExp(/^(\^)/, "i").test(version)
      ? "patch"
      : new RegExp(/^(~)/, "i").test(version)
        ? "minor"
        : "exact";

const dependencyMeta = {};
const packageInstallationList = [];

const buildDependencyDetails = () => {
  const globalDependencies = pkgFile.globalDependencies;

  console.log(Glaze.green("Building list of Global Dependancies..."));

  Object.keys(globalDependencies).forEach((key, i, depList) => {
    const version = globalDependencies[key];

    console.log(Glaze.yellow(`Checking ${key}...`));

    exec(checkRemoteCmd(key), (error, stdout, stderr) => {
      if (error !== null) console.error(`Error checking ${key}:`, error);

      console.log(Glaze.yellow(`Getting version list of ${key}...`));

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
  });
};

const packageVersionAssignment = () => {
  Object.keys(dependencyMeta).forEach((key, i, keys) => {
    const isLast = i === Object.keys(dependencyMeta).length - 1;
    const entry = dependencyMeta[key];

    // TODO - Handle version constraints properly. Works for now
    switch (entry.versionConstraint) {
      case "patch":
        console.log(`${key} set to ${entry.versionConstraint}`);
        packageInstallationList.push(key);
        break;
      case "minor":
        console.log(`${key} set to ${entry.versionConstraint}`);
        packageInstallationList.push(key);
        break;
      case "exact":
        console.log(`${key} set to ${entry.versionConstraint}`);
        packageInstallationList.push(key);
        break;
      case "latest":
        console.log(`${key} set to ${entry.versionConstraint}`);
        packageInstallationList.push(`${key}@latest`);
        break;
      default:
        console.error(
          `${key} does not have a restraint set, setting to 'latest'`,
        );
        packageInstallationList.push(`${key}@latest`);
        break;
    }

    if (isLast) runInstall();
  });
};

const runInstall = () => {
  if (packageInstallationList.length > 0) {
    console.log(Glaze.green("--- Running install ---"));

    console.log(packageInstallationList);

    const install = spawn(`${installBaseCmd(packageInstallationList)}`, [], {
      stdio: "pipe",
      shell: true,
    });

    install.stdout.on("data", (data) => {
      console.log(`${data}`);
    });

    install.stderr.on("data", (data) => {
      console.error(`${data}`);
    });

    install.on("error", (err) => {
      console.error(Glaze.red(`Failed to start child process:\n${err}`));
    });

    install.on("close", (code) => {
      if (code === 0) return;

      console.log(Glaze.yellow(`child process exited with code ${code}`));
    });
  } else {
    console.log("Nothing to install...");
  }
};

console.log(Glaze.green("--- Starting Global Check and Install ---"));

buildDependencyDetails();
