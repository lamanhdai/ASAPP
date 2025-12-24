const fs = require('fs');

const line2 = `,TOSY Magnet Pyramid Stone - 1 Cube Transforms into 1 Billion Shapes,https://www.amazon.com/dp/B0DMSVXBDV?tag=brucebookst06-20&linkCode=ll2&language=en_US,"https://images-na.ssl-images-amazon.com/images/I/81uMwvkWmHL._AC_UL450_SR450,320_.jpg",$22.76,Best selling product: TOSY Magnet Pyramid Stone - 1 Cube Transforms into 1 Billion Shapes`;

const line10 = `,"TOSY Flying Ring - Super Bright, Lost Mode, Auto Light Up",https://www.amazon.com/dp/B0DDL1FC2J?tag=brucebookst06-20&linkCode=ll2&language=en_US,"https://images-na.ssl-images-amazon.com/images/I/91ozB+WhRoL._AC_UL450_SR450,320_.jpg",$17.09,"Best selling product: TOSY Flying Ring - Super Bright, Lost Mode, Auto Light Up"`;

const splitCsv = (str) => {
  const matches = str.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
  if (!matches) return [];
  return matches.map(m => {
    let val = m.replace(/^,/, '');
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1).replace(/""/g, '"');
    }
    return val;
  });
};

console.log('--- Line 2 ---');
console.log(splitCsv(line2));
console.log('Expected length: 6');

console.log('--- Line 10 ---');
console.log(splitCsv(line10));
console.log('Expected length: 6');
