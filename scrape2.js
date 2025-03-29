const { By, Builder, Browser, until } = require("selenium-webdriver");
const assert = require("assert");

(async () => {
  let driver;

  console.log("start");
  try {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    await driver.get("https://finance.yahoo.com/quote/PNNT");
    await driver.manage().setTimeouts({ implicit: 500 });

    // First close the consent form
    let rejectAllButton = await driver.findElement(By.className("reject-all"));
    rejectAllButton.click();

    // start example
    await driver.wait(until.elementLocated(By.className("livePrice")), 15000);
    let quoteBox = await driver.findElement(By.className("livePrice"));
    let quoteValue = await quoteBox.getText();
    console.log("QuoquoteValuelue", quoteValue);

    //let quoteBox = await driver.findElement(By.className("livePrice"));
    // let submitButton = await driver.findElement(By.css("button"));

    // let message = await driver.findElement(By.id("message"));
    // let value = await message.getText();
    // assert.equal("Received!", value);
    // console.log("received value", value);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("finally");
    await driver.close();
  }
  console.log("done");
})();
