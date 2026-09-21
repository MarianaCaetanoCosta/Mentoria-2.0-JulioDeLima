/*
 * Exercicio 4: Verificar aprovação do aluno.
 * Se a média é superior ou igual a 7 e a frequência é superior ou igual a 75% está aprovado.
 * Se a média é superior ou igual a quatro recuperação, se a média é inferior a 4 ou a presença é inferior a 75% reprovado.
 * 
 * A regra é:
 * 1. Aprovado: média ≥ 7 E frequência ≥ 75%
 * 2. Recuperação: média ≥ 4 E média < 7, desde que a frequência seja ≥ 75%
 * 3. Reprovado: média < 4 OU frequência < 75%
 * 
 * Resultado:
 * Aprovado
 * Recuperação
 * Reprovado
 * Reprovado
 */


function verificarAprovacao(media, frequencia) {

  if (media >= 7 && frequencia >= 75) {
    console.log("Aprovado");
  }
  else if (media >= 4 && frequencia >= 75) {
    console.log("Recuperação");
  }
  else {
    console.log("Reprovado");
  }
}

verificarAprovacao(8, 80);
verificarAprovacao(5, 80);
verificarAprovacao(3, 90);
verificarAprovacao(8, 70);