const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.email);

const contact = (req,res) => {
    res.render('contact')
}

const sendMail = (req,res) => {
    const msg = {
        to: 'tawraat0187@gmail.com',
        from: `${req.body.name}@dcodelogic.com`,
        subject: 'From a client',
        text: req.body.message,
      }
      sgMail
        .send(msg)
        .then(() => {
          res.send("Thanks for sendig email!");
        })
        .catch((error) => {
          res.send("An Error occured!");
        })
}

exports.contact = contact
exports.sendMail = sendMail