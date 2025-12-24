import { generateCsvFromAnalysis } from '../lib/csv/index';

/**
 * script to be run via ts-node or compiled JS
 * triggers the full analysis and CSV generation cycle.
 */
async function main() {
  console.log('--- Starting Weekly Analysis Cycle ---');
  try {
    const outputPath = await generateCsvFromAnalysis();
    console.log(`Success! New CSV generated at: ${outputPath}`);
  } catch (error) {
    console.error('Error during analysis cycle:', error);
    process.exit(1);
  }
}

main();
