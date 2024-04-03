const express = require('express')
const {httpGetAllLaunches} = require('./launches.controller.js')

const launchesRouter = express.Router()

launchesRouter.get('/launches',httpGetAllLaunches)

module.exports = launchesRouter;