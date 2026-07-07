import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const project = 'settlemate';
const required = [
  '.gitmodules',
  '.github/workflows/ci.yml',
  '.env.example',
  'docker-compose.yml',
  'deploy/argocd/settlemate.yaml',
  'deploy/k8s/backend.yaml',
  'deploy/k8s/frontend.yaml',
  'observability/grafana/settlemate-dashboard.json',
  'settlemate-fe/package.json',
  'settlemate-fe/scripts/self-check.mjs',
  'settlemate-be/openapi.yaml',
  'settlemate-be/requests.http',
  'docs/resume-evidence.md'
];

for (const file of required) {
  if (!existsSync(file)) throw new Error(`missing ${file}`);
}

const modules = readFileSync('.gitmodules', 'utf8');
for (const name of ['settlemate-fe', 'settlemate-be']) {
  if (!modules.includes(`[submodule "${name}"]`)) throw new Error(`missing submodule ${name}`);
  if (!modules.includes(`path = ${name}`)) throw new Error(`wrong submodule path ${name}`);
  if (!modules.includes(`url = https://github.com/settlemate-labs/${name}.git`)) throw new Error(`wrong submodule url ${name}`);
  if (!modules.includes('branch = develop')) throw new Error(`wrong submodule branch ${name}`);
}
const remotes = execFileSync('git', ['remote', '-v'], { encoding: 'utf8' });
if (!remotes.includes('origin\thttps://github.com/settlemate-labs/settlemate-workspace.git')) throw new Error('wrong origin remote');
if (!remotes.includes('personal\thttps://github.com/cyjoon68/settlemate-workspace.git')) throw new Error('wrong personal remote');
for (const name of ['settlemate-fe', 'settlemate-be']) {
  const childRemotes = execFileSync('git', ['-C', name, 'remote', '-v'], { encoding: 'utf8' });
  if (!childRemotes.includes(`origin\thttps://github.com/settlemate-labs/${name}.git`)) throw new Error(`wrong child origin ${name}`);
}

const openapi = readFileSync(`${project}-be/openapi.yaml`, 'utf8');
if (!openapi.includes('/api/settlements')) throw new Error('openapi endpoint missing');
const evidence = readFileSync('docs/resume-evidence.md', 'utf8');
if (!evidence.includes('Interview proof:')) throw new Error('resume evidence missing interview proof');
if (!evidence.includes('POST /api/settlements')) throw new Error('resume evidence missing settlement endpoint');

for (const file of ['.github/workflows/ci.yml', `${project}-fe/.github/workflows/ci.yml`, `${project}-be/.github/workflows/ci.yml`]) {
  const ci = readFileSync(file, 'utf8');
  if (!ci.includes('Validate git rules')) throw new Error(`missing git rules gate: ${file}`);
  if (!ci.includes('github.event.pull_request.title')) throw new Error(`missing PR title gate: ${file}`);
}

execFileSync('node', ['scripts/self-check.mjs'], { cwd: `${project}-fe`, stdio: 'inherit' });
execFileSync('node', ['scripts/self-check.mjs'], { cwd: `${project}-be`, stdio: 'inherit' });

console.log(`${project}-workspace_self_check_ok`);
