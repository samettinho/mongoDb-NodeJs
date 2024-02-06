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

describe('user answers services testing', () => {
	let agent = chai.request.agent(app);
	let answers_id;
	it('user answers create', (done) => {
		const body = {
			'survey_id': '65b2514b4e364e8511f1fdaf',
			'user_id': '65950c9416fd02529779fca8',
			'selection_id': '65b2514b4e364e8511f1fdb0',
			'question_id': '65b2514b4e364e8511f1fdb1',
			'choices': [ {
				'choice_id': '65b2514b4e364e8511f1fdb2'
			} ]
		};
		agent
			.post('/useranswers')
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
				answers_id = res.body.data._id;
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('get created answers ', (done) => {
		const body = {
			'user_id': '65950c9416fd02529779fca8',
			'choice_id': '65b2514b4e364e8511f1fdb2'
		};
		agent
			.post('/useranswers/getOne')
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
				answers_id = res.body.data._id;
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('get all answers', (done) => {
		agent
			.get('/useranswers')
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
	it('answer answer delete', (done) => {
		const body = {
			'user_id': '65950c9416fd02529779fca8',
			'question_id': '65b2514b4e364e8511f1fdb1'
		};
		agent
			.post('/useranswers/delete')
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
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('delete answer control', (done) => {
		const body = {
			'user_id': '65950c9416fd02529779fca8',
			'choice_id': '65b2514b4e364e8511f1fdb2'
		};
		agent
			.post('/useranswers/getOne')
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
				res.body.should.have.property('message').equal('cevap bulunamadı.');
				done();
			});
	});
	it('delete survey control', (done) => {
		const body = {
			'user_id': '65950c9416fd02529779fca8',
			'question_id': '65b2514b4e364e8511f1fdb4',
			'choices': [ {
				'choice_id': '65b2514b4e364e8511f1fdb6'
			} ]
		};
		agent
			.post('/useranswers/update')
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

				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('user answers update', (done) => {
		const body = {
			'user_id': '65950c9416fd02529779fca8',
			'question_id': '65b2514b4e364e8511f1fdb4',
			'choices': [ {
				'choice_id': '65b2514b4e364e8511f1fdb6'
			} ]
		};
		agent
			.post('/useranswers/update')
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
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('get updated answers ', (done) => {
		const body = {
			'user_id': '65950c9416fd02529779fca8',
			'choice_id': '65b2514b4e364e8511f1fdb6'
		};
		agent
			.post('/useranswers/getOne')
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
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('updated answers control', (done) => {
		const body = {
			'user_id': '65950c9416fd02529779fca8',
			'choice_id': '65b2514b4e364e8511f1fdb5'
		};
		agent
			.post('/useranswers/getOne')
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
	it('get total score', (done) => {
		agent
			.get('/useranswers/totalScore/65950c9416fd02529779fca8')
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
});