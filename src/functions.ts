import fs from 'fs/promises';

export const addKnowledge = async (knowledge: { [key: string]: string }) => {
  const stringInitialData = await fs.readFile('data.json', {
    encoding: 'utf-8',
  });

  const data: { [key: string]: string }[] = JSON.parse(stringInitialData);

  data.push(knowledge);

  const stringFinalData = JSON.stringify(data);

  fs.writeFile('data.json', stringFinalData, {
    encoding: 'utf-8',
  });
};

export const getAllKnowledge = async () => {
  const stringInitialData = await fs.readFile('data.json', {
    encoding: 'utf-8',
  });

  const data: { [key: string]: string }[] = await JSON.parse(stringInitialData);

  const stringFinalData = JSON.stringify(data);

  fs.writeFile('data.json', stringFinalData, {
    encoding: 'utf-8',
  });
};
