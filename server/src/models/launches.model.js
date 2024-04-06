const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGTH_NUMBER=100;

const launch = {
	flightNumber:100,
	mission: "Kepler Exploration X",
	rocket: "Explorer IS1",
	launchDate: new Date("April 3,2024"),
	target:"Kepler-442 b",
	customers: ['NigerSpace'],
	upcoming:true,
	success:true
}

saveLaunch(launch)


async function existLaunchWithId(LaunchId){
 return await launchesDatabase.findOne({
 	flightNumber:LaunchId,
 })
}

async function getAllLaunches(){
	return await launchesDatabase.find({},{'_id':0,'__v':0})
}

async function saveLaunch(launch){
    
    const planet = await planets.findOne({
    	keplerName: launch.target,
    })

   if(!planet)
   {
   	throw new Error('No Matching Planet Found');
   }

	await launchesDatabase.findOneAndUpdate({
		flightNumber: launch.flightNumber,
	},launch,{upsert:true})
}

async function getLastestFlightNumber(){
	const lastestLaunch = await launchesDatabase
	.findOne()
	.sort('-flightNumber')

	if(!lastestLaunch){
		return DEFAULT_FLIGTH_NUMBER;
	}

	return lastestLaunch.flightNumber;
}

async function abortLaunchById(launchId){
	const aborted = await launchesDatabase.updateOne({
		flightNumber:launchId,
	},{
		upcoming:false,
		success:false,
	})

    return aborted.modifiedCount === 1;
}

async function scheduleNewLaunch(launch){
	const newLaunchFlightNumber = await getLastestFlightNumber() + 1;

	const newLaunch = Object.assign(launch,{
		upcoming:true,
		success:true,
        customers: ['Niger Aerospace','Baykar'],
        flightNumber:newLaunchFlightNumber
	})

	await saveLaunch(newLaunch);
}

module.exports = {
	existLaunchWithId,
	getAllLaunches,
	scheduleNewLaunch,
	abortLaunchById,
}