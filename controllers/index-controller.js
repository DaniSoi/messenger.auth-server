const path = require('path');

function getIndex (req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
}

module.exports = {
  getIndex
};
