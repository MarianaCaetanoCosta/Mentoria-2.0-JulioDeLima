import request from 'supertest'

import postLogin from '../fixtures/postLogin.json' with { type: 'json' }

//função anonima
const obterToken = async (usuario, senha) => {

    //clonar o postLogin
    const bodyLogin = { ...postLogin }

    //Captura Token
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)

    return respostaLogin.body.token
}

export { obterToken }