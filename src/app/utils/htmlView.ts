import { IContactFormData } from "../modules/User/user.interface";



export const resetPasswordUi = (resetUILink: string) => {

  const subject = 'Reset Your Password'
  const html = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="color: #4CAF50; text-align: center;">Password Reset Request</h2>
    <p style="font-size: 16px;">Hello,</p>
    <p style="font-size: 16px;">
        You recently requested to reset your password. Click the button below to set a new password. This link is valid for 10 minutes.
    </p>
    <div style="text-align: center; margin: 20px 0;">
        <a href="${resetUILink}" style="text-decoration: none; background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 5px; font-size: 16px; display: inline-block;">
            Reset Your Password
        </a>
    </div>
    <p style="font-size: 14px; color: #888;">
        If you did not request this, please ignore this email. Your password will remain unchanged.
    </p>
    <p style="font-size: 14px; color: #888; text-align: center;">Thank you!</p>
</div>
      `

  return { subject, html }

}



export const contactUi = (data: IContactFormData) => {
  const { name, email, subject, message } = data;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #4a90e2; text-align: center;">📬 You've Received a New Message</h2>
      <p style="font-size: 16px; line-height: 1.5;">
        <strong>From:</strong> ${name} <br/>
        <strong>Email:</strong> ${email}
      </p>
      <div style="margin: 20px 0; padding: 10px 20px; background-color: #f1f8ff; border-left: 4px solid #4a90e2; border-radius: 5px;">
        <h4 style="color: #4a90e2; margin: 0 0 10px;">Subject: ${subject}</h4>
        <p style="font-size: 16px; color: #555;">${message}</p>
      </div>
      <p style="text-align: center; font-size: 14px; color: #888;">
        <i>If you’re not expecting this email, please disregard it.</i>
      </p>
      <div style="text-align: center; margin-top: 30px;">
        <a href="mailto:${email}" style="text-decoration: none; padding: 10px 15px; background-color: #4a90e2; color: #fff; border-radius: 5px;">Reply to ${data?.name}</a>
      </div>
    </div>
  `;

  return { subject, html };
};


