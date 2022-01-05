const sharp = require('sharp');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require('fs')
var readline = require('readline');
var rl = readline.createInterface(
    process.stdin, process.stdout);
puppeteer.use(StealthPlugin())
console.clear()
rl.question('Github Username => ', async (githubusername) => {
    puppeteer.launch({
        headless: true
    }).then(async browser => {
        console.log('Recherche de stats en cours...')
        const page = await browser.newPage()
        await page.goto(`https://github-readme-stats.vercel.app/api?username=${githubusername}&show_icons=true&theme=dark&count_private=true`)
        await page.setViewport({
            width: 1920,
            height: 1080
        })
        await page.waitForTimeout(3000)
        await page.screenshot({
            path: 'screenshot.jpeg',
            fullPage: false
        })
        await browser.close()
        let originalImage = 'screenshot.jpeg';
        let outputImage = 'stats.jpeg';
        sharp(originalImage).extract({
                width: 490,
                height: 192,
                left: 2,
                top: 1
            }).toFile(outputImage)
            .then(function (new_file_info) {
                //fs.unlinkSync('screenshot.jpeg')
                console.clear()
                console.log('Stats enregistrées dans votre dossier!')
            })
            .catch(function (err) {
                console.clear()
                console.log('Une erreur est survenue!')
            });
    })
});

//