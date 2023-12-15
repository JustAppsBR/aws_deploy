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
    const { email, password, region, deviceId, newState } = request.body;

    if (!email || !password || !region || !deviceId || !newState) {
      return response.status(400).json({ error: 'Parâmetros faltando. Certifique-se de fornecer email, password, region, deviceId e newState.' });
    }

    const connection = new ewelink({
      email,
      password,
      region,
      APP_ID: 'Uw83EKZFxdif7XFXEsrpduz5YyjP7nTl',
      APP_SECRET: 'mXLOjea0woSMvK9gw7Fjsy7YlFO4iSu6'
    });

    // Toggle do dispositivo com base no newState
    const status = await connection.toggleDevice(deviceId, { state: newState });
    return response.json({ status });
  } catch (error) {
    console.error('Erro ao realizar toggle do dispositivo:', error);
    return response.status(500).json({ error: 'Erro ao realizar toggle do dispositivo' });
  }
});

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));
