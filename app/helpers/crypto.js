const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
let key = process.env.CRYPTO_KEY;
key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);

exports.encrypt = (buffer) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  return Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
};

exports.decrypt = (encrypted) => {
  const iv = encrypted.slice(0, 16);
  encrypted = encrypted.slice(16);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
};







