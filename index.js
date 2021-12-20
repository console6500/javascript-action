// include the core and github libraries for actions
const core = require('@actions/core');
const github = require('@actions/github');

// get the context for this run of the script
const context = (github as any).context
const issue = context.payload.issue

console.log(`The context: ${context}`);
console.log(`The issue: ${issue}`);

// wrap data actions in a try-catch block
try {
    const github_token = core.getInput('github_token');
    const octokit = github.getOctokit(github_token)

    // get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

    const custom_text = core.getInput('custom_text');
    console.log(`Custom text is: ${custom_text}`);

 // report any errors that may have been encountered
} catch (error) {
    core.setFailed(error.message);
}
