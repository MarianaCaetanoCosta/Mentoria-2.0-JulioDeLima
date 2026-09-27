-- Banco de dados não relacional

-- * Criar banco
use arquitetura

-- * Criar tabela
db.createCollection("contas")

-- * Inserir dados na tabela e na connection
db.contas.insertOne({id:1, titular:'Julio', saldo: 9000.50, ativa: true})
db.contas.insertOne({id:2, titular:'Mariana', saldo: 99500, ativa: true})
db.contas.insertOne({id:3, titular:'Isabela', saldo: 8000, ativa: true})
db.contas.insertOne({id:4, titular:'Priscila', saldo: 7000, ativa: true})

-- * Selecionando todos os registros em tabelas ou collections
db.contas.find()

-- o id é trago por padrão do mongo
db.contas.find({}, {titular: 1, saldo: 1})

-- ocultar o id
db.contas.find({}, {titular: 1, saldo: 1, _id:0})

-- * Selecionando parte dos registros em tabelas ou collections
db.contas.find({id: 1}), db.contas.find({id: 2})
db.contas.find({ titular: /i/ }) -- tem a letra i
db.contas.find({ titular: /i/i })
db.contas.find({ titular: /^i/i/i }) -- começa com a letra i

-- * Atualizando informações contidas em registros
db.contas.updateOne({id: 1}, {$set: {saldo: 9000.50}})
db.contas.find({id:1})

-- * Usando order by e limit
db.contas.find().limit(1)
db.contas.find().sort({id: 1})
db.contas.find().sort({id: 1}).limit(1)

-- *Removendo registros das tabelas e collections
db.contas.deleteOne({id:2})
db.contas.find()

-- * Criando tabelas com relacionamentos
db.createCollection("transferencias")

db.transferencias.insertOne({id:1, conta_origem_id:1, conta_destino_id: 4, valor: 500.00})
db.transferencias.insertOne({id:2, conta_origem_id:3, conta_destino_id: 1, valor: 100.00})

-- * Trabalhando com join e aggregate
db.transferencias.aggregate([{$lookup: {from: "contas", localField: "conta_origem_id", foreignField: "id", as: "origem" }}, {$lookup: {from: "contas", localField: "conta_destino_id", foreignField: "id", as: "destino"}}])

db.contas.updateOne({ id: 3 }, { $set: { id: 4 }})
db.contas.updateOne({ id: 3 }, { $set: { id: 2 }})
db.contas.updateOne({ id: 4, titular: "Isabela" },{ $set: { id: 3 } })

db.contas.find()

db.transferencias.find()
