# 🌱 EcoMart - Sustainable Shopping Platform

![EcoMart Logo](images/vecteezy_eco-technology-or-environmental-concept-modern-green-city_9730967.jpg)

A modern, responsive e-commerce platform focused on sustainable shopping experiences. Built with vanilla HTML, CSS, and JavaScript, EcoMart provides a clean, eco-friendly interface for users to explore products and learn about sustainable practices.

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local development server (Live Server recommended)

### Installation & Running

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Eco-Mart
   ```

2. **Open with VS Code**

   ```bash
   code .
   ```

3. **Start Live Server**
   - Install Live Server extension in VS Code
   - Right-click on any HTML file and select "Open with Live Server"
   - Server will start on `http://localhost:5501`

## ✨ Features

- 🌿 **Eco-Friendly Design**: Modern, sustainable-themed UI with green color palette
- 📱 **Responsive Layout**: Fully responsive design that works on all devices
- 🔐 **User Authentication**: Complete login/signup system with form validation
- 👥 **Team Portfolio**: Individual developer portfolio pages for team members
- 📝 **Contact Form**: Functional contact form with validation
- 🎨 **Custom Fonts**: Extensive custom font library for unique typography
- 🛒 **Navigation System**: Intuitive navigation with mobile-friendly hamburger menu
- 📊 **Research Section**: Dedicated area for sustainability research and information

## 📁 Project Structure

```
Eco-Mart/
├── CSS/                          # Stylesheets
│   ├── aboutUsPage.css           # About page specific styles
│   ├── contactFormValidation.css # Contact form validation styles
│   ├── loginPage.css             # Login page specific styles
│   ├── loginValidation.css       # Login form validation styles
│   └── styles.css                # Global shared styles
├── fonts/                        # Custom font files
│   ├── Brandon Text fonts        # Professional font family
│   ├── Mayrean.ttf              # Main display font
│   ├── Monopolix fonts          # Alternative font family
│   ├── Ramabhadra-Regular.ttf   # Portfolio page font
│   └── SHRIMP.ttf               # Special use font
├── HTML/                         # HTML pages
│   ├── aboutUsPage.html          # About us page with contact form
│   ├── loginPage.html            # Login and signup forms
│   ├── aadityaprotfolio.html     # Aaditya's portfolio
│   ├── gauravprotfolio.html     # Gaurav's portfolio
│   ├── girishprotfolio.html     # Girish's portfolio
│   ├── johnprotfolio.html        # John's portfolio
│   └── prafulprotfolio.html      # Praful's portfolio
├── images/                       # Image assets
│   ├── Team member photos        # Individual team member images
│   └── Eco-themed background     # Sustainability concept images
├── JS/                          # JavaScript functionality
│   ├── aboutUsPage.js            # Contact form validation
│   └── loginValidation.js       # Login form validation
├── .vscode/                     # VS Code configuration
│   ├── settings.json            # Live server settings (port 5501)
│   └── tasks.json               # VS Code tasks
└── README.md                    # Project documentation
```

## 🛠️ Installation

### Development Setup

1. **Environment Requirements**
   - VS Code (recommended)
   - Live Server extension
   - Modern web browser

2. **File Structure**
   - All HTML files are in the `HTML/` directory
   - CSS files are organized by page functionality in `CSS/`
   - JavaScript files handle form validation in `JS/`
   - Custom fonts are in `fonts/`
   - Images are in `images/`

3. **Running the Application**
   - Open any HTML file in VS Code
   - Right-click and select "Open with Live Server"
   - Or open the file directly in your browser

### Customization

- **Fonts**: Edit `CSS/styles.css` to modify font imports
- **Colors**: Modify the CSS variables in `styles.css`
- **Layout**: Adjust container and grid layouts in respective CSS files
- **Images**: Replace images in `images/` directory
- **Content**: Edit HTML files directly for content changes

## 📖 Usage

### Main Pages

1. **Login Page** (`loginPage.html`)
   - Toggle between Sign In and Sign Up forms
   - Real-time form validation with visual feedback
   - Password visibility toggle
   - Social media login integration ready

2. **About Us Page** (`aboutUsPage.html`)
   - Team member profiles with photos
   - Contact form with validation
   - Company information and values
   - Research section for sustainability content

3. **Portfolio Pages**
   - Individual developer portfolio pages
   - Professional layout with photo and description
   - Grid-based responsive design

### Form Validation

The application includes comprehensive form validation:

- **Login Validation**: Email format, password strength, field requirements
- **Contact Form**: Name, email, phone, and message validation
- **Real-time Feedback**: Visual error indicators and helpful messages

### Navigation

- **Responsive Navigation**: Desktop and mobile-friendly menu
- **Active States**: Current page highlighting
- **Smooth Transitions**: CSS animations for better UX

## 🤝 Contributing

### Development Setup

1. **Clone the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Code Style Guidelines

- **HTML**: Use semantic tags and proper indentation
- **CSS**: Follow BEM naming convention and organize by component
- **JavaScript**: Use ES6+ features and add JSDoc comments
- **File Organization**: Keep related files together in appropriate directories

### Pull Request Process

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes with proper documentation
4. Test all functionality
5. Submit a pull request with clear description

## 🛡️ Security

- **Form Validation**: Client-side validation with proper error handling
- **Input Sanitization**: Basic input sanitization implemented
- **No External Dependencies**: Uses only CDN resources (Font Awesome)
- **Local Development**: Designed for local development with Live Server

### Security Considerations

- Currently implements client-side validation only
- For production deployment, add server-side validation
- Consider implementing HTTPS for production
- Add CSRF protection for forms in production

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Font Awesome**: For the comprehensive icon library
- **Google Fonts**: For additional web font options
- **Team Members**: Aaditya, Gaurav, Girish, John, and Praful for their contributions
- **Eco-Friendly Design Inspiration**: Sustainable web design practices

---

**Built with ❤️ for a sustainable future**

---

_Note: This is a static web application designed for demonstration and educational purposes. For production use, additional security measures and backend integration would be required._
