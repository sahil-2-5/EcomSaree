const nodemailer = require("nodemailer");

const adminSignupOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Admin OTP Code",
    html: `
       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background-color: #d62828; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Admin Portal Verification</h1>
        </div>
        
        <!-- Body -->
        <div style="padding: 24px;">
            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5;">
                You're receiving this email because you requested to sign up for the Saree.com Admin Portal.
            </p>
            
            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5;">
                Please use the following One-Time Password (OTP) to complete your registration:
            </p>
            
            <div style="background-color: #f8f8f8; padding: 16px; text-align: center; margin: 24px 0; border-radius: 4px; border: 1px dashed #e0e0e0;">
                <span style="font-size: 32px; font-weight: bold; color: #d62828; letter-spacing: 4px;">${otp}</span>
            </div>
            
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #666;">
                <strong>Note:</strong> This OTP is valid for 5 minutes only. Do not share this code with anyone.
            </p>
            
            <div style="border-top: 1px solid #e0e0e0; margin: 24px 0; padding-top: 16px;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">
                    If you didn't request this signup, please ignore this email or contact our support team immediately.
                </p>
                <p style="margin: 0; font-size: 14px; color: #666;">
                    <strong>Support Team</strong><br>
                    Saree.com Admin Portal
                </p>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #888;">
            © ${new Date().getFullYear()} Saree.com. All rights reserved.
        </div>
    </div>
    `,
  });
};

module.exports = adminSignupOTP;
