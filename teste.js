const express = require('express');
const ewelink = require('ewelink-api');

const app = express();
const port = 3333;

app.use(express.json());

// Rota principal
app.get('/', (request, response) => {
  return response.json({ message: "Servidor está rodando" });
});

// Rota para realizar toggle do dispositivo
app.post('/', async (request, response) => {
  try {
    const { newState } = request.body;

    if (newState !== 'on' && newState !== 'off') {
      return response.status(400).json({ error: 'O campo "newState" deve ser "on" ou "off".' });
    }

    const connection = new ewelink({
      email: 'william@analio.com.br',
      password: 'wsa172wsa',
      region: 'us',
      APP_ID: 'Uw83EKZFxdif7XFXEsrpduz5YyjP7nTl',
      APP_SECRET: 'mXLOjea0woSMvK9gw7Fjsy7YlFO4iSu6'
    });

    // Toggle do dispositivo com base no newState
    const status = await connection.toggleDevice('10008e9178', { state: newState });
    return response.json({ status });
  } catch (error) {
    console.error('Erro ao realizar toggle do dispositivo:', error);
    return response.status(500).json({ error: 'Erro ao realizar toggle do dispositivo' });
  }
});

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));
