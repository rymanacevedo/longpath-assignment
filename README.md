# Coding Interview Problem

**Dear Candidate,**

IoT devices are everywhere and available at a ridiculously low cost. For this problem, we would like you to create a program that can be run on an IoT device (such as a Raspberry Pi) using the client-server model. The server should generate random numbers in real time, each with a timestamp indicating when it was generated. The client should display these numbers creatively on a React webpage. Additionally, we want to be able to start and stop the number generation from the webpage whenever we want.

We would also like to expand the functionality to test your knowledge of both front-end and back-end development. Here's what we expect you to accomplish:

---

### **Client-Side Tasks (React and TypeScript)**

1. **Real-Time Data Visualization:**  
   Enhance the webpage to display the generated random numbers (with timestamps) using a visually appealing chart or graph (e.g., a line chart using `echarts-for-react` library, or any other library of your choice). The X-axis should represent timestamps, and the Y-axis should represent the generated numbers.

2. **Control Panel:**  
   Implement a control panel on the webpage with the following features:

   - A toggle button to start and stop the number generation.
   - An input field to set the **frequency** of number generation (e.g., generate a new number every X milliseconds).

3. **Date and Time Selector:**  
   Add a date and time selector to filter the displayed numbers based on their timestamps. Users should be able to:

   - Select a start and end date/time range.
   - Update the chart and history view to display only the numbers generated within the selected range.

4. **History View:**  
   Display a history of the last 20 generated numbers in a scrollable table below the chart. The table should include:

   - Columns for the number, its timestamp, and a serial index.
   - Features to sort the data by timestamp or value.
   - Filters to show only numbers within a specific range (based on their values and timestamps).

5. **Responsive Design:**  
   Ensure the UI is responsive and works seamlessly on both desktop and mobile devices.

6. **Error Handling:**  
   Show user-friendly error messages if:
   - The server is unreachable.
   - The server sends malformed data.

---

### **Server-Side Tasks (NestJS and TypeScript)**

1. **Dynamic Number Generation with Timestamps:**  
   Modify the server to include a timestamp with each generated number.

2. **Dynamic Frequency Control:**

   - Allow the client to set the frequency of number generation via a REST API endpoint or WebSocket message.

3. **WebSocket Support:**  
   Enhance the server to send real-time updates to the client using WebSocket. Ensure the client can subscribe to these updates, including the numbers and their timestamps.

4. **Number and Timestamp Filtering API:**  
   Add an API endpoint that allows the client to query numbers generated in the past, filtered by:

   - A range of values.
   - A start and end timestamp.

5. **Rate Limiting:**  
   Add rate-limiting to the server to prevent misuse of the APIs (e.g., too many requests to the filtering endpoint).

---

### **General Expectations**

- **Code Quality:**  
  Follow best practices for TypeScript, including proper typing and error handling. Use comments and meaningful variable names to ensure your code is easy to understand and maintain.

- **Bug-Free Functionality:**  
  Ensure the program runs without any bugs and all implemented features work as intended under normal use cases.

- **Performance:**  
  Optimize the program to handle real-time updates and user interactions without any noticeable lag or performance degradation.

- **Testing (BONUS):**  
  Add unit tests for key functionalities on both the client and server. Use tools such as `Jest` for the server and React Testing Library for the client.

---

During your interview, you will be asked to start up your program and walk us through it. What issues did you find with the initial code? How did you fix them? What design decisions did you make? And, of course, does everything work as intended?

We anticipate this will take several hours. Let us know if you have any questions!

Best of luck,  
**The LongPath Team**

```
IoT-problem-react-nest
├─ .gitignore
├─ README.md
├─ client
│  ├─ README.md
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo196.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.test.tsx
│  │  ├─ App.tsx
│  │  ├─ index.tsx
│  │  ├─ react-app-env.d.ts
│  │  ├─ reportWebVitals.ts
│  │  └─ setupTests.ts
│  └─ tsconfig.json
├─ docs
│  ├─ .project_structure_ignore
│  └─ project_structure.txt
└─ server
   ├─ .eslintrc.json
   ├─ .gitignore
   ├─ .prettierrc
   ├─ README.md
   ├─ nest-cli.json
   ├─ package-lock.json
   ├─ package.json
   ├─ src
   │  ├─ app.controller.spec.ts
   │  ├─ app.controller.ts
   │  ├─ app.module.ts
   │  ├─ app.service.ts
   │  ├─ main.ts
   │  └─ random
   │     ├─ random.controller.spec.ts
   │     └─ random.controller.ts
   ├─ test
   │  ├─ app.e2e-spec.ts
   │  └─ jest-e2e.json
   ├─ tsconfig.build.json
   └─ tsconfig.json

```