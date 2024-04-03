const {getAllLaunches,addNewLaunch} = require('../../models/launches.model')

function httpGetAllLaunches(req,res){
	return res.status(200).json(getAllLaunches())
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


module.exports = {
	httpGetAllLaunches,
	httpAddNewLaunch,
};