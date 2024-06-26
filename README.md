
# Project Task Tracker

This is a simple web-based Project Task Tracker application that demonstrates basic authentication and role-based access control using Open Policy Agent (OPA).

## Features

- User authentication (admin and guest roles)
- Task listing
- Task management (add, update, delete) based on user roles
- Role-based access control using simulated OPA policies

## Project Structure

The project consists of the following files:

- `index.html`: The main HTML file that structures the web page
- `style.css`: CSS file for styling the application
- `script.js`: JavaScript file containing the application logic and simulated OPA integration
- `policy.rego`: OPA policy file defining access control rules

## Setup and Running

1. Clone this repository or download the files to your local machine.

2. Open the `index.html` file in a web browser to run the application.

## Usage

1. Log in using one of the following credentials:
   - Admin: username `admin`, password `admin123`
   - Guest: username `guest`, password `guest123`

2. Once logged in, you can view the list of tasks.

3. Depending on your role:
   - Admin users can add, update, and delete tasks
   - Guest users can only view tasks

## OPA Integration

This project includes a simulated OPA integration for demonstration purposes. In a production environment, you would typically have an OPA server running separately, and your JavaScript would make HTTP requests to that server to evaluate policies.

The `policy.rego` file contains the access control rules written in Rego, OPA's policy language.

## Limitations

- This is a client-side only implementation for demonstration purposes.
- There is no persistent storage; all data is reset when the page is refreshed.
- Authentication and policy evaluation are simulated and not secure for production use.

## Future Improvements

- Implement server-side authentication and data persistence
- Set up a real OPA server for policy evaluation
- Add more sophisticated task management features (e.g., due dates, priorities)
- Implement user registration and profile management


## License

This project is open source and available under the [MIT License](LICENSE).
