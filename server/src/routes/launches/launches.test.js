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
	test('Test it should respond with 200 success',()=>{

	})

	test("It should catch missing required properties",()=>{})
	test("It should catch invalid dates",()=>{})
})