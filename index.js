// include the core and github libraries for actions
const core = require('@actions/core');
const github = require('@actions/github');

// wrap data actions in a try-catch block
try {
    const github_token = core.getInput('github_token');
    const octokit = github.getOctokit(github_token)

    // get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload.issue, undefined, 2)
    console.log(`The issue was created by: ${payload}`);

    const custom_text = core.getInput('custom_text');
    console.log(`Custom text is: ${custom_text}`);

 // report any errors that may have been encountered
} catch (error) {
    core.setFailed(error.message);
}
