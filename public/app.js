document.getElementById('generateBtn').addEventListener('click', async () => {
  const words = document.getElementById('words').value;
  const paragraphs = document.getElementById('paragraphs').value;
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
    output.textContent = 'Нет соединения с сервером (офлайн-режим). API недоступен, но интерфейс работает из кеша!';
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker зарегистрирован!'))
      .catch(err => console.error('Ошибка регистрации SW:', err));
  });
}

