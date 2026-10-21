// Supertest -> requisições HTTP
// Chai -> asserções
// Mocha -> estrutura do teste

const request = require('supertest');
const { expect } = require('chai');

describe('Mutation - Login', () => {
  it('deve realizar login com credenciais válidas', async () => {
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
    expect(resposta.body.data.login.token).to.be.a('string').and.not.empty;
  });
});
