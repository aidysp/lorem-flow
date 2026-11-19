const OFFLINE_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo'
];


function generateOfflineLorem(wordsCount, paragraphsCount) {
  const paragraphs = [];
  for (let p = 0; p < paragraphsCount; p++) {
    const currentParagraph = [];
    for (let w = 0; w < wordsCount; w++) {
      const randomWord = OFFLINE_WORDS[Math.floor(Math.random() * OFFLINE_WORDS.length)];
      currentParagraph.push(w === 0 ? randomWord[0].toUpperCase() + randomWord.slice(1) : randomWord);
    }
    paragraphs.push(currentParagraph.join(' ') + '.');
  }
  return paragraphs.join('\n\n');
}

document.getElementById('generateBtn').addEventListener('click', async () => {
  const words = Number(document.getElementById('words').value);
  const paragraphs = Number(document.getElementById('paragraphs').value);
  const output = document.getElementById('output');

  try {
 
    const response = await fetch(`/api/lorem?words=${words}&paragraphs=${paragraphs}`);
    const data = await response.json();

    if (!response.ok) {
      output.textContent = `Ошибка (${response.status}): ${data.error}`;
      return;
    }

    output.textContent = data.text;
  } catch (err) {
 
    if (!Number.isInteger(words) || words <= 0 || words > 1000 ||
        !Number.isInteger(paragraphs) || paragraphs <= 0 || paragraphs > 50) {
      output.textContent = 'Ошибка (Офлайн): Параметры должны быть целыми числами (слова: 1-1000, абзацы: 1-50).';
      return;
    }

    const offlineText = generateOfflineLorem(words, paragraphs);
    output.textContent = `[Офлайн-режим]\n\n${offlineText}`;
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker зарегистрирован!'))
      .catch(err => console.error('Ошибка регистрации SW:', err));
  });
}



document.getElementById('copyBtn').addEventListener('click', () => {
  const text = document.getElementById('output').textContent;
  const copyBtn = document.getElementById('copyBtn');

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = 'Скопировано!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Копировать';
      copyBtn.classList.remove('copied');
    }, 2000);
  });
});

