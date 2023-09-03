export const PATIENT_PORTAL_LAYOUT_MENU = [
  { name: 'Home', link: '/' },
  { name: 'Features', link: '/' },
  { name: 'Login', link: '/admin/login' },
];

export const PATIENT_PORTAL_FOOTER_MENU = [
  { name: 'Home', link: '/' },
  { name: 'Features', link: '/' },
  // { name: 'Request Appointment', link: '/appointment' },
];

export const ADMIN_PORTAL_LAYOUT_MENU = [
  // { name: 'Home', link: '/admin' },
  // { name: 'Features', link: '/admin' },
];

export const ADMIN_PORTAL_FOOTER_MENU = [
  { name: 'Home', link: '/' },
  { name: 'Features', link: '/' },
];

export const PATIENT_PORTAL_FEATURES = [
  {
    title: 'Effortless Appointment Requests',
    desc: 'Request appointments with healthcare providers through a user-friendly form',
  },
  {
    title: 'Real-Time Availability',
    desc: 'View real-time availability and select suitable appointment slots',
  },
  {
    title: 'Mobile Compatibility',
    desc: 'Connectient is accessible and optimized for use on various devices, including smartphones and tablets',
  },
  {
    title: 'Appointment Reminders',
    desc: 'Automated appointment reminders via email to reduce no-shows and improve patient adherence',
  },
];

export const ADMIN_PORTAL_FEATURES = [
  {
    title: 'Comprehensive Appointment List',
    desc: 'Well-organized list of all appointment requests made by patients, including essential details such as patient names, contact information, requested dates, and appointment status',
  },
  {
    title: 'Appointment Status Updates',
    desc: 'Current status of each appointment request (e.g., pending, confirmed, rescheduled, canceled) to keep admins informed',
  },
  {
    title: 'Appointment Reminders',
    desc: 'Automated appointment reminders via email to reduce no-shows and improve patient adherence',
  },
  {
    title: 'Quick Actions',
    desc: 'Allow admins to perform common tasks efficiently, such as confirming, rescheduling, or canceling appointments',
  },
];

export const ADMIN_DASHBOARD_COLUMN_HEADERS: {
  [key: string]: string;
} = {
  status: 'Status',
  full_name: 'Full Name',
  mobile_phone: 'Contact',
  appointment_type: 'Appointment Type',
  requested_date: 'Requested Date',
  requested_time: 'Requested Time',
};
