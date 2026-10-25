
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');

describe('Mutation - Login', () => {

  it('Deve realizar login com credenciais válidas', async () => {
    const resposta = await request('http://localhost:4000')
      .post('/graphql')
      .send({
        query: `mutation Login($login: String!, $password: String!) {
          login(login: $login, password: $password) {
            token
          }
        }`,
        variables: {
          login: 'ash',
          password: 'pikachu123'
        }
      });

    expect(resposta.status).to.equal(200);
    expect(resposta.body.errors).to.be.undefined;
    expect(resposta.body.data.login).to.have.property('token');
  });

  it('Deve retornar erro quando informar credenciais inválidas', async () => {
    const resposta = await request('http://localhost:4000')
      .post('/graphql')
      .send({
        query: `mutation Login($login: String!, $password: String!) {
          login(login: $login, password: $password) {
            token
          }
        }`,
        variables: {
          login: 'ash',
          password: 'pikachu1234'
        }
      });

    expect(resposta.status).to.equal(200);
    expect(resposta.body.errors[0]).to.have.property('message', 'invalid credentials');
  });

  it('Deve retornar erro quando não informo a senha', async () => {
    const resposta = await request('http://localhost:4000')
      .post('/graphql')
      .send({
        query: `mutation Login($login: String!, $password: String!) {
          login(login: $login, password: $password) {
            token
          }
        }`,
        variables: {
          login: 'ash'
        }
      });

    expect(resposta.status).to.equal(400);
    expect(resposta.body.errors[0]).to.have.property(
      'message',
      'Variable "$password" of required type "String!" was not provided.'
    );
  });

});