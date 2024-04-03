const launches = new Map();

let lastFlightNumber = 100;

const launch = {
	flightNumber:100,
	mission: "Kepler Exploration X",
	rocket: "Explorer IS1",
	launchDate: new Date("April 3,2024"),
	target:"kepler-442 b",
	customers: ['NigerSpace'],
	upcoming:true,
	success:true
}

launches.set(launch.flightNumber,launch)

function existLaunchWithId(LaunchId){
 return launches.has(LaunchId)
}

function getAllLaunches(){
	return Array.from(launches.values())
}


function abortLaunchById(launchId){
 const aborted = launches.get(launchId)
 aborted.upcoming=false
 aborted.success=false
 return aborted
}

function addNewLaunch(launch){
	 lastFlightNumber++;
	 launches.set(lastFlightNumber,Object.assign(launch,{
	 success:true,
	 upcoming:true,
	 customer: ['Niger Aerospace','Baykar'],
     flightNumber:lastFlightNumber,
	}))
}

module.exports = {
	existLaunchWithId,
	getAllLaunches,
	addNewLaunch,
	abortLaunchById,
}