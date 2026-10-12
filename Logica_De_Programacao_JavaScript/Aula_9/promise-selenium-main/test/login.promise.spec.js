import { Builder, By, until } from "selenium-webdriver";

describe("Login com Selenium usando promise chain", () => {

  let driver;

  before(()=> {
    return new Builder()
      .forBrowser("chrome")
      .build()
      .then((createdDriver) => {
        driver = createdDriver;
      });
  });

  after(() => {
    if (!driver) {
      return undefined;
    }

    return driver.quit();
  });

  it("deve permitir logar no Sauce Demo", () => {
    return driver
      .get("https://www.saucedemo.com/")
      .then(() => {
        driver.findElement(By.id("user-name")).sendKeys("standard_user");
        driver.findElement(By.id("password")).sendKeys("secret_sauce");
        driver.findElement(By.id("login-button")).click();
        driver.wait(until.urlContains("inventory.html"), 10000);
      })
      .then(() => {
        driver.getTitle().then((title) => {
          if (!title.includes("Swag Labs")) {
            throw new Error(`Título inesperado: ${title}`);
          }
        });
      });
  });
});
