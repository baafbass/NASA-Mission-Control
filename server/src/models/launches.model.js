const launches = new Map();

let lastFlightNumber = 100;

const launch = {
	flightNumber:100,
	mission: "Kepler Exploration X",
	rocket: "Explorer IS1",
	launchDate: new Date("April 3,2024"),
	target:"kepler-442 b",
	customer: ['NigerSpace','Baykar'],
	upcoming:true,
	success:true
}

launches.set(launch.flightNumber,launch)

function getAllLaunches(){
	return Array.from(launches.values())
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
	getAllLaunches,
	addNewLaunch,
}