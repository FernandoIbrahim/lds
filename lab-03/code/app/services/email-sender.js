const nodemailer = require('nodemailer');

/**
 * Método para enviar e-mail
 * 
 * @param {string} to Endereço de e-mail do destinatário
 * @param {string} subject Assunto do e-mail
 * @param {string} text Corpo do e-mail (texto simples)
 * @param {string} html Corpo do e-mail (em HTML, opcional)
 * @returns {Promise} 
 */
async function sendEmail(to, subject, text, html = '') {

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'offut14@gmail.com', 
      pass: 'sssssssss', 
    },
  });

  // Configuração da mensagem
  const mailOptions = {
    from: 'offut14@gmail.com',
    to: to, 
    subject: subject, 
    text: text, 
    html: html, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.response);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

module.exports = sendEmail;