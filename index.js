// include the core and github libraries for actions
const core = require('@actions/core');
const github = require('@actions/github');
const { context } = require('@actions/github')

console.log(Object.keys(context));
console.log(context.eventName);

if (context.eventName === "issues") {
    const { payload } = context
    console.log(Object.keys(payload.issue));
    console.log(`The issue ID is: ${payload.issue.id}`);
    console.log(`The issue was submitted by: ${payload.issue.user.login}`);

    try {
        const github_token = core.getInput('github_token', { required: true });
        const custom_text = core.getInput('label_text', { required: true });
        const octokit = github.getOctokit(github_token);
    } catch (error) {
        core.setFailed(error.message);
    }

} else {
    message = "This action should only be used in workflows triggered on: 'issues'";
    console.log(message);
    core.warning(message);
}

// wrap data actions in a try-catch block
// try {
//
//     // get the JSON webhook payload for the event that triggered the workflow
//     const payload = JSON.stringify(github.context.payload, undefined, 2)
//     console.log(`The issue is: ${github.context.payload['issue']}`);
//
//     const custom_text = core.getInput('custom_text');
//     console.log(`Custom text is: ${custom_text}`);
//
//  // report any errors that may have been encountered
// } catch (error) {
//     core.setFailed(error.message);
// }
