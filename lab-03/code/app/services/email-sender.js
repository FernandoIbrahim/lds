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
      user: 'your-email@gmail.com', 
      pass: 'your-email-password', 
    },
  });

  // Configuração da mensagem
  const mailOptions = {
    from: 'your-email@gmail.com',
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

sendEmail('recipient@example.com', 'Assunto do E-mail', 'Corpo do e-mail em texto')
  .then(() => console.log('E-mail enviado com sucesso!'))
  .catch((err) => console.error('Erro ao enviar e-mail:', err));
