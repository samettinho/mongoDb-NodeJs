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
	let user_id = '65950c9416fd02529779fca8';
	it('addtask to user ', (done) => {
		const body = {
			'title': 'sametsamet',
			'statement': 'wewrtyuyıuıyt',
			'score': 1
		};
		agent
			.post(`/usertask/${user_id}`)
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
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('addtask to user control', (done) => {
		agent
			.get(`/usertask/${user_id}`)
			.end((err, res) => {
				if (err) {
					done(err);
				}
				chai.expect(
					res.body.data[ 0 ].tasks.length === 4,
				).to.equal(true);
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
	it('usertask get all', (done) => {
		agent
			.get('/usertask')
			.end((err, res) => {
				if (err) {
					done(err);
				}
				chai.expect(
					res.body.data.length === 6,
				).to.equal(true);
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
	it('get usertask total score', (done) => {
		agent
			.get(`/usertask/totalTaskScore/${user_id}`)
			.end((err, res) => {
				if (err) {
					done(err);
				}
				chai.expect(
					res.body.data[ 0 ].total_score === 302,
				).to.equal(true);
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
});