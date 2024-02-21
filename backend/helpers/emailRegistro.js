import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    // configuracion necesaria desde mailtrap
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    

    // Enviar el email 
    const { email, nombre, token} = datos

    const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes Veterinaria MERN",
        to: email,
        subject: "Confirmar la cuenta en APV",
        text: "Comprobar la nueva cuenta en APV",
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
                <p>Tu cuenta ya esta lista, solo debes confirmar el email en el 
                siguiente enlace para empezar a administrar tus pacientes:
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>

                <p>Si tu no creaseta esta cuenta, puedes ignorar este mensaje</p>
        `
    });

    console.log('Mensaje enviado: %s', info.messageId);

};

export default emailRegistro