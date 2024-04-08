const 
{
getAllLaunches,
scheduleNewLaunch,
existLaunchWithId,
abortLaunchById
} = require('../../models/launches.model')

const {getPagination} = require('../../services/query')

async function httpGetAllLaunches(req,res){
	const {skip,limit} = getPagination(req.query);
	const launches = await getAllLaunches(skip,limit)
	return res.status(200).json(launches)
}

async function httpAddNewLaunch(req,res){
	const launch  = req.body;

    if(!launch.mission || !launch.rocket || !launch.target || !launch.launchDate)
    {
    	return res.status(400).json({
    		error:"Launch Missing Required Property",
    	})
    }

	launch.launchDate = new Date(launch.launchDate)

	if(isNaN(launch.launchDate))
      {
          return res.status(400).json({
          	error: "Invalid launch Date",
          })
      }

	await scheduleNewLaunch(launch)
	return res.status(201).json(launch)
}

async function httpAbordLaunch(req,res){
	const launchId = Number(req.params.id)

	const existLaunch = await existLaunchWithId(launchId)

	if(!existLaunch)
	{
		return res.status(404).json({
          error: "Launch not found"
		})
	}

   const aborted = await abortLaunchById(launchId);
    
    if(!aborted){
    	return res.status(400).json({
    		error: "Launch not found",
    	})
    }

   return res.status(200).json({
   	ok:true,
   })
}

module.exports = {
	httpGetAllLaunches,
	httpAddNewLaunch,
	httpAbordLaunch,
};