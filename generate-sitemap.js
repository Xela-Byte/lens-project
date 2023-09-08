const { createWriteStream, existsSync, mkdirSync, writeFile } = require('fs');
const { resolve } = require('path');
const {
    SitemapAndIndexStream,
    SitemapStream,
    EnumChangefreq
} = require('sitemap');

const {
    fetchArticles,
    fetchCategories,
    fetchCompanies
} = require('./api');


const robotsTXT = (sitemap = "", disallow = [], allow = []) => `# Robots.txt generated at ${new Date().toString()}
User-agent: *
${allow.map(link => `Allow: ${link}`).join('\n')}
${disallow.map(link => `Disallow: ${link}`).join('\n')}
Sitemap: ${sitemap}
`;


module.exports = {
    generate: async (hostname = "http://localhost:3000",
        // sitemaps subfolder in public folder
        sitemapsFolder = 'sitemaps',
        // public folder for nextjs
        realFolder = './public',

        // Add paths to disallow in robots.txt
        disallow = ['/api/'],
        // Add paths to Allow in robots.txt
        allow = []) => {
        console.log("Generate sitemap...");

        // Generate index and sitemaps
        const smStream = new SitemapAndIndexStream({
            limit: 10000, // defaults to 45k
            getSitemapStream: (i) => {
                const sitemapStream = new SitemapStream({ hostname });
                const sitemapXml = `sitemap-${i}.xml`;
                const fullPath = resolve(realFolder, sitemapsFolder);
                if (!existsSync(fullPath)) {
                    mkdirSync(fullPath, { recursive: true });
                }
                sitemapStream.pipe(createWriteStream(resolve(fullPath, sitemapXml)));

                console.log("Generate robots.txt file...")
                const robotsContent = robotsTXT(`${hostname}/sitemap.xml`, disallow, allow);
                writeFile(resolve(realFolder, 'robots.txt'), robotsContent, function (err, data) {
                    if (err) {
                        console.log("Generate robots.txt file Failed!", err);
                        throw err;
                    }
                    console.log("Generate robots.txt file Done!");
                });

                return [
                    new URL(sitemapXml, `${hostname}/${sitemapsFolder}/`).toString(),
                    sitemapStream,
                ];
            }
        });
        smStream.pipe(createWriteStream(resolve(realFolder, 'sitemap.xml')));

        // Generate paths for static pages
        smStream.write({
            url: '/',
            lastmod: new Date(),
            changefreq:
                EnumChangefreq.HOURLY
        });

        // Generate paths for categories
        await fetchCategories()
            .then(response => {
                const categories = response.data.data;
                categories.map(category => {
                    smStream.write({
                        url: `/${category.attributes.slug}`,
                        lastmod: category.attributes.updatedAt,
                        changefreq: category.change_freq ? category.change_freq : EnumChangefreq.DAILY,
                    });
                });
            })
            .catch(err => {
                console.log("Something wrong with getting categories for sitemap -> ", err);
                throw err;
            });

        // Generate paths for companies
        await fetchCompanies()
            .then(response => {
                const companies = response.data.data;
                companies.map(company => {
                    smStream.write({
                        url: `/${company.attributes.slug}`,
                        lastmod: company.attributes.updatedAt,
                        changefreq: company.change_freq ? company.change_freq : EnumChangefreq.DAILY,
                    });
                });
            })
            .catch(err => {
                console.log("Something wrong with getting companies for sitemap -> ", err);
                throw err;
            });

        // Generate paths for Posts
        await fetchArticles()
            .then(response => {
                const articles = response.data.data;
                articles.map(article => {
                    if (article.attributes.slug) {
                        const collection = article.attributes.category.data ? article.attributes.category.data.attributes.slug : article.attributes.company.data.attributes.slug
                        smStream.write({
                            url: `${collection}/${article.attributes.slug}`,
                            lastmod: article.attributes.updatedAt,
                            changefreq: article.attributes.change_freq ? article.attributes.change_freq : EnumChangefreq.WEEKLY,
                        });
                    }
                });

            })
            .catch(reason => {
                console.log("Something wrong with getting articles for sitemap -> ", reason);
                throw reason;
            });

        smStream.end();
        console.log("Generate sitemap Done!");
    }
}