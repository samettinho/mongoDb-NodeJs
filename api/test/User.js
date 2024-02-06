/* eslint-disable multiline-comment-style */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import { it } from 'mocha';

chai.use(chaiHttp);
chai.should();

describe('user services testing', () => {
	let agent = chai.request.agent(app);
	let user_id;
	it('user create', (done) => {
		const body = {
			'name': 'Hakan',
			'surname': 'dinctürk',
			'email': 'hakan@gmail.com',
			'password': 'bc2b2bf60e58513241322821f0baf3b8',
			'company_id': '65956ffc16fd02529779fcc5',
			'department_id': '65a7bdf4c897a1cc0413cad3',
			'tasks': [
				{
					'title': 'Task 1',
					'statement': 'Statement 1',
					'score': 10
				},
				{
					'title': 'Task 2',
					'statement': 'Statement 2',
					'score': 20
				}
			]
		};
		agent
			.post('/user')
			.send(body)
			.end((err, res) => {
				if (err) {
					done(err);
				}

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.keys(
					'type',
					'message',
					'data'
				);
				user_id = res.body.data._id;
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('get created user', (done) => {
		agent
			.get(`/user/${user_id}`)
			.end((err, res) => {
				if (err) {
					done(err);
				}

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.keys(
					'type',
					'message',
					'data'
				);
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('exits user create', (done) => {
		const body = {
			'name': 'Hakan',
			'surname': 'dinctürk',
			'email': 'samet@gmail.com',
			'password': 'bc2b2bf60e58513241322821f0baf3b8',
			'company_id': '65956ffc16fd02529779fcc5',
			'department_id': '65a7bdf4c897a1cc0413cad3',
			'tasks': [
				{
					'title': 'Task 1',
					'statement': 'Statement 1',
					'score': 10
				},
				{
					'title': 'Task 2',
					'statement': 'Statement 2',
					'score': 20
				}
			]
		};
		agent
			.post('/user')
			.send(body)
			.end((err, res) => {
				if (err) {
					done(err);
				}
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.keys(
					'type',
					'message'
				);
				res.body.should.have.property('type').equal(false);
				done();
			});
	});
	it('get all user', (done) => {
		agent
			.get(`/user/${user_id}`)
			.end((err, res) => {
				if (err) {
					done(err);
				}

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.keys(
					'type',
					'message',
					'data'
				);
				chai.expect(
					res.body.data.length === 1,
				).to.equal(true);
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('get department user', (done) => {
		agent
			.get(`/user/deparmentUser/${user_id}`)
			.end((err, res) => {
				if (err) {
					done(err);
				}

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.keys(
					'type',
					'message',
					'data'
				);
				chai.expect(
					res.body.data[ 0 ].name === 'Hakan',
				).to.equal(true);
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('get department name and users', (done) => {
		agent
			.get('/user/dep')
			.end((err, res) => {
				if (err) {
					done(err);
				}

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.keys(
					'type',
					'message',
					'data'
				);
				chai.expect(
					res.body.data.length === 2,
				).to.equal(true);

				chai.expect(
					res.body.data[ 0 ].department_name === 'WEB',
				).to.equal(true);

				chai.expect(
					res.body.data[ 0 ].name === 'Hakan',
				).to.equal(true);

				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('get mission score is greater than 10', (done) => {
		agent
			.get('/user/deneme')
			.end((err, res) => {
				if (err) {
					done(err);
				}

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.keys(
					'type',
					'message',
					'data'
				);

				const result = res.body.data;
				result.forEach(function (user) {
					user.tasks.forEach(function (task) {
						chai.expect(task.score).to.be.above(9);
					});
				});
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
});