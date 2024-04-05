const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')

const {loadPlanetsData} = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:BAAF-bass662932@nasacluster.haj5dyw.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster'

const server = http.createServer(app)

mongoose.connection.once('open',()=>{
	console.log('MongoDb Connection Ready');
})

mongoose.connection.on('error',(err)=>{
	console.error(err)
})

async function startServer()
{
 await mongoose.connect(MONGO_URL)
await loadPlanetsData()
server.listen(PORT,()=>{
	console.log(`The app is running at ${PORT}...`)
})
}

startServer();