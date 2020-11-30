const Email = require('./../utils/mailer');

exports.subscribe = async (req, res, next) => {
  const newSubscriber = {
    name: 'amine ouahabi',
    email: req.body.email
  };

  url = 'https://google.com';

  try {
    console.log(req.body.email);
    await new Email(newSubscriber, url).sendWelcome();
    console.log('after sending email');
    res.status(200).json({ status: 'success', message: 'hello msg sent' });
  } catch (err) {
    res.status(400).json({ status: 'err', message: err.message });
  }
};
