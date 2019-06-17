const puppeteer = require("puppeteer");
const fs = require("fs");

const generatePdf = async (p, c) => {
    const content = fs.readFileSync(p, 'utf-8');
    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({ cookie: "oneSessionId=" + c });
    await page.setContent(content);
    const buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            left: '0px',
            top: '0px',
            right: '0px',
            bottom: '0px'
        }
    });
    await browser.close();
    return buffer;
}

module.exports = generatePdf;

