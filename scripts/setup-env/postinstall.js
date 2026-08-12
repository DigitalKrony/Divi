import { existsSync, cpSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { exec, spawn } from 'node:child_process';
import Glaze from '@df/glaze';

const git_url = `https://github.com/heroui-inc/heroui.git`;
const dest_dir = `third-party/heroui`;
const storybook_dir = `packages/react/src`;
const local_dir = `packages/divi-docs/src/heroui`;

const doc_package = `@divi/docs`;
const heroui_meta_cmd = `npm list @heroui/react -w ${doc_package} --depth=0 --json`;

const _cmd = (args = { cmd: '', flags: [], callback: undefined }) => {
  const { cmd, flags, callback } = args;

  const call = spawn(cmd, flags ?? [], {
    stdio: 'pipe',
    shell: true,
  });

  call.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  call.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  call.on('error', (err) => {
    console.error(Glaze.red(`Failed to start child process:\n${err}`));
  });

  call.on('close', (code) => {
    if (code === 0) {
      callback && callback();
      return;
    }

    console.log(Glaze.yellow(`child process exited with code ${code}`));
  });
};

const _git_shallow = () => {
  _cmd({
    cmd: `git clone ${git_url} ${dest_dir} --filter=blob:none --sparse`,
    callback: () => {
      _cmd({
        cmd: `git -C ${dest_dir} sparse-checkout add ${storybook_dir}`,
        callback: () => {
          _clean_local();
        },
      });
    },
  });
};

const _copy_files = () => {
  console.log(Glaze.yellow('Copying third-party files to your local directory...'));

  try {
    cpSync(resolve(dest_dir, storybook_dir), local_dir, { recursive: true });

    console.log(Glaze.green('Copy complete.'));
    _clean_third(true);

    _update_titles();
  } catch (err) {
    console.log(Glaze.red(`An error occurred while trying to copy files`, '\r\n', Glaze.yellow(err)));
  }
};

const _update_titles = () => {
  /**
   * Add Step to find/replace `title: "Components/` with `title: "HeroUI Components/`
   */
};

const _clean_third = (fin = false) => {
  const doesIt = existsSync(dest_dir);

  if (doesIt) {
    console.log(
      fin
        ? Glaze.yellow('Cleaning up...')
        : Glaze.red('Destination directory exists. Removing it to get a fresh version...')
    );

    _cmd({
      cmd: `rm -rf ${dest_dir}`,
      callback: () => {
        console.log(Glaze.green(`The destination directory, ${dest_dir}, has been removed...`));

        !fin && _git_shallow();
      },
    });
  } else {
    !fin && console.log(Glaze.blue(`The destination directory, ${dest_dir}, does not exist yet...`));
    !fin && _git_shallow();
  }
};

const _clean_local = () => {
  const doesIt = existsSync(local_dir);

  if (doesIt) {
    console.log(Glaze.red('Local Storybook files exist. Clearing out files for fresh fetch...'));

    _cmd({
      cmd: `rm -rf ${local_dir}`,
      callback: () => {
        console.log(Glaze.green(`The local directory, ${local_dir}, has been removed...`));

        _copy_files();
      },
    });
  } else {
    console.log(Glaze.blue(`The local directory, ${local_dir}, does not exist yet...`));
    _copy_files();
  }
};

console.log(Glaze.green('--- Starting HeroUI Doc Site Git Scrape ---'));

_clean_third();
