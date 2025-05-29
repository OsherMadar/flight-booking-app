require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
console.log('✅ Server started successfully');
