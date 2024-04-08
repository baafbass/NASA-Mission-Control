const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://nasa-api:BAAF-bass662932@nasacluster.haj5dyw.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster'

mongoose.connection.once('open',()=>{
	console.log('MongoDb Connection Ready');
})

mongoose.connection.on('error',(err)=>{
	console.error(err)
})

async function mongoConnect(){
	await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
	await mongoose.disconnect();
}

module.exports = {
	mongoConnect,
	mongoDisconnect,
}