// Regression checks for the security overrides and the two Bun patches.
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { resolve } = require('node:path');
const { readFileSync } = require('node:fs');
function fromChain(...packages) {
  let req = createRequire(resolve(__dirname, '../packages/mobile/package.json'));
  for (const name of packages) req = createRequire(req.resolve(`${name}/package.json`));
  return req;
}
async function main() {
  const router = fromChain('expo-router');
  const query = router('query-string');
  assert.equal(query.parse('fruit=ma%C3%A7%C3%A3').fruit, 'maçã');
  assert.equal(typeof query.parse('x=%E0%A4%A').x, 'string');
  assert.equal(query.stringify({ fruit: 'amora' }), 'fruit=amora');

  const metro = fromChain('expo', '@expo/metro-config', '@expo/metro', 'metro');
  const assets = metro('./src/Assets.js');
  const file = resolve(__dirname, '../packages/mobile/assets/adaptive-icon.png');
  const dimensions = assets.getAssetSize('png', readFileSync(file), file);
  assert.ok(dimensions.width > 0 && dimensions.height > 0);
  const data = await assets.getAssetData(file, 'icon.png', [], null, '/assets');
  assert.equal(data.width, dimensions.width);

  const plugins = fromChain('expo', '@expo/config-plugins');
  const project = plugins('xcode').project('unused.pbxproj');
  project.hash = { project: { objects: {} } };
  assert.match(project.generateUuid(), /^[A-F0-9]{24}$/);
  console.log('Dependency compatibility: URL parsing, Metro images and Xcode UUID passed.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
