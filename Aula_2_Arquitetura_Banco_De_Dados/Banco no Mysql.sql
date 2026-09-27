-- Banco de dados relacional

-- * Criar banco de dados
create database arquitetura;

-- * Usar banco de dados
use arquitetura;

-- * Criar tabela
create table contas (
id int primary key auto_increment not null, 
titular varchar(100) not null,
saldo decimal(9,2) not null,
ativa boolean default true);

-- * Inserir dados na tabela e na connection
insert into contas(titular, saldo)
values ('Julio', 9000.50), ('Mariana', 99500), ('Isabela', 8000),('Priscila', 7000);

-- Selecionando todos os registros em tabelas ou collections
select * from contas;

-- * Selecionando parte dos registros em tabelas ou collections
select * from contas where id = 1;
select * from contas where id = 2;
select * from contas where titular like '%i%'; -- tem a letra i
select * from contas where titular like 'i%'; -- começa com a letra i
select * from contas where titular like '%i'; -- termina com a letra i

-- * Atualizando informações contidas em registros
update contas set saldo = 9000.50 where id = 1;

-- * Usando order by e limit
select * from contas limit 5;
select * from contas order by id desc;
select * from contas order by id asc;
select * from contas order by id asc limit 1;

-- *Removendo registros das tabelas e collections
delete from contas where id = 2;
select * from contas;

-- * Criando tabelas com relacionamentos
create table transferencias (
id int not null primary key auto_increment,
conta_origem_id int not null,
conta_destino_id int not null,
valor decimal(9,2) not null,
foreign key(conta_origem_id) references contas(id),
foreign key(conta_destino_id) references contas(id)
);

insert into transferencias (conta_origem_id, conta_destino_id, valor) values (1,4,500);
insert into transferencias (conta_origem_id, conta_destino_id, valor) values (3,1,100);


-- * Trabalhando com join e aggregate
select * from transferencias
join contas as origem on transferencias.conta_origem_id = origem.id
join contas as destino on transferencias.conta_destino_id = destino.id;