# 🎯 Time Management Toolkit

A comprehensive React application to help you master your workload and learn to say no with confidence. This toolkit provides interactive tools for capacity tracking, boundary setting, time blocking assessment, decision making, and emergency stress management.

## ✨ Features

### 📊 Capacity Tracker
- Visual workload management with color-coded capacity meter
- Task prioritization with effort level tracking
- Real-time capacity percentage calculation
- Data export functionality

### 🛡️ Saying No Assistant
- Interactive decision tree for evaluating requests
- Ready-to-use "no" phrases with one-click copying
- Priority alignment assessment
- Capacity-based decision making

### 📅 Time Blocking Health Check
- Comprehensive assessment of your time blocking system
- Scoring system with personalized recommendations
- Apple Calendar optimization tips
- Progress tracking and data export

### ✨ Decision Magic
- Magic 8-Ball for quick task prioritization
- Task Roulette wheel for choosing between options
- Quick decision tools (coin flip, dice roll, focus mantras)
- Fun, interactive approach to decision paralysis

### ⚠️ Emergency Protocol
- Stress level assessment with personalized responses
- Emergency scripts for difficult conversations
- Commitment audit framework
- Crisis management action plans

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/time-management-toolkit.git
   cd time-management-toolkit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application running.

## 📁 Project Structure

```
time-management-toolkit/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── CapacityTracker.js
│   │   ├── SayingNo.js
│   │   ├── TimeBlocking.js
│   │   ├── DecisionMagic.js
│   │   └── Emergency.js
│   ├── utils/
│   │   └── fileUtils.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Customization

### Adding New Features
1. Create a new component in `src/components/`
2. Add the component to the tabs array in `src/App.js`
3. Import and configure the new component

### Styling
The project uses Tailwind CSS for styling. You can:
- Modify colors in `tailwind.config.js`
- Add custom animations in `src/App.css`
- Create new utility classes as needed

### Data Management
Currently, all data is stored in component state and can be exported as text files. To add persistence:
- Implement localStorage for browser storage
- Add database integration for multi-device sync
- Create user accounts for personalized experiences

## 🚀 Deployment Options

### GitHub Pages
1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json homepage**
   ```json
   "homepage": "https://yourusername.github.io/time-management-toolkit"
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### Netlify
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Drag and drop the `build` folder to Netlify**
   Or connect your Git repository for automatic deployments

### Heroku
1. **Create a Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Add buildpack**
   ```bash
   heroku buildpacks:set mars/create-react-app
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run deploy` - Deploys to GitHub Pages
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen orientations

## ♿ Accessibility Features

- Keyboard navigation support
- Screen reader compatibility
- High contrast color combinations
- Focus indicators
- Semantic HTML structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test on multiple devices/browsers
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Create React App
- Styled with Tailwind CSS
- Icons and emojis for enhanced user experience
- Inspired by productivity and time management best practices

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/time-management-toolkit/issues) page
2. Create a new issue with detailed information
3. Reach out to the maintainers

## 🔮 Future Enhancements

- [ ] Data persistence with localStorage
- [ ] User accounts and cloud sync
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Team collaboration features
- [ ] Advanced analytics and reporting
- [ ] Mobile app version
- [ ] Slack/Teams integration
- [ ] AI-powered recommendations

---

**Made with ❤️ for better time management and work-life balance**