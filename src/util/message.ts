
type AvaliableEvents = 'pull_request' | 'star'

export async function constructMessage(req: Request): Promise<{message: string, receivers: string[]}> {
  const { body } = await req.json() as any
  const event = req.headers.get('x-github-event') as AvaliableEvents;
  if (event === null) {
    throw new Error('Missing event header');
  }

  return MESSAGE_FORMAT[event](body)
}

function starMessage (body: any) {
  const nos_stars = body.repository.stargazers_count;
  const starrer_username = body.sender.login;
  const repo_url = body.repository.html_url;
  const repo_name = body.repository.name;
  return {
    message: `${starrer_username} has starred the [${repo_name}](${repo_url}). The Total Stars are ${nos_stars}`,
    receivers: body.pull_request.requested_reviewers
  } 
}

function parsePullRequest(body: any) {
  return {
    receivers: body.pull_request.requested_reviewers,
    authorProfile: body.sender.html_url,
    repoUrl: body.repository.html_url,
    url: body.pull_request.html_url,
    repoFullName: body.repository.full_name,
    title: body.pull_request.title,
    link: body.pull_request.html_url,
    desc: body.pull_request.body,
    author: body.sender.login,
    number: body.number,
    status: body.action,
  }
}

function pullRequestMessage (body: any) {
  const pullRequest = parsePullRequest(body);
  return {
    message: `Pull Request #${pullRequest.number} ${pullRequest.status} on ${pullRequest.repoFullName} by: [${pullRequest.author}]
${pullRequest.link}

Title: *${pullRequest.title}*`,
    receivers: pullRequest.receivers
  } 
}

const MESSAGE_FORMAT = {
  'star': starMessage,
  'pull_request': pullRequestMessage
}