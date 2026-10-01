import request from 'supertest'

//função anonima
const obterToken = async (usuario, senha) => {
    //Captura Token
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            'username': usuario,
            'senha': senha
        })

    return respostaLogin.body.token
}

export { obterToken }