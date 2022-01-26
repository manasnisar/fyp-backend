const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { issueService } = require('../services');

const createIssue = catchAsync(async (req, res) => {
  const issue = await issueService.createIssue(req.body);
  res.status(httpStatus.CREATED).send(issue);
});

const getIssuesForEpic = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ['name', 'role']);
  //   const options = pick(req.query, ['sortBy', 'limit', 'page']);
  //   const result = await issueService.getIssuesForEpic(filter, options);
  const result = await issueService.getIssuesForEpic(req.params.epicId);
  res.send(result);
});

const getIssueById = catchAsync(async (req, res) => {
  res.send({
    issue: {
      id: 506914,
      title: 'Try dragging issues to different columns to transition their status.',
      type: 'story',
      status: 'selected',
      priority: '3',
      listPosition: 3,
      description:
        '<p>An issue\'s status indicates its current place in the project\'s workflow. Here\'s a list of the statuses that come with&nbsp;JIRA products, depending on what projects you\'ve created on your site.</p><p><br></p><h3>Jira software issue statuses:</h3><p><br></p><h2><strong style="background-color: rgb(187, 187, 187);"> Backlog </strong></h2><p>The issue is waiting to be picked up in a future sprint.</p><p><br></p><h2><strong style="background-color: rgb(187, 187, 187);"> Selected </strong></h2><p>The issue is open and ready for the assignee to start work on it.</p><p><br></p><h2><strong style="background-color: rgb(0, 102, 204); color: rgb(255, 255, 255);"> In Progress </strong></h2><p>This issue is being actively worked on at the moment by the assignee.</p><p><br></p><h2><strong style="background-color: rgb(0, 138, 0); color: rgb(255, 255, 255);"> Done </strong></h2><p>Work has finished on the issue.</p>',
      descriptionText:
        "An issue's status indicates its current place in the project's workflow. Here's a list of the statuses that come with&nbsp;JIRA products, depending on what projects you've created on your site.Jira software issue statuses: Backlog The issue is waiting to be picked up in a future sprint. Selected The issue is open and ready for the assignee to start work on it. In Progress This issue is being actively worked on at the moment by the assignee. Done Work has finished on the issue.",
      estimate: 15,
      timeSpent: 12,
      timeRemaining: null,
      createdAt: '2021-11-25T20:56:20.799Z',
      updatedAt: '2021-11-25T20:56:20.799Z',
      reporterId: 188606,
      projectId: 62621,
      users: [],
      comments: [
        {
          id: 506015,
          body: 'In the twilight rain\nthese brilliant-hued hibiscus -\nA lovely sunset.',
          createdAt: '2021-11-25T20:56:20.850Z',
          updatedAt: '2021-11-25T20:56:20.850Z',
          userId: 188605,
          issueId: 506914,
          user: {
            id: 188605,
            name: 'Lord Gaben',
            email: 'gaben@jira.guest',
            avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
            createdAt: '2021-11-25T20:56:20.766Z',
            updatedAt: '2021-11-25T20:56:20.774Z',
            projectId: 62621,
          },
        },
      ],
      userIds: [],
    },
  });

  // const issue = await issueService.getIssue(req.params.issueId);
  // if (!issue) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Issue not found');
  // }
  // res.send(issue);
});

const updateIssueById = catchAsync(async (req, res) => {
  const issue = await issueService.updateIssue(req.params.issueId, req.body);
  res.send(issue);
});

const deleteIssueById = catchAsync(async (req, res) => {
  await issueService.deleteIssue(req.params.issueId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createIssue,
  getIssuesForEpic,
  getIssueById,
  updateIssueById,
  deleteIssueById,
};
