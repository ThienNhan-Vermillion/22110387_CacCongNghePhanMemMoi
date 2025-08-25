# Express MySQL CRUD App with TypeScript

A modern CRUD (Create, Read, Update, Delete) application built with Express.js, MySQL, and TypeScript. Features a beautiful, responsive UI with Bootstrap 5 and modern JavaScript.

## 🚀 Features

- **Full CRUD Operations**: Create, read, update, and delete users
- **TypeScript**: Fully typed codebase for better development experience
- **MySQL Database**: Robust database with connection pooling
- **Modern UI**: Beautiful, responsive design with Bootstrap 5
- **Dark Mode**: Toggle between light and dark themes
- **Form Validation**: Client and server-side validation
- **Responsive Design**: Works perfectly on all devices
- **Real-time Feedback**: Loading states and user feedback

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd express-mysql-crud-ts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Create a MySQL database named `crud_app`
   - The application will automatically create the `users` table on first run

4. **Configure environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit the `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password_here
   DB_NAME=crud_app
   PORT=3000
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
express-mysql-crud-ts/
├── src/
│   ├── config/
│   │   └── database.ts          # Database connection configuration
│   ├── controllers/
│   │   └── homeController.ts    # Request handlers
│   ├── routes/
│   │   └── index.ts             # Route definitions
│   ├── services/
│   │   └── CRUDService.ts       # Business logic and database operations
│   ├── types/
│   │   └── user.ts              # TypeScript interfaces
│   └── index.ts                 # Application entry point
├── views/
│   ├── partials/
│   │   ├── head.ejs             # HTML head template
│   │   ├── navbar.ejs           # Navigation bar template
│   │   └── footer.ejs           # Footer template
│   ├── users/
│   │   ├── list.ejs             # Users list page
│   │   └── edit.ejs             # Edit user page
│   └── home.ejs                 # Home page with create form
├── public/
│   ├── css/
│   │   └── style.css            # Custom styles
│   └── js/
│       └── app.js               # Client-side JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## 🗄️ Database Schema

The application uses a simple `users` table with the following structure:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm start` - Start the production server
- `npm test` - Run tests (not implemented yet)

## 🎨 UI Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Dark Mode Toggle**: Switch between light and dark themes
- **Interactive Elements**: Hover effects and smooth animations
- **Form Enhancements**: Real-time validation and feedback
- **Loading States**: Visual feedback during operations

## 🔒 Security Features

- **SQL Injection Prevention**: Parameterized queries
- **Input Validation**: Server-side validation
- **Error Handling**: Graceful error handling and user feedback
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Local Development
1. Ensure MySQL is running
2. Create the database: `CREATE DATABASE crud_app;`
3. Configure your `.env` file
4. Run `npm run dev`

### Production Deployment
1. Build the application: `npm run build`
2. Set up your production MySQL database
3. Configure production environment variables
4. Use a process manager like PM2: `pm2 start dist/index.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check your database credentials in `.env`
   - Ensure the database `crud_app` exists

2. **Port Already in Use**
   - Change the PORT in your `.env` file
   - Or kill the process using the current port

3. **TypeScript Compilation Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check your TypeScript version compatibility

### Getting Help

If you encounter any issues, please:
1. Check the console for error messages
2. Verify your database connection
3. Ensure all environment variables are set correctly
4. Check the MySQL server logs

## 🎯 Roadmap

- [ ] Add user authentication
- [ ] Implement pagination for large datasets
- [ ] Add search and filtering functionality
- [ ] Create API endpoints for mobile apps
- [ ] Add unit and integration tests
- [ ] Implement file upload functionality
- [ ] Add user roles and permissions

---

**Built with ❤️ using Express, MySQL, TypeScript, and Bootstrap 5**
