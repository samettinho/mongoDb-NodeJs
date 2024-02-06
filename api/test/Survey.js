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

describe('survey services testing', () => {
	let agent = chai.request.agent(app);
	let survey_id;
	it('survey create', (done) => {
		const body = {
			'name': 'Demirbaş Anketi',
			'selections': [
				{
					'name': 'Bölüm 1',
					'questions': [
						{
							'question': 'Lütfen sahip olduklarınızı seçiniz.',
							'choices': [
								{
									'choice': 'Telefon',
									'point': 5
								},
								{
									'choice': 'Akıllı Saat',
									'point': 4
								},
								{
									'choice': 'Bilgisayar',
									'point': 3
								}
							]
						}
					]
				}
			]
		};
		agent
			.post('/survey')
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
				survey_id = res.body.data._id;
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
	it('wrong create', (done) => {
		const body = {
			'name': 'Demirbaş Anketi',
			'selections': [
				{
					'questions': [
						{
							'question': 'Lütfen sahip olduklarınızı seçiniz.'
						}
					]
				}
			]
		}
			;
		agent
			.post('/survey')
			.send(body)
			.end((err, res) => {
				if (err) {
					done(err);
				}

				res.body.should.be.a('object');
				res.body.should.have.keys(
					'type',
					'message'
				);
				res.body.should.have.property('type').equal(false);
				done();
			});
	});
	it('get all surveys', (done) => {
		agent
			.get('/survey')
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
	it('get created survey', (done) => {
		agent
			.get(`/survey/${survey_id}`)
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
	it('created survey delete', (done) => {
		agent
			.delete(`/survey/${survey_id}`)
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
	it('delete survey control', (done) => {
		agent
			.get(`/survey/${survey_id}`)
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
				res.body.should.have.property('message').equal('Anket bulunamadı.');
				done();
			});
	});

});