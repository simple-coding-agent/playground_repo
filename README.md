# Node.js Frontend Application

A modern Node.js frontend application built with Express.js, EJS templating, and modern web technologies.

## Features

- **Server-side rendering** with EJS templates
- **Express.js** web framework
- **Static file serving** for CSS, JavaScript, and assets
- **API endpoints** for frontend-backend communication
- **Error handling** with custom error pages
- **Responsive design** with modern CSS
- **Client-side JavaScript** with DOM manipulation
- **Development tools** integration (Nodemon, PostCSS, Browserify)

## Project Structure

```
├── server.js                 # Main application file
├── package.json              # Dependencies and scripts
├── views/                    # EJS templates
│   ├── index.ejs            # Home page
│   ├── about.ejs            # About page
│   ├── 404.ejs              # 404 error page
│   └── error.ejs            # 500 error page
├── public/                   # Static assets (served directly)
│   ├── css/
│   │   └── style.css        # Compiled CSS
│   └── js/
│       └── main.js          # Client-side JavaScript
├── src/                     # Source files (for processing)
│   ├── styles/
│   │   └── main.css         # Source CSS (PostCSS)
│   └── js/
│       ├── main.js          # Source JavaScript (Browserify)
│       └── utils.js         # Utility functions
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository** (or download the files):
   ```bash
   git clone <repository-url>
   cd nodejs-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development

1. **Start the development server** with auto-restart:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Production

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-restart
- `npm run build` - Build CSS and JavaScript files
- `npm run build:css` - Process CSS with PostCSS
- `npm run build:js` - Bundle JavaScript with Browserify

## API Endpoints

### GET /
- **Description**: Home page
- **Returns**: HTML page with application features

### GET /about
- **Description**: About page
- **Returns**: HTML page with project information

### GET /api/health
- **Description**: Health check endpoint
- **Returns**: JSON with server status and timestamp

## Technology Stack

- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **CSS**: Native CSS3 with PostCSS processing
- **JavaScript**: Vanilla JavaScript (ES6+)
- **Build Tools**: PostCSS, Browserify
- **Development**: Nodemon for auto-restart

## Features Included

### Frontend Features
- Responsive navigation with sticky header
- Hero section with gradient background
- Interactive feature cards with hover effects
- API data fetching with loading states
- Error handling and user notifications
- Smooth scrolling and animations
- Mobile-responsive design

### Backend Features
- Express.js server setup
- Static file serving
- EJS template rendering
- Error handling middleware
- 404 and 500 error pages
- API endpoints for data fetching

### Development Features
- Hot reloading with Nodemon
- CSS processing with PostCSS
- JavaScript bundling with Browserify
- Git ignore configuration
- Structured project organization

## Customization

### Adding New Pages
1. Create a new EJS template in the `views/` directory
2. Add a new route in `server.js`
3. Update navigation in templates if needed

### Styling
- Edit `src/styles/main.css` for CSS changes
- Run `npm run build:css` to compile
- Or edit `public/css/style.css` directly for quick changes

### Adding JavaScript Functionality
- Edit files in `src/js/` for modular code
- Or edit `public/js/main.js` directly
- Run `npm run build:js` to bundle modules

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the package.json file for details.

## Support

For questions or issues, please create an issue in the repository or contact the development team.