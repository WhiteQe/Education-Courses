# Education-Courses
Education Courses Website

LearnHub: A Responsive E-Learning Website

LearnHub is a multi-page, fully responsive website for a modern e-learning platform. Built with semantic HTML, modern CSS, and dynamic JavaScript, this project demonstrates a clean user interface, interactive course filtering, and simulated user authentication. The front-end is designed to be intuitive, accessible, and visually appealing across all devices, from mobile phones to desktop computers.

[➡️ Live Demo Link]: (https://github.com/WhiteQe/Education-Courses)

## Features

-   **Fully Responsive Design:** Adapts seamlessly to mobile, tablet, and desktop screens using modern CSS techniques like Flexbox and Grid.
-   **Multi-Page Architecture:** Includes essential pages like Home, About, Courses, Contact, Login, and a user Profile page.
-   **Dynamic Course Catalog:** The Courses page dynamically renders, filters, and sorts course data from a local JSON file (`data.js`).
    -   **Live Filtering:** Filter courses by Category, Difficulty Level, and Price Range.
    -   **Dynamic Sorting:** Sort the displayed results by Popularity, Newest, or Price (Low to High / High to Low).
-   **Interactive UI Elements:**
    -   **Hero Slider:** An auto-playing hero slider on the homepage to feature key messages.
    -   **FAQ Accordion:** A clean, exclusive-open accordion for the Frequently Asked Questions section.
-   **Client-Side Form Validation:** The contact form provides real-time validation feedback to the user without needing a backend.
-   **Simulated Authentication:** A functional Login/Sign-Up flow that uses `localStorage` to simulate a user session and updates the UI accordingly (e.g., showing a profile icon instead of login buttons).

## Technologies Used

-   **HTML5:** Semantic markup for structure and accessibility.
-   **CSS3:** Custom properties, Flexbox, Grid, and media queries for responsive layouts and styling.
-   **JavaScript (ES6):** DOM manipulation, event handling, and dynamic content rendering.
-   **JSON:** For storing and managing the fake course data.

## Getting Started

No special build tools are required. To run this project locally, simply follow these steps:

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/WhiteQe/Education-Courses
    ```
2.  Navigate into the project directory:
    ```bash
    cd Education-Courses
    ```
3.  Open the `home.html` file in your preferred web browser.
