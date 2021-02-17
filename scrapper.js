const puppeteer = require('puppeteer')
const fs = require('fs')

const webScrapper = async url => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: {
                width: 1920,
                height:1080
            },
            args:['--window-size=1920,1080']
        })

        const page = await browser.newPage()

        await page.goto(url, {
            waitUntil: 'networkidle2'
        })

        //Almacenamiento de datos
        let data = {
            profile: {
                industrySegment: [],
                role: [],
                region: []
            },
            general: {
                question: '',
                answers: []
            },
            delta: {
                data: {
                    question: '',
                    answers: []
                },
                enterprise: {
                    question: '',
                    answers: []
                },
                leadership: {
                    question: '',
                    answers: []
                },
                targets: {
                    question: '',
                    answers: []
                },
                analytics: {
                    question: '',
                    answers: []
                },
                technology: {
                    question: '',
                    answers: []
                },
                techniques: {
                    question: '',
                    answers: []
                }
            }
        }

        //Recogida y almacenamiento de las opciones de los select iniciales de Profile.
        const selectIS = await page.$$eval('#segment option', options => options.map(opt => opt.value))
        const selectRole = await page.$$eval('#role option', options => options.map(opt => opt.value))
        const selectRegion = await page.$$eval('#region option', options => options.map(opt => opt.value))

        //Eliminación del primer valor innecesario de todos los select.
        selectIS.shift()
        selectRole.shift()
        selectRegion.shift()

        //Guardado de datos de profile
        data.profile.industrySegment = selectIS
        data.profile.role = selectRole
        data.profile.region = selectRegion

        //Selección para continuar en el formulario.
        await page.select('#segment', selectIS[Math.floor(Math.random() * selectIS.length)])
        await page.select('#role', selectRole[Math.floor(Math.random() * selectRole.length)])
        await page.select('#region', selectRegion[Math.floor(Math.random() * selectRegion.length)])

        await page.waitForTimeout(500)
        await page.click('.next-button')

        //Recogida de datos de General.
        data.general.question = await page.$eval('.explanation', text => text.textContent)
        data.general.answers = await page.$$eval('.general-question', answers => answers.map(answer => answer.textContent))

        await page.waitForTimeout(500)
        await page.click('.next-button')

        //Recogida de datos de Delta / Data
        data.delta.data.question = await page.$eval('.delta-question', text => text.textContent)
        data.delta.data.answers = await page.$$eval('.radio-flex-container label', labels => labels.map(label => label.textContent))

        await page.click(`#question${Math.floor(Math.random() * 5)}`)
        await page.waitForTimeout(500)
        await page.click('.next-button')

        //Recogida de datos de Delta / Enterprise
        data.delta.enterprise.question = await page.$eval('.delta-question', text => text.textContent)
        data.delta.enterprise.answers = await page.$$eval('.radio-flex-container label', labels => labels.map(label => label.textContent))

        await page.click(`#question${Math.floor(Math.random() * 5)}`)
        await page.waitForTimeout(500)
        await page.click('.next-button')

        //Recogida de datos de Delta / Leadership
        data.delta.leadership.question = await page.$eval('.delta-question', text => text.textContent)
        data.delta.leadership.answers = await page.$$eval('.radio-flex-container label', labels => labels.map(label => label.textContent))

        await page.click(`#question${Math.floor(Math.random() * 5)}`)
        await page.waitForTimeout(500)
        await page.click('.next-button')

        //Recogida de datos de Delta / Targets
        data.delta.targets.question = await page.$eval('.delta-question', text => text.textContent)
        data.delta.targets.answers = await page.$$eval('.radio-flex-container label', labels => labels.map(label => label.textContent))

        await page.click(`#question${Math.floor(Math.random() * 5)}`)
        await page.waitForTimeout(500)
        await page.click('.next-button')

        //Recogida de datos de Delta / Analytics
        data.delta.analytics.question = await page.$eval('.delta-question', text => text.textContent)
        data.delta.analytics.answers = await page.$$eval('.radio-flex-container label', labels => labels.map(label => label.textContent))

        await page.click(`#question${Math.floor(Math.random() * 5)}`)
        await page.waitForTimeout(500)
        await page.click('.next-button')

        //Recogida de datos de Delta / Technology
        data.delta.technology.question = await page.$eval('.delta-question', text => text.textContent)
        data.delta.technology.answers = await page.$$eval('.radio-flex-container label', labels => labels.map(label => label.textContent))

        await page.click(`#question${Math.floor(Math.random() * 5)}`)
        await page.waitForTimeout(500)
        await page.click('.next-button')

        //Recogida de datos de Delta / Techniques
        data.delta.techniques.question = await page.$eval('.delta-question', text => text.textContent)
        data.delta.techniques.answers = await page.$$eval('.radio-flex-container label', labels => labels.map(label => label.textContent))

        fs.writeFileSync('./result.json', JSON.stringify(data))

    } catch(err) {
        console.log(err)
    }
}

webScrapper('https://ama.iianalytics.com/')