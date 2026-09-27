/*
 * Exercicio 3: Criar um programa que calcule a plr da empresa
 * Se um usuário é senior ele recebe 2 vezes o salario como bonus, os outros funcionários recebem 1 vez
 * 
 *            | Entrada        | Processamento                                  | Saída
 * * ---------------------------------------------------------* ------------------------------------
 * Definição | cargo, salario | se (cargo for senior) salario = 2 - salario     | salarioPlr
 *          |                | se não for senior salario = 1 - salario         |
 * -------------------------------------------------------------------------------------------------
 * Exemplo | junior, 3000   | (cargo == outros) salarioPlr = 1 * 3000         | salarioPlr = 3000
 *         |                | (cargo == senior) salarioPlr = 2 * 9000         | salarioPlr = 18000
 */

function salarioPlr(cargo, salario) {
  let plr;

  if (cargo == 'senior') {
    plr = 2 * salario;
  } else {
    plr = 1 * salario;
  }

  console.log("Cargo: " + cargo);
  console.log("Salário: R$ " + salario);
  console.log("PLR: R$ " + plr);
}

salarioPlr('senior', 9000);
console.log('-------------------');
salarioPlr('junior', 3000);