const ActivationContent = ({ userName, activationUrl }) => {
    return `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; color: #333;">
        <!-- Preheader and Header -->
        <div style="text-align: center; padding: 20px 0; font-size: 12px; color: #888;">
            Activate your account to start with G-Market!
        </div>
        <div style="background-color: #73bd3a; padding: 30px 0; text-align: center;">
            <img src="https://drive.google.com/uc?export=download&id=1aOOxDPWJExktaWb2KnSR7lffGqMxl9Nj" alt="Logo" style="height: 50px;">
        </div>

        <!-- Main Content -->
        <div style="background-color: #ffffff; padding: 30px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #73bd3a;">Welcome ${userName}!</h1>
            <p style="text-align: left; color: #333;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
            <a href=${activationUrl} style="display: inline-block; background-color: #73bd3a; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Confirm Account</a>
            <p style="text-align: left; color: #333;">If that doesn't work, copy and paste the following link in your browser:</p>
            <p style="word-wrap: break-word;"><a href=${activationUrl} style="color: #73bd3a;">${activationUrl}</a></p>

            <p style="text-align: left; color: #333;">If you have any questions, just reply to this email, we’re always happy to help out.</p>
            <p style="text-align: left; color: #333; font-weight: semi-bold;">Cheers,<br>Gaisano Malls of Cebu</p>
        </div>

        <!-- Help Section -->
        <div style="background-color: #C8E5B1; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #73bd3a;">Need more help?</h3>
            <p><a href="HELP_LINK" style="color: #73bd3a; text-decoration: underline;">We’re here, ready to talk</a></p>
        </div>

        <!-- Footer -->
        <div style="font-size: 12px; text-align: left; color: #888; padding: 20px;">
            <p><a href="DASHBOARD_LINK" style="color: #888; text-decoration: none;">G-Market</a> &bull; <a href="BILLING_LINK" style="color: #888; text-decoration: none;">Activation</a> &bull; <a href="HELP_LINK" style="color: #888; text-decoration: none;">Help</a></p>
            <p style"color: #888;">You received this email because you just signed up for a new account. If it looks weird, <a href="BROWSER_VIEW_LINK" style="color: #000; text-decoration: underline;">view it in your browser</a>.</p>
            <p style="color: #888;">If these emails get annoying, please feel free to <a href="UNSUBSCRIBE_LINK" style="color: #000; text-decoration: underline;">unsubscribe</a>.</p>
            <p>Gaisano Malls of Cebu - 1234 Main Street - Anywhere, MA - 56789</p>
        </div>
        </div>
    `;
  };
  
  module.exports = ActivationContent;
  