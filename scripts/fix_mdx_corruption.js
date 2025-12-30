
const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

function fixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('price: "320_.jpg""')) {
    return;
  }

  console.log(`Fixing ${path.basename(filePath)}...`);

  const descriptionMatch = content.match(/description: "(\$[^"]+)"/);
  const realPrice = descriptionMatch ? descriptionMatch[1] : '';

  const imagePart1Match = content.match(/image: ""([^"]+)"/);
  const imagePart2Match = content.match(/price: "([^"]+)""/);

  let imagePart1 = imagePart1Match ? imagePart1Match[1] : '';
  let imagePart2 = imagePart2Match ? imagePart2Match[1] : '';

  let fullImageUrl = '';
  if (imagePart1 && imagePart2) {
    fullImageUrl = `${imagePart1},${imagePart2}`;
  } else {
    fullImageUrl = imagePart1 || '';
  }

  let newContent = content;

  // Fix Frontmatter
  newContent = newContent.replace(/description: "(\$[^"]+)"/, `description: "Product description for ${realPrice}"`);
  newContent = newContent.replace(/image: ""[^"]+"/, `image: "${fullImageUrl}"`);
  newContent = newContent.replace(/price: "[^"]+""/, `price: "${realPrice}"`);

  // Fix Schema
  newContent = newContent.replace(/"image":"\\"[^"]+"/, `"image":"${fullImageUrl}"`);
  newContent = newContent.replace(/"price":"[^"]+""/, `"price":"${realPrice}"`);
  newContent = newContent.replace(/"description":"\$[^"]+"/, `"description":"Product description"`);

  // Fix Body
  newContent = newContent.replace(/!\[Product Image\]\("([^"]+)\)/, `![Product Image](${fullImageUrl})`);
  newContent = newContent.replace(/\*\*Price:\*\* [^"]+"/, `**Price:** ${realPrice}`);

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Fixed ${path.basename(filePath)}`);
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('Posts directory not found');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR);
  for (const file of files) {
    if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fixFile(path.join(POSTS_DIR, file));
    }
  }
}

main();
