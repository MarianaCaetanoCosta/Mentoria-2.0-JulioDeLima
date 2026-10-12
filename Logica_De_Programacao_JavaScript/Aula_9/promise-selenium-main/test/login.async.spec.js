import { Builder, By, until } from 'selenium-webdriver';
import { UserDto } from './dto/user-dto.js';


describe('Login com Selenium usando async/await', function () {
  this.timeout(30000);

  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('deve permitir logar no Sauce Demo', async function () {
    let user = new UserDto('standard_user', 'secret_sauce', 'rua', 300, '00000000', '123123444')

    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys(user.username);
    await driver.findElement(By.id('password')).sendKeys(user.password);
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.urlContains('inventory.html'), 10000);

    const title = await driver.getTitle();

    if (!title.includes('Swag Labs')) {
      throw new Error(`Título inesperado: ${title}`);
    }
  });
});
