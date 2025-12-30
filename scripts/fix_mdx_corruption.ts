
import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

function fixFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if file is corrupted
  if (!content.includes('price: "320_.jpg""')) {
    console.log(`Skipping ${path.basename(filePath)} (not corrupted matching exact pattern)`);
    return;
  }

  console.log(`Fixing ${path.basename(filePath)}...`);

  // Extract real price from description
  const descriptionMatch = content.match(/description: "(\$[^"]+)"/);
  const realPrice = descriptionMatch ? descriptionMatch[1] : '';

  if (!realPrice) {
    console.warn(`Could not find price in description for ${path.basename(filePath)}`);
  }

  // Extract image parts from frontmatter
  // image: ""https://...SR450"
  // price: "320_.jpg""
  const imagePart1Match = content.match(/image: ""([^"]+)"/);
  const imagePart2Match = content.match(/price: "([^"]+)""/); // "320_.jpg"

  let imagePart1 = imagePart1Match ? imagePart1Match[1] : '';
  let imagePart2 = imagePart2Match ? imagePart2Match[1] : '';

  // Reconstruct image URL
  // Assuming split happened at comma
  let fullImageUrl = '';
  if (imagePart1 && imagePart2) {
    fullImageUrl = `${imagePart1},${imagePart2}`;
  } else {
    // Fallback if regex fails but file marked as corrupted (shouldn't happen with strict check)
    fullImageUrl = imagePart1 || '';
  }

  // Fix Frontmatter
  let newContent = content;

  // Replace Description
  // Set generic description as the previous one was just the price
  newContent = newContent.replace(/description: "(\$[^"]+)"/, `description: "Product description for ${realPrice}"`);

  // Replace Image line
  newContent = newContent.replace(/image: ""[^"]+"/, `image: "${fullImageUrl}"`);

  // Replace Price line
  newContent = newContent.replace(/price: "[^"]+""/, `price: "${realPrice}"`);


  // Fix Schema
  // "image":"\"Part1" ... "price":"Part2"" ... "description":"$Price"
  // We need to be careful with global replace if patterns repeat

  // Fix schema image
  // It matches "image":"\"...SR450"
  // We want "image":"...SR450,320_.jpg"
  // And remove the extra quote and backslash
  newContent = newContent.replace(/"image":"\\"[^"]+"/, `"image":"${fullImageUrl}"`);

  // Fix schema price (which currently holds garbage suffix)
  newContent = newContent.replace(/"price":"[^"]+""/, `"price":"${realPrice}"`);

  // Fix schema description (which currently holds price)
  newContent = newContent.replace(/"description":"\$[^"]+"/, `"description":"Product description"`);


  // Fix Body
  // ![Product Image]("Part1) -> ![Product Image](FullUrl)
  newContent = newContent.replace(/!\[Product Image\]\("([^"]+)\)/, `![Product Image](${fullImageUrl})`);

  // **Price:** Garbage -> **Price:** RealPrice
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
