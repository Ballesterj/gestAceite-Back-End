

async function getMainPage(req, res) {
  const welcomeMessge = 'Welcome to the main page';
  res.status(200).json({
    message: welcomeMessge 
  });
}

async function getHealthCheck(req, res) {
    res.status(200).json({
        message: 'Server is running'
    });
}

module.exports = {
    getMainPage,
    getHealthCheck
};