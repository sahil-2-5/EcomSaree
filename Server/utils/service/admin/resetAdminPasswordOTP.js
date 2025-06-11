const nodemailer = require("nodemailer");

const resetAdminPasswordOTP = async (email, otp) => {
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
    subject: "Password Reset Verification Code",
    html: `
       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
        <!-- Header -->
        <div style="background-color: #d32f2f; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">Admin Password Reset</h2>
        </div>
        
        <!-- Content -->
        <div style="padding: 24px;">
            <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.5; color: #333;">
                You recently requested to reset your password for the <strong>Saree.com Admin Portal</strong>. 
                Use the verification code below to proceed:
            </p>
            
            <!-- OTP Box -->
            <div style="background-color: #ffffff; border: 1px dashed #d32f2f; border-radius: 6px; padding: 20px; text-align: center; margin: 24px 0;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Your verification code:</p>
                <div style="font-size: 36px; font-weight: bold; color: #d32f2f; letter-spacing: 4px; margin: 10px 0;">${otp}</div>
                <p style="margin: 8px 0 0 0; font-size: 13px; color: #888;">Expires in 10 minutes</p>
            </div>
            
            <!-- Security Notice -->
            <div style="background-color: #fff8f8; border-left: 4px solid #d32f2f; padding: 12px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 13px; color: #d32f2f;">
                    <strong>Important:</strong> Never share this code. Saree.com will never ask for your verification code.
                </p>
            </div>
            
            <!-- Secondary Info -->
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #555; line-height: 1.5;">
                If you didn't request this password reset, please secure your account by changing your password immediately.
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f1f1f1; padding: 16px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 8px 0;">Need help? Contact <a href="mailto:support@saree.com" style="color: #d32f2f; text-decoration: none;">support@saree.com</a></p>
            <p style="margin: 0;">© ${new Date().getFullYear()} Saree.com. All rights reserved.</p>
        </div>
    </div>
  `,
  });
};

module.exports = resetAdminPasswordOTP;
