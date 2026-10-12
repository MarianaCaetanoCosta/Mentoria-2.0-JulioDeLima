export class UserDto {
  username
  password
  rua
  numero
  telefone
  cep

  constructor(username, password, rua, numero, telefone, cep) {
    this.username = username
    this.password = password
    this.rua = rua
    this.numero = numero
    this.telefone = telefone
    this.cep = cep
  }
}
