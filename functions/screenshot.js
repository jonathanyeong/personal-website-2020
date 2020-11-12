const chromium = require("chrome-aws-lambda");
const fs = require("fs");
const path = require("path");

// Whats posts?
module.exports = async posts => {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  // Here we'll add the screenshot logic

  await browser.close();
};
