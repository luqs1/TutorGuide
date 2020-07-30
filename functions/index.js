const functions = require('firebase-functions');
const admin = require('firebase-admin')
const nodemailer = require('nodemailer');
const cors = require('cors')({origin:true});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();
function getEmail(to, code) {
    return {
        to,
        subject: 'TutorGuides Parent Code',
        html: `<h1>Welcome to TutorGuides</h1>
               <p>Thank you for making an account with us.
               All that's left is to create a student account using this code:
               `+code+`<br/> After the free 1hr trial lesson, lessons can be purchased individually with Pay as you Go
               or in discounted bundles on our website. </p> 
               <p>TutorGuides,
                    Foundation for Excellence</p>`
    }
}


/**
 * Here we're using Gmail to send
 */
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'contact.tutorguides@gmail.com',
        pass: 'Challoners@123'
    }
});

exports.sendParentMailLink = functions.https.onRequest( (req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const dest = req.query.dest;
        const code = req.query.code;
        const mailOptions = {from:'contact.tutorguides@gmail.com',...getEmail(dest, code)}

        return transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                return res.send(err.toString()+info);
            }
            return res.send('Sent');
        });
    });
});

exports.setUserClaims = functions.https.onCall( ( async (data, context) => {
    let student = data.type === 'student';
    let parent = data.type === 'parent';
    await admin.auth().setCustomUserClaims(context.auth.uid, {student, parent})
    // data needs type
}))

exports.setUserDoc = functions.https.onCall((async (data, context) => {
    await admin.firestore().collection('users').doc(context.auth.uid).set(data.document, data.options ? data.options : {})
    // data needs document and options
}))