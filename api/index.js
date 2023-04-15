

import {google} from 'googleapis';

const API_KEY = 'AIzaSyAvH5wgyq40WgmyciXh0TMKxps0omoNUxQ';
const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';



function googleapi(text) {
    return new Promise((resolve, reject) => {
      google.discoverAPI(DISCOVERY_URL)
        .then(client => {
          const analyzeRequest = {
            comment: {
              text: text,
            },
            requestedAttributes: {
              TOXICITY: {},
            },
          };
  
          client.comments.analyze(
            {
              key: API_KEY,
              resource: analyzeRequest,
            },
            (err, response) => {
              if (err) {
                reject(err);
              } else {
                resolve(response.data);
              }
            }
          );
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  
export default googleapi;



















// import {google} from 'googleapis';

// const API_KEY = 'AIzaSyAvH5wgyq40WgmyciXh0TMKxps0omoNUxQ';
// const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

//     console.log("here");

//      function googleapi(text)
//     {
//         console.log(text);
//        google.discoverAPI(DISCOVERY_URL)
//     .then(client => {
//       const analyzeRequest = {
//         comment: {
//           text: text,
//         },
//         requestedAttributes: {
//           TOXICITY: {},
//         },
//       };

//       client.comments.analyze(
//           {
//             key: API_KEY,
//             resource: analyzeRequest,
//           },
//           (err, response) => {
//             if (err) throw err;
//             return(JSON.stringify(response.data, null, 2))
//             // console.log(JSON.stringify(response.data, null, 2));
//           });
//     })
//     .catch(err => {
//       throw err;
//     });
       
//     };

// export default googleapi;
