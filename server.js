const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));


const WORDS_POOL = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo'
];


function generationLorem(wordsCount, paragraphsCount) {
  const paragraphs = [];

  for (let p = 0; p < paragraphsCount; p++) {
    const currentParagraph = [];
    for (let w = 0; w < wordsCount; w++) {
      const randomWord = WORDS_POOL[Math.floor(Math.random() * WORDS_POOL.length)];
      currentParagraph.push(w === 0 ? randomWord[0].toUpperCase() + randomWord.slice(1) : randomWord);
    }
    paragraphs.push(currentParagraph.join(' ') + '.');
  }

  return paragraphs.join('\n\n');
}


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});


app.get('/api/lorem', (req, res) => {
  const rawWords = req.query.words !== undefined ? req.query.words : '20';
  const rawParagraphs = req.query.paragraphs !== undefined ? req.query.paragraphs : '1';

  const words = Number(rawWords);
  const paragraphs = Number(rawParagraphs);

  const isValidWords = Number.isInteger(words) && words > 0 && words <= 1000;
  const isValidParagraphs = Number.isInteger(paragraphs) && paragraphs > 0 && paragraphs <= 50;

  if (!isValidWords || !isValidParagraphs) {
    return res.status(400).json({
      error: 'Параметры words (1-1000) и paragraphs (1-50) должны быть положительными целыми.'
    });
  }

  const generateText = generationLorem(words, paragraphs);

  res.json({
    words: words,
    paragraphs: paragraphs,
    text: generateText
  });
});


app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
})


