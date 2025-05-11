const fs = require('fs');
const path = require('path');

const urls = [
  {
    loc: 'https://gpacalculator.co.za/',
    priority: '1.0',
    changefreq: 'weekly'
  },

];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return sitemap;
};

const outputPath = path.resolve('./frontend/public/sitemap.xml');
fs.writeFileSync(outputPath, generateSitemap());
console.log(`Sitemap generated at ${outputPath}`);