const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
