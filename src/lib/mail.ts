import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'faizankhurshid93@gmail.com',
        pass: 'njbldahjfgzyhleg', // Note: Ideally this should be in .env
    },
});

export const sendVerificationEmail = async (email: string, token: string) => {
    const domain = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verificationUrl = `${domain}/verify-email?token=${token}`;

    const mailOptions = {
        from: '"LawyerUp" <faizankhurshid93@gmail.com>',
        to: email,
        subject: 'Verify your email address',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welcome to LawyerUp!</h2>
                <p>Please verify your email address to complete your registration.</p>
                <div style="margin: 20px 0;">
                    <a href="${verificationUrl}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
                </div>
                <p>Or copy and paste this link in your browser:</p>
                <p><a href="${verificationUrl}">${verificationUrl}</a></p>
                <p>This link will expire in 24 hours.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};
