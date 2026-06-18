# 🎓 Help Me Complete My BYU Tuition

A fundraiser website to support Sifiso Mokhele's BYU education journey.

## 📖 My Story

Hi, my name is **Sifiso Mokhele**, and I am currently pursuing a **Bachelor of Applied Science in Information Technology through BYU Pathway Worldwide**. This education is very important to me because it is helping me build the skills I need to create a better future for myself and contribute meaningfully in the tech industry.

I have been working hard toward completing my studies, but I've hit a small financial hurdle.

## 🎯 The Goal

I am raising **$90** to cover my current BYU tuition payment. While this amount may seem small, it makes a big difference in helping me stay on track with my studies and continue progressing toward my degree.

## 🙏 Why Your Help Matters

Your support will:

- ✅ Help me stay enrolled in my courses
- ✅ Allow me to continue building critical IT skills
- ✅ Bring me one step closer to graduating in 2027
- ✅ Reduce financial stress so I can focus on learning

Every contribution, no matter how small, brings me closer to reaching my goal.

## 💡 How You Can Help

- **Donate**: Any amount helps and is deeply appreciated
- **Share**: If you're unable to give, sharing this fundraiser with others would mean a lot

## 🌱 A Message of Gratitude

Thank you for taking the time to read my story and support my educational journey. Your kindness and generosity truly make a difference.

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js and npm (if running a local server)
- A modern web browser
- PayPal account with API credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/donm8015/fundraiser-site2.git
cd fundraiser-site2
```

2. Create a `.env` file in the root directory (or update the existing one):
```
PROJECT_PATH=C:\Users\User\myprojects\fundraiser-site2
PAYPAL_CLIENT_ID=your_paypal_client_id_here
FUNDRAISER_GOAL=90
FUNDRAISER_CURRENCY=USD
```

3. Open `index.html` in your web browser, or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# or using Node.js
npx http-server

# or using Live Server in VS Code
# Install "Live Server" extension and right-click index.html -> "Open with Live Server"
```

4. Navigate to `http://localhost:8000` and start accepting donations!

### Environment Variables

- `PROJECT_PATH`: Local project directory path
- `PAYPAL_CLIENT_ID`: Your PayPal Client ID for processing donations
- `FUNDRAISER_GOAL`: Target fundraising amount (default: $90)
- `FUNDRAISER_CURRENCY`: Currency code (default: USD)

## 📝 Configuration

The website includes:
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **PayPal Integration**: One-click donation processing
- **Multiple Donation Options**: Preset amounts ($5, $10, $25, $50, $90) or custom amounts
- **Progress Tracking**: Visual progress bar toward the fundraising goal
- **Social Sharing**: Share buttons for Facebook, Twitter, and Email

### Customization

To customize the website, edit `index.html`:
- Line 1-10: Page title and meta information
- Line ~300: PayPal Client ID (already configured)
- Update donation amounts in the JavaScript section if needed

## 🔒 Security Notes

- ⚠️ **IMPORTANT**: Never commit `.env` file to version control
- ✅ The `.env` file is already in `.gitignore` for protection
- Keep your PayPal Client ID confidential
- Always use HTTPS in production environments

## 🚀 Deployment

### Deploy to GitHub Pages

1. Go to your repository Settings
2. Navigate to "Pages" section
3. Set Source to "Deploy from a branch"
4. Select `main` branch and `/root` folder
5. Your site will be live at `https://donm8015.github.io/fundraiser-site2`

### Deploy to Other Platforms

- **Netlify**: Connect your GitHub repo directly
- **Vercel**: Import project from GitHub
- **Heroku**: Push with Git or connect GitHub repo
- **Traditional Hosting**: Upload `index.html` via FTP

## 📞 Support

For issues or questions:
1. Check the `.env` file is properly configured
2. Ensure PayPal Client ID is valid and active
3. Check browser console for error messages (F12 Developer Tools)

## 📄 License

This project is open source and available for personal use.

---

**Created with ❤️ for educational dreams**

*Last Updated: 2024*
