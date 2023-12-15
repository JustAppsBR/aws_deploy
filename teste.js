const express = require('express');
const ewelink = require('ewelink-api');

const app = express();

app.get('/', async (request, response) => {
  try {
    const connection = new ewelink({
      email: 'william@analio.com.br',
      password: 'wsa172wsa',
      region: 'us',
      APP_ID: 'Uw83EKZFxdif7XFXEsrpduz5YyjP7nTl',
      APP_SECRET: 'mXLOjea0woSMvK9gw7Fjsy7YlFO4iSu6'
    });

    // Obter o status do dispositivo
    const status = await connection.getDevicePowerState('10008e9178');

    // Retornar o status como resposta da API
    return response.json({ status });
  } catch (error) {
    console.error('Erro ao obter status do dispositivo:', error);
    return response.status(500).json({ error: 'Erro ao obter status do dispositivo' });
  }
});

app.listen(4000, () => console.log('Server is running'));
