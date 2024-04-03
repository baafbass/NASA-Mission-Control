const launches = new Map();

const launch = {
	flightNumber:100,
	mission: "Kepler Exploration X",
	rocket: "Explorer IS1",
	launchDate: new Date("April 3,2024"),
	distination:"kepler-442 b",
	customer: ['NigerSpace','Baykar'],
	upcoming:true,
	success:true
}

launches.set(launch.flightNumber,launch)

module.exports = {
	launches,
}