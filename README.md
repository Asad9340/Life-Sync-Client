# Blood Donation Application

## Website Overview
Blood Donation Application is designed to streamline the process of blood donation by connecting donors with those in need. The platform offers comprehensive management features for users and administrators, facilitating an efficient and user-friendly experience.

**Live site URL**: [https://life-sync-bd.web.app/](https://life-sync-bd.web.app/)

### Admin Access
- **Username**: asad@gmail.com
- **Password**: asad.emran

## Key Features
1. **User-Friendly Interface**: Easy navigation and responsive design for desktop, tablet, and mobile devices.
2. **User Registration**: Users can register as donors with details including blood group and location.
3. **Blood Donation Requests**: Donors can view and respond to blood donation requests.
4. **Role-Based Access**: Differentiated access for Admins, Donors, and Volunteers to various functionalities.
5. **Real-Time Notifications**: Uses alerts and notifications for CRUD operations and user interactions.
6. **Data Security**: Secured with environment variables to hide sensitive configuration details.
7. **Persistent Sessions**: Ensures users stay logged in even after refreshing the page on private routes.
8. **Dashboard for Admins and Donors**: Customized dashboards to manage profiles, donation requests, and view statistics.
9. **Advanced User Management**: Admins can manage user roles, including blocking/unblocking users and promoting users to volunteers or admins.
10. **Content Management System**: Allows admins and volunteers to manage educational and promotional content related to blood donation.

## User Roles and Permissions
- **Admin**: Full access to all features including user and content management.
- **Donor**: Can register, manage their profile, and respond to donation requests.
- **Volunteer**: Can manage donation requests and assist in content management but with limited permissions compared to admins.

## Technical Details
- **Stack**: MERN (MongoDB, Express.js, React, Node.js)
- **Authentication**: Managed through JWT for secure access to resources.
- **Responsive Design**: Fully responsive across all devices.
- **Environment Variables**: Used to secure Firebase and MongoDB credentials.


## Technologies Used

- React Router DOM
- React Hot Toast
- Sweet Alert 2
- React Simple Typewriter
- React Awesome Reveal
- Swiper Slider
- Tailwind CSS
- Material Tailwind CSS
- Firebase Authentication


## Setup and Installation
To run this project locally, clone the repository and install the dependencies:
```bash
git clone https://github.com/Asad9340/Life-Sync-Client.git
cd life-sync-client
npm install
npm start
