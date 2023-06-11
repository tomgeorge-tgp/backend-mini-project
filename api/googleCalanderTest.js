import { google } from 'googleapis';
 import serviceAccount from './serviceAccountKey.json' assert { type: "json" };

const calendarId = process.env.CALENDAR_ID;

// Configure a JWT auth client
const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  ['https://www.googleapis.com/auth/calendar']
);

// Authenticate the JWT client
jwtClient.authorize((err, tokens) => {
  if (err) {
    console.error('Error authorizing JWT client:', err);
    return;
  }

  // Create a calendar instance with the JWT client as auth
 

  // Call the createEvent function with the required parameters
  createEvent(
    '2023-06-15T10:00:00-07:00',
    '2023-06-15T11:00:00-07:00',
    'America/Los_Angeles',
    'student@example.com',
    'counselor@example.com'
  );
});

function createEvent(startDateTime, endDateTime, timeZone, studentEmail, counselorEmail) {
    const calendar = google.calendar({ version: 'v3', auth: jwtClient });
  const event = {
    description: 'Meeting with counselor to discuss academic progress',
    start: {
      dateTime: startDateTime,
      timeZone: timeZone,
    },
    end: {
      dateTime: endDateTime,
      timeZone: timeZone,
    },
    attendees: [
      { email: studentEmail },
      { email: counselorEmail },
    ],
    reminders: {
      useDefault: true,
    },
  };

  // Insert the event
  calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    sendUpdates: 'all', // Send email notifications to attendees
  }, (err, res) => {
    if (err) {
      console.error('Error creating event:', err);
      return;
    }
    console.log('Event created: %s', res.data.htmlLink);
  });
}
















// import { google } from 'googleapis';
// import serviceAccount from './serviceAccountKey.json' assert { type: "json" };
// const calendarId = process.env.CALENDAR_ID;
// // Configure a JWT auth client
// const jwtClient = new google.auth.JWT(
//   serviceAccount.client_email,
//   null,
//   serviceAccount.private_key,
//   ['https://www.googleapis.com/auth/calendar']
// );

// // Authenticate the JWT client
// jwtClient.authorize((err, tokens) => {
//   if (err) {
//     console.error('Error authorizing JWT client:', err);
//     return;
//   }

//   // Create a calendar instance with the JWT client as auth
//   const calendar = google.calendar({ version: 'v3', auth: jwtClient });

//   // Your event object
//  // Your event object
// const event = {
 
//     description: 'Meeting with counselor to discuss academic progress',
//     start: {
//       dateTime: '2023-06-15T10:00:00-07:00',
//       timeZone: 'America/Los_Angeles',
//     },
//     end: {
//       dateTime: '2023-06-15T11:00:00-07:00',
//       timeZone: 'America/L_Angeles',
//     },
//     attendees: [
//       { email: 'student@example.com' },
//       { email: 'counselor@example.com' },
//     ],
//     reminders: {
//       useDefault: true,
//     },
//   };
  
//   // Insert the event
//   calendar.events.insert({
//     calendarId: 'primary',
//     resource: event,
//     sendUpdates: 'all', // Send email notifications to attendees
//   }, (err, res) => {
//     if (err) {
//       console.error('Error creating event:', err);
//       return;
//     }
//     console.log('Event created: %s', res.data.htmlLink);
//   });
  

// //   // Insert the event
// //   calendar.events.insert({
// //     calendarId: "primary",
// //     resource: event,
// //   }, (err, res) => {
// //     if (err) {
// //       console.error('Error creating event:', err);
// //       return;
// //     }
// //     console.log('Event created: %s', res.data.htmlLink);
// //   });
// // });



























