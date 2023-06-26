Certainly! Here's a sample README.md file for your app:

```
# Dictionary Web App

The Dictionary Web App is a simple web application that allows users to search for word definitions and phonetic pronunciations. It utilizes the Dictionary API to fetch the word information and display it to the user.

## Features

- Search for word definitions
- View phonetic pronunciations
- Toggle between light and dark theme
- Select different font styles

## Technologies Used

- React: JavaScript library for building user interfaces
- React Bootstrap: UI framework for React applications
- MDB React UI Kit: Material Design components for React
- Dictionary API: External API for word definitions and phonetic pronunciations

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install the dependencies:

   ```bash
   cd dictionary-web-app
   npm install
   ```

3. Obtain an API key from the Dictionary API website.

4. Create a `.env` file in the project root directory and add the following line:

   ```
   REACT_APP_API_KEY=YOUR_API_KEY
   ```

   Replace `YOUR_API_KEY` with your actual API key.

5. Start the development server:

   ```bash
   npm start
   ```

6. Open your browser and visit `http://localhost:3000` to see the app in action.

## Project Structure

- `public/`: Static assets and index.html
- `src/`: Source code directory
  - `components/`: React components
  - `App.js`: Main component and app logic
  - `index.js`: Entry point for the React app
  - `App.css`: Styling for the app
  - `Navbar.module.css`: Styling for the navigation bar

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Feel free to customize and enhance the README as per your requirements.