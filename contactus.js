// contactusController.js

exports.showContactUsForm = (req, res) => {
  res.sendFile(__dirname + '/public/contactus.html');
};

exports.processContactUsForm = (req, res) => {
  const { name, email } = req.body;
  // Process the form data
  res.redirect('/success');
};
