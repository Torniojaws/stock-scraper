import * as fs from 'fs';

export const readDataFile = async (filename: string) => {
  try {
    const data = await fs.promises.readFile(`./${filename}`, 'utf-8');
    return data;
  } catch (error) {
    console.error('Error reading data file:', error);
    throw error;
  }
};