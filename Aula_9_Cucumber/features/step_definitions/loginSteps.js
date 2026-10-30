
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");

let driver;

Before(async function () {
  driver = await new Builder().forBrowser("chrome").build();
});

After(async function () {
  await driver.quit();
});

Given("que esteja na pagina de login", async function () {
  await driver.manage().window().maximize();
  await driver.get("http://localhost:4000/");
});

When("realizo login com as seguintes credenciais", async function (dataTable) {
  const data = dataTable.rowsHash();

  const usuario = data.usuario;
  const senha = data.senha;

  await driver.findElement(By.id("username")).sendKeys(usuario);
  await driver.findElement(By.id("senha")).sendKeys(senha);
  await driver.findElement(By.xpath("//button[text()='Entrar']")).click();
});

Then("sou redirecionado para pagina inicial", async function () {
  const corpo = await driver.findElement(By.tagName("body"));
  const texto = await corpo.getText();

  assert.ok(
    texto.includes("Realizar Transferência"),
    "O título da página inicial não foi encontrado"
  );
});