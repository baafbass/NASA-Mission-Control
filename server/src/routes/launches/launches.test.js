const request = require('supertest')
const app = require('../../app.js')
const {mongoConnect,mongoDisconnect} = require('../../services/mongo')
const {loadPlanetsData} =require('../../models/planets.model')

describe("Launches API",()=>{

beforeAll(async ()=>{
	await mongoConnect();
	await loadPlanetsData();
})

afterAll(async ()=>{
	await mongoDisconnect();
})

describe("Test GET / launches",()=>{
	test("It Should respond with 200 success",async ()=>{
		const response = await request(app)
		.get('/v1/launches')
		.expect('Content-Type',/json/)
		.expect(200);
	})
})

describe("Test POST / launch",()=>{
	
	const completeLaunchData = {
			mission:"Niger Aero",
			target:"Kepler-62 f",
			rocket:"NCC 1701-D",
			launchDate:"January 23,2025"
		}

	const launchDataWithoutDate = {
			mission:"Niger Aero",
			target:"Kepler-62 f",
			rocket:"NCC 1701-D"
		}

	const launchDataWithoutInvalidDate = {
		    mission:"Niger Aero",
			target:"Kepler-62 f",
			rocket:"NCC 1701-D",
			launchDate:"Abdoul Farid"
	}
			
	test('Test it should respond with 201 created',async ()=>{
		const response = await request(app)
		.post('/v1/launches')
		.send(completeLaunchData)
		.expect('Content-Type',/json/)
		.expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        
        expect(responseDate).toBe(requestDate)
		expect(response.body).toMatchObject(launchDataWithoutDate)
	})


	test("It should catch missing required properties",async ()=>{
		const response = await request(app)
		.post('/v1/launches')
		.send(launchDataWithoutDate)
		.expect('Content-Type',/json/)
		.expect(400)

		expect(response.body).toStrictEqual({
			error:"Launch Missing Required Property",
		})
	})
	test("It should catch invalid dates",async ()=>{
		const response = await request(app)
		.post('/v1/launches')
		.send(launchDataWithoutInvalidDate)
		.expect('Content-Type',/json/)
		.expect(400)

		expect(response.body).toStrictEqual({
			error: "Invalid launch Date",
		})
	})
})
})

