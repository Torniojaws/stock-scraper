import * as fs from 'fs';

export const readDataFile = async (filename: string) => {
  try {
    const siblingUrl = new URL(`../${filename}`, import.meta.url);
    const data = await fs.promises.readFile(siblingUrl, 'utf-8');
    return data;
  } catch (error) {
    console.error('Error reading data file:', error);
    throw error;
  }
};