// Supertest -> requisições HTTP
// Chai -> asserções
// Mocha -> estrutura do teste

const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const graphqlApp = require(path.join(__dirname, '..', '..', '..', '..', 'src', 'graphql', 'app'));

describe('Mutation - Login', () => {
  before(async () => {
    await graphqlApp.server.start();
    graphqlApp.server.applyMiddleware({ app: graphqlApp.app });
  });

  after(async () => {
    await graphqlApp.server.stop();
  });

  it('deve realizar login com credenciais válidas', async () => {
    const resposta = await request(graphqlApp.app)
      .post('/graphql')
      .send({
        query: `mutation Login($login: String!, $password: String!) {
          login(login: $login, password: $password) {
            token
          }
        }`,
        variables: { login: 'ash', password: 'pikachu123' }
      });

    expect(resposta.status).to.equal(200);
    expect(resposta.body.errors).to.be.undefined;
    expect(resposta.body.data.login.token).to.be.a('string').and.not.empty;
  });
});
