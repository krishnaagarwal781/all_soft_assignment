# Document Management System (DMS) Frontend

## Demo Video 
https://drive.google.com/file/d/125cioUHog9f-tweSGr95xe7fH-QgJY-f/view

## Description
This project is a frontend application for a Document Management System, built with React. It provides functionalities for user authentication, document upload, advanced document search, and file preview/download.

## 🏗️ Pages / Components

The application is structured around several key pages and components:

### Login Page
-   **Mobile number input**: Allows users to enter their mobile number for authentication.
-   **Send OTP & Validate OTP**: Handles the OTP generation and validation process.
-   **Store auth token in localStorage**: Securely stores the authentication token upon successful login.

### Admin Page
-   **Simple form to create new users (username + password)**: Provides an interface for administrators to add new user accounts.

### File Upload Page
-   **Date picker**: For selecting the document's upload date.
-   **Dropdown → Category (Personal / Professional)**: Allows classification of documents into major categories.
-   **Dynamic dropdown → Names / Departments**: A sub-category dropdown that dynamically updates based on the selected major category.
-   **Tag input with chips (fetch + add new tags)**: Enables users to add relevant tags to documents, with support for fetching existing tags and adding new ones.
-   **Remarks input field**: For adding any relevant notes or descriptions to the document.
-   **File upload (only PDF / Images allowed)**: Supports uploading only PDF and image files.
-   **Upload button**: Initiates the document upload process.

### File Search Page
-   **Dropdowns for category + minor head**: Filters documents by major and minor categories.
-   **Tag input**: Allows searching by specific tags.
-   **From Date – To Date filters**: Filters documents by a date range.
-   **Search button**: Executes the document search.
-   **Display search results in a table/list**: Presents the search results in a clear, organized format.

### File Preview / Download
-   **Preview section (show PDF/Image or “Unsupported format” message)**: Displays a preview of PDF or image files, or an appropriate message for unsupported formats.
-   **Button for individual file download**: Allows downloading a single selected file.
-   **Button for “Download All as ZIP”**: Enables downloading all search results as a ZIP archive.

### Navbar / Sidebar (optional shared layout)
-   **Links to Upload, Search, Admin**: Provides navigation to different sections of the application.
-   **Logout button**: Allows users to log out of their session.

## ⚙️ Supporting Features / Services

The application relies on several supporting services for its functionality:

-   **Auth Service**: Handles user login, OTP validation, and authentication token management.
-   **API Service**: A centralized instance for making API calls (e.g., using Axios or Fetch) with authentication tokens in headers.
-   **Tag Service**: Manages fetching existing tags and saving new tags.
-   **File Service**: Provides functionalities for document upload, search, preview, and download.

## 🚀 Getting Started

Follow these instructions to set up, install, and run the project locally.

### Prerequisites

Ensure you have the following installed:
- Node.js (LTS version recommended)
- npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/krishnaagarwal781/all_soft_assignment.git
    cd all_soft_assignment
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To run the project in development mode:
```bash
npm run dev
```
This will start the Vite development server, and you can view the application in your browser, usually at `http://localhost:5173`.

### Building for Production

To build the project for production:
```bash
npm run build
```
This command compiles the application into static files in the `dist/` directory, which can then be deployed to a web server.

## 📁 Folder Structure

The project follows a standard React application structure, organized for maintainability and scalability:

```
.
├── public/
├── src/
│   ├── api/
│   │   └── documentManagement.js  // API calls related to document operations
│   ├── assets/
│   ├── Auth/
│   │   ├── OtpLogin.jsx           // OTP login component
│   │   └── StaticAdminRegistration.jsx // Admin user registration
│   ├── components/
│   │   ├── Document/
│   │   │   ├── DocumentSearch.jsx     // Document search component
│   │   │   ├── FileUploadForm.jsx     // File upload form component
│   │   │   └── SearchResultsTable.jsx // Displays search results
│   │   ├── Layout.jsx             // Shared layout component (e.g., Navbar/Sidebar)
│   │   └── UI/
│   │       └── TagInput.jsx         // Reusable Tag input component
│   ├── constants/
│   │   └── documentConstants.js   // Constants related to documents (e.g., MOCK_MINOR_HEADS)
│   ├── pages/
│   │   ├── DashboardPage.jsx      // Main dashboard page
│   │   ├── LoginPage.jsx          // Login page
│   │   └── ...                    // Other pages
│   ├── App.jsx                    // Main application component
│   ├── index.css                  // Global styles
│   └── main.jsx                   // Entry point of the React application
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md                      // Project README file
└── vite.config.js
