const request = require('supertest')
const app = require('../../app.js')

describe("Test GET / launches",()=>{
	test("It Should respond with 200 success",async ()=>{
		const response = await request(app)
		.get('/launches')
		.expect('Content-Type',/json/)
		.expect(200);
	})
})

describe("Test POST / launch",()=>{
	
	const completeLaunchData = {
			mission:"Niger Aero",
			target:"kepler-186 f",
			rocket:"NCC 1701-D",
			launchDate:"January 23,2025"
		}

	const launchDataWithoutDate = {
			mission:"Niger Aero",
			target:"kepler-186 f",
			rocket:"NCC 1701-D"
		}

	const launchDataWithoutInvalidDate = {
		    mission:"Niger Aero",
			target:"kepler-186 f",
			rocket:"NCC 1701-D",
			launchDate:"Abdoul Farid"
	}
			
	test('Test it should respond with 201 created',async ()=>{
		const response = await request(app)
		.post('/launches')
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
		.post('/launches')
		.send(launchDataWithoutDate)
		.expect('Content-Type',/json/)
		.expect(400)

		expect(response.body).toStrictEqual({
			error:"Launch Missing Required Property",
		})
	})
	test("It should catch invalid dates",async ()=>{
		const response = await request(app)
		.post('/launches')
		.send(launchDataWithoutInvalidDate)
		.expect('Content-Type',/json/)
		.expect(400)

		expect(response.body).toStrictEqual({
			error: "Invalid launch Date",
		})
	})
})