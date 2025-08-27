# Adam Cruz - Resume Site

A professional portfolio website showcasing software engineering and data science skills, with integrated contact form functionality.

## Project Structure

```
resume-site/
│
├── README.md             # Project overview and instructions
├── LICENSE               # License information (in docs/)
├── .gitignore            # Files/directories Git should ignore
├── netlify.toml          # Netlify deployment configuration
│
├── docs/                 # Documentation files
│   ├── README.md         # Detailed project documentation
│   └── LICENSE           # License information
│
├── src/                  # Main source code
│   ├── index.html        # Main portfolio homepage
│   ├── landing.html      # Resume & Letter of Objective landing page
│   ├── cruz_resume.html  # Interactive resume page
│   ├── cruz_letterOfObjective.html # Interactive Letter of Objective page
│   ├── success.html      # Form submission success page
│   ├── styles.css        # Main stylesheet
│   ├── script.js         # JavaScript functionality
│   ├── robots.txt        # Search engine configuration
│   └── assets/           # Static assets
│       ├── documents/    # PDF files
│       │   ├── cruz_resume.pdf
│       │   └── cruz_letterOfObjective.pdf
│       └── landing_page_picture.jpeg # Profile image
```

## Features

- **Responsive Design**: Mobile-first approach with modern CSS
- **Contact Form**: Integrated form with email notifications via Netlify Functions
- **Interactive Resume**: HTML version with downloadable PDF
- **Letter of Objective**: Professional Letter of Objective with multiple themes
- **Spam Protection**: reCAPTCHA integration
- **Rate Limiting**: Prevents form abuse
- **Success Page**: Personalized confirmation messages

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Netlify Functions (Node.js)
- **Email**: Nodemailer with Gmail
- **Deployment**: Netlify
- **Security**: reCAPTCHA v2 Invisible

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Configure environment variables** in Netlify:
   - `GMAIL_APP_PASSWORD`: Gmail app password
   - `RECAPTCHA_SECRET_KEY`: reCAPTCHA secret key
4. **Update reCAPTCHA site key** in `src/index.html`
5. **Deploy to Netlify**

## Contact Form Setup

The contact form requires:
- Gmail account with 2FA enabled
- App password generated for "Mail"
- reCAPTCHA site and secret keys
- Netlify environment variables configured

## License

See [docs/LICENSE](docs/LICENSE) for license information.

## Contact

- **Email**: aec0713@westminsteru.edu
- **LinkedIn**: [Adam Cruz](https://www.linkedin.com/in/cruzadam91/)
- **GitHub**: [cruzaddy91](https://github.com/cruzaddy91) 