const { execSync } = require('child_process');
const tap = require('tap');

const build_example = (asciimath_text) => ({
  "blocks": [{
    "t":"Para",
    "c":[{"t":"Math","c":[{"t":"InlineMath"},asciimath_text]}]}],
  "pandoc-api-version":[1,17,0,5],"meta":{}});

tap.test('example Asciimath in pandoc JSON converted to TeX', async tap => {
  const input = JSON.stringify(build_example(":a sum_(k=1)^3 k"));
  const wanted_output = JSON.stringify(
    build_example("{\\sum_{{{k}={1}}}^{{3}}}{k}"));
  const filter_process_stdout = execSync(
    'node asciimathfilter.js', {'input': input, 'encoding': 'utf-8'});
  tap.equal(filter_process_stdout, wanted_output);
});
