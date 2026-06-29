const fs = require('fs');
const path = require('path');

const domain = 'https://amirthasuperstore.com';

function generateSEO() {
  console.log('Generating SEO mapping files...');

  const constantsPath = path.join(__dirname, '../constants.ts');
  if (!fs.existsSync(constantsPath)) {
    console.error(`Error: constants.ts not found at ${constantsPath}`);
    process.exit(1);
  }

  const constantsContent = fs.readFileSync(constantsPath, 'utf8');

  // Extract blocks to avoid matching wrong IDs
  const statueIdx = constantsContent.indexOf('export const STATUE_PRODUCTS');
  const furnitureIdx = constantsContent.indexOf('export const FURNITURE_PRODUCTS');
  const pujaIdx = constantsContent.indexOf('export const PUJA_PRODUCTS');
  const productsIdx = constantsContent.indexOf('export const PRODUCTS');

  if (statueIdx === -1 || furnitureIdx === -1 || pujaIdx === -1 || productsIdx === -1) {
    console.error('Error: Could not locate product arrays in constants.ts');
    process.exit(1);
  }

  const statueBlock = constantsContent.substring(statueIdx, furnitureIdx);
  const furnitureBlock = constantsContent.substring(furnitureIdx, pujaIdx);
  const pujaBlock = constantsContent.substring(pujaIdx, productsIdx);

  const idRegex = /id:\s*(\d+)/g;
  const productIds = [];

  let match;
  while ((match = idRegex.exec(statueBlock)) !== null) {
    productIds.push(parseInt(match[1], 10));
  }
  while ((match = idRegex.exec(furnitureBlock)) !== null) {
    productIds.push(parseInt(match[1], 10));
  }
  while ((match = idRegex.exec(pujaBlock)) !== null) {
    productIds.push(parseInt(match[1], 10));
  }

  // Deduplicate and sort IDs
  const uniqueIds = [...new Set(productIds)].sort((a, b) => a - b);
  console.log(`Found ${uniqueIds.length} unique products.`);

  const today = new Date().toISOString().split('T')[0];

  // Static routes
  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/products', priority: '0.9', changefreq: 'daily' },
    { path: '/about', priority: '0.7', changefreq: 'weekly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    { path: '/faq', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' }
  ];

  // Category routes
  const categories = [
    'Bronze Statues',
    'Home decor bronze',
    'Furniture',
    'Puja Items'
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 1. Static pages
  staticRoutes.forEach(route => {
    // We provide standard clean URLs for modern search engines, and hash-router variants for compatibility
    const cleanUrl = `${domain}${route.path}`;
    const hashUrl = `${domain}/#${route.path}`;

    xml += `  <url>\n`;
    xml += `    <loc>${hashUrl}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;

    // Also include clean URL to support potential future browser router or SEO fallback redirection
    if (route.path !== '/') {
      xml += `  <url>\n`;
      xml += `    <loc>${cleanUrl}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${(parseFloat(route.priority) - 0.1).toFixed(1)}</priority>\n`;
      xml += `  </url>\n`;
    }
  });

  // 2. Categories
  categories.forEach(category => {
    const encodedCategory = encodeURIComponent(category);
    const hashUrl = `${domain}/#/products?category=${encodedCategory}`;
    const cleanUrl = `${domain}/products?category=${encodedCategory}`;

    xml += `  <url>\n`;
    xml += `    <loc>${hashUrl}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;

    xml += `  <url>\n`;
    xml += `    <loc>${cleanUrl}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  // 3. Products
  uniqueIds.forEach(id => {
    const hashUrl = `${domain}/#/products/${id}`;
    const cleanUrl = `${domain}/products/${id}`;

    xml += `  <url>\n`;
    xml += `    <loc>${hashUrl}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;

    xml += `  <url>\n`;
    xml += `    <loc>${cleanUrl}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += '</urlset>\n';

  // Write sitemap.xml
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Successfully generated sitemap.xml with ${uniqueIds.length * 2 + 16} URLs at ${sitemapPath}`);

  // Write robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;
  const robotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
  console.log(`Successfully generated robots.txt at ${robotsPath}`);

  // Write llms.txt
  const llmsTxt = `# Amirtha Super Store

Amirtha Super Store is a premium online catalog of traditional South Indian handcrafted products. It features high-quality bronze statues, home decor artifacts, puja items, and fine wooden furniture.

## Base URL
- Custom Domain: ${domain}
- GitHub Pages Path: https://vinothkumar0311.github.io/amirtha_super_store/

## Main Navigation Pages
- Home: ${domain}/#/
- All Products: ${domain}/#/products
- About Us: ${domain}/#/about
- Contact: ${domain}/#/contact
- FAQ: ${domain}/#/faq
- Privacy Policy: ${domain}/#/privacy

## Product Categories
- Bronze Statues: ${domain}/#/products?category=Bronze%20Statues
- Home Decor Bronze: ${domain}/#/products?category=Home%20decor%20bronze
- Puja Items: ${domain}/#/products?category=Puja%20Items
- Furniture: ${domain}/#/products?category=Furniture

## Product Details Page Format
- Format: ${domain}/#/products/{id}
- Total available products: ${uniqueIds.length} items.
`;
  const llmsPath = path.join(publicDir, 'llms.txt');
  fs.writeFileSync(llmsPath, llmsTxt, 'utf8');
  console.log(`Successfully generated llms.txt at ${llmsPath}`);
}

generateSEO();
