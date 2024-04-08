const axios = require('axios')

const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGTH_NUMBER=100;

const launch = {
	flightNumber:100, // flight_number
	mission: "Kepler Exploration X", //name
	rocket: "Explorer IS1", // rocket.name
	launchDate: new Date("April 3,2024"), // date_local
	target:"Kepler-442 b", // not applicable
	customers: ['NigerSpace'], // payloads.customers
	upcoming:true,//upcoming
	success:true// success
}

saveLaunch(launch)

const SPACEX_API_URL = 'https://api.spacexdata.com/v5/launches/query'

async function loadLaunchData(){
	console.log("Downloading data from SpaceX....")
	const response = await axios.post('https://api.spacexdata.com/v5/launches/query',{
    query:{},
    options:{
    	pagination:false,
        populate:[
          {
              path:'rocket',
              select:{
                  name:1
              }
          },
          {
          	path:'payloads',
          	select:{
          		'customers':1
          	}
          }
        ]
    }
})


	const launchDocs = response.data.docs;
	for (const launchDoc of launchDocs){
        const payloads = launchDoc['payloads']
        const customers = payloads.flatMap((payload)=>{
        	return payload['customers']
        })

       const launch = {
       	flightNumber: launchDoc['flight_number'],
       	mission: launchDoc['name'],
       	rocket: launchDoc['rocket']['name'],
       	launchDate: launchDoc['date_local'],
       	upcoming: launchDoc['upcoming'],
       	success: launchDoc['success'],
       	customers,
       }
       console.log(`${launch.flightNumber} --> ${launch.mission}`)
	}
}

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
	loadLaunchData,
	existLaunchWithId,
	getAllLaunches,
	scheduleNewLaunch,
	abortLaunchById,
}