const 
{
getAllLaunches,
addNewLaunch,
existLaunchWithId,
abortLaunchById
} = require('../../models/launches.model')

async function httpGetAllLaunches(req,res){
	return res.status(200).json(await getAllLaunches())
}

function httpAddNewLaunch(req,res){
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

	addNewLaunch(launch)
	return res.status(201).json(launch)
}

function httpAbordLaunch(req,res){
	const launchId = Number(req.params.id)

	if(!existLaunchWithId(launchId))
	{
		return res.status(404).json({
          error: "Launch not found"
		})
	}

   const aborted = abortLaunchById(launchId);
   return res.status(200).json(aborted)
}

module.exports = {
	httpGetAllLaunches,
	httpAddNewLaunch,
	httpAbordLaunch,
};