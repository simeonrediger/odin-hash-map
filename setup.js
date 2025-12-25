const devDependencies = ['eslint', '@eslint/js', 'globals'];

const exactDevDependencies = ['prettier'];

const hasDevDependencies =
    typeof devDependencies !== 'undefined' && devDependencies.length > 0;

const hasExactDevDependencies =
    typeof exactDevDependencies !== 'undefined' &&
    exactDevDependencies.length > 0;

let command = '   ';

if (hasDevDependencies) {
    command += 'npm install --save-dev ' + devDependencies.join(' ');
}

if (hasExactDevDependencies) {
    if (command.trim()) {
        command += ' \\\n&& ';
    }

    command +=
        'npm install --save-dev --save-exact ' + exactDevDependencies.join(' ');
}

if (command.trim()) {
    command += ' \\\n&& ';
}

command += 'npx prettier . --write';
command += ' \\\n&& ';
command += 'git rm --cached TODO.md';

const filepath = import.meta.url;
const filename = new URL(filepath).pathname.split('/').pop();

const cyan = '\x1b[96m%s\x1b[0m';
const magenta = '\x1b[95m%s\x1b[0m';

console.log(
    cyan + magenta + cyan + cyan + cyan,
    '\nRun the following command:\n',
    command,
    '\nThen update the README, package name, and page title.',
    `\nFinally, delete ${filename}, stage all, and commit "Complete setup".\n`,
);
