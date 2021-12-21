// include the core and github libraries for actions
const core = require('@actions/core');
const github = require('@actions/github');
const { context } = require('@actions/github')

console.log(Object.keys(context));
console.log(context.eventName);

if (context.eventName === "issues") {
    const { payload } = context
    console.log(Object.keys(payload.issue));
    console.log(`Issue ID: ${payload.issue.id}`);
    console.log(`Submitted by: ${payload.issue.user.login}`);
    console.log(`Repo name: ${payload.repository.name}`);
    console.log(`Repo owner: ${payload.repository.owner.login}`);

    try {
        const github_token = core.getInput('github_token', { required: true });
        const custom_text = core.getInput('label_text', { required: true });
        const octokit = github.getOctokit(github_token);

        octokit.rest.issues.addLabels(
            payload.repository.owner.login,
            payload.repository.name,
            payload.issue.id,
            custom_text);

    } catch (error) {
        core.setFailed(error.message);
    }

} else {
    message = "This action should only be used in workflows triggered on: 'issues'";
    console.log(message);
    core.warning(message);
}
