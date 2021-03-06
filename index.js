// include the core and github libraries for actions
const core = require('@actions/core');
const github = require('@actions/github');
const { context } = require('@actions/github')

async function create_comment() {
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN', { required: true });
    const CUSTOM_TEXT = core.getInput('LABEL_TEXT', { required: true });
    const octokit = github.getOctokit(GITHUB_TOKEN);
    const { issue } = context.payload

    console.log(`Issue`);
    console.log(Object.keys(issue));

    console.log(`Repo keys`);
    console.log(Object.keys(context.repo));

    console.log(`Issue ID: ${issue.id}`);
    console.log(`Submitted by: ${issue.user.login}`);
    console.log(Object.keys(octokit));
    octokit.rest.issues.list();
    //octokit.rest.issues.list({
    //    ...context.repo,
    //    issue_number: issue.id,
    //   body: "Text goes here",
    //});
}

if (context.eventName === "issues") {

    try {
        create_comment();
    } catch (error) {
        core.setFailed(error.message);
    }

} else {
    message = "This action should only be used in workflows triggered on: 'issues'";
    console.log(message);
    core.warning(message);
}
