# TreeBay Form Application

## 1. About This Project
TreeBay is a full-stack MERN application that provides a professional form submission experience. Users can create accounts, log in, and submit registration queries. The application also features a protected Admin Dashboard where administrators can view all submitted forms.

### **Admin Panel Access**
- **Email:** `admin@gmail.com`
- **Password:** `12345`

## 2. Tech Stack Used
### **Frontend**
- **React** (Vite)
- **React Router** (for client-side routing and protected routes)
- **Redux Toolkit** (for global state management of user authentication and form data)
- **Tailwind CSS** (for styling and responsive design)

### **Backend**
- **Node.js** & **Express.js** (REST API architecture)
- **MongoDB** & **Mongoose** (Database and object modeling)
- **JSON Web Tokens (JWT)** (for secure stateless authentication)
- **Bcrypt.js** (for password hashing)
- **CORS** (cross-origin resource sharing configuration)

## 3. Problems We Faced
During the development of this application, we encountered several debugging challenges:
1. **Hanging Requests (CORS Issues):** When attempting to hit the backend API (e.g., `/api/users/login`), the requests would hang indefinitely. Chrome DevTools displayed **"Provisional headers are shown"**, and the request timed out.
2. **500 Internal Server Errors on Signup:** The `/api/users/signup` route suddenly began returning 500 errors. Because the backend was capturing the error but only responding with a generic JSON message, the actual cause of the failure was hidden.
3. **Mongoose Hook Crashes:** The application was silently throwing a `TypeError: next is not a function` behind the scenes during user creation.
4. **Mobile Responsiveness:** Elements like navigation links and data tables were squished or overlapping on smaller screens, creating a poor mobile user experience.

## 4. How We Overcame Them
1. **Resolving the Hanging Requests:** We identified that another background system process was silently occupying port `8080`. When our React app made a request, it was intercepted by this non-Express process, which didn't know how to respond to CORS `OPTIONS` preflight requests. We fixed this by migrating our backend and frontend fetch configurations to port `8081`. 
2. **Improved Error Logging:** We added `console.error(err)` inside our route `catch` blocks. This explicitly prints stack traces to the terminal, allowing us to instantly identify runtime bugs.
3. **Fixing the Mongoose Async Hook:** We discovered that modern Mongoose does not supply a `next()` callback when a `pre('save')` hook is defined as an `async function`. We removed the `next` parameter and the manual `next()` call, allowing the native JavaScript Promise to resolve successfully on its own.
4. **Optimizing Mobile Views:** We audited the UI components and applied responsive Tailwind utility classes (`flex-col`, `md:flex-row`, `md:px-6`). This ensures headers stack nicely on constrained mobile widths while maintaining a grid layout on desktops.

## 5. Learnings From This Project
- **Verify Ports First:** When encountering bizarre API timeouts or seemingly inexplicable CORS errors, checking your OS for port conflicts (`netstat`) is a crucial first step.
- **Async vs. Callbacks:** Never mix `async/await` patterns with traditional callback patterns (`next()`) inside Mongoose middleware, as it leads to confusing runtime crashes.
- **Fail Loudly in Development:** Catching server errors and failing silently with generic messages makes debugging extremely difficult. Always log the actual `.message` and stack trace to your terminal.
- **Frontend Security is UI-only:** Protecting client-side React routes (like the Admin dashboard) using Redux state improves the user experience by conditionally hiding UI elements, but true security always requires backend verification. 
- **Modular Component Design:** Building a scalable MERN app relies heavily on clean separation of concerns—keeping models, controllers, and routes cleanly decoupled makes diagnosing features much easier.
