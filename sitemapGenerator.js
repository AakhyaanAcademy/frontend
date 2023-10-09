const fs = require('fs')
const axios = require('axios')

const FRONTEND = "https://aakhyaan.org"
const BACKEND = "https://api.aakhyaan.org"

const dynamicXml = async () => {
    const programs = await axios.get(BACKEND + `/program/list`)
    programs.data?.data?.map(async program => {
        //details page
        fs.appendFileSync('./public/sitemap.xml', addPage(`/programmes/details/${program._id}`))

        //programs in programmes
        fs.appendFileSync('./public/sitemap.xml', addPage(`/programmes/${program._id}`))

        //programs in mcqs
        fs.appendFileSync('./public/sitemap.xml', addPage(`/mcqs/${program.courseId}`))

        //chapterwise-test
        fs.appendFileSync('./public/sitemap.xml', addPage(`/mcqs/${program.courseId}/chapterwise-test`))

        //mock-test
        fs.appendFileSync('./public/sitemap.xml', addPage(`/programmes/${program.courseId}/mock-test`))

        const subjects = await axios.get(BACKEND + `/subjects/${program.courseId}/list`)
        subjects.data?.data?.subjects?.map(async subject => {

            //chapterwise-test subject
            fs.appendFileSync('./public/sitemap.xml', addPage(`/mcqs/${program.courseId}/chapterwise-test/${subject._id}`))

            //each subject in programmes
            fs.appendFileSync('./public/sitemap.xml', addPage(`/programmes/${program.courseId}/${subject._id}`))

            const chaptersWithTopics = await axios.get(BACKEND + `/chapters/${program.courseId}/${subject._id}/listwithtopic`)
            chaptersWithTopics.data?.data?.chapters?.map(chapter => {
                chapter?.topics?.map(topic => {

                    //chapterwise-test chapter
                    fs.appendFileSync('./public/sitemap.xml', addPage(`/mcqs/${program.courseId}/chapterwise-test/${subject._id}/${chapter._id}`))

                    //each topic in program
                    fs.appendFileSync('./public/sitemap.xml', addPage(`/programmes/${program.courseId}/${subject._id}/${chapter._id}/${topic._id}`))
                })
            })
        })
    })
}

const sitemapHead = () =>
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`


const sitemapTail = () =>
    `
    </urlset>`

function addPage(page) {
    return `
        <url>
            <loc>${FRONTEND}${page}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>`
}


const main = () => {
    fs.writeFileSync('./public/sitemap.xml', "")

    fs.appendFileSync('./public/sitemap.xml', sitemapHead())
    const routes = ["/", "/terms-and-conditions", "/signup", "/privacy-policy", "/login", "/forgot-password", "/faqs", "/contact-us", "/about-us", "/mcqs"]
    routes.map(route => {
        fs.appendFileSync('./public/sitemap.xml', addPage(route))
    })

    const func = async () => {
        await dynamicXml()
        setTimeout(() => fs.appendFileSync('./public/sitemap.xml', sitemapTail()), 10000)
    }
    func()
}

main()