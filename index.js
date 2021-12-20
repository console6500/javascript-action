const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  const custom_text = core.getInput('custom_text');
  console.log(`Custom text is: ${custom_text}`);
} catch (error) {
  core.setFailed(error.message);
}
