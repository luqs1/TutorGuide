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

exports.sendMailLink = functions.https.onRequest( (req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const dest = req.query.dest;

        const mailOptions = {
            from: 'contact.tutorguides@gmail.com', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Tutor Guides Registration', // email subject
            html: `<h1>Welcome to TutorGuides</h1>
                    <p>Thank you for signing up with us.</p>`
        };

        // returning result
        return transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                return res.send(err.toString()+info);
            }
            return res.send('Sent');
        });
    });
});

exports.sendMail = functions.https.onCall((data, context) => {
    cors(data, context, () => {

        // getting dest email by query string

        const mailOptions = {
            from: 'contact.tutorguides@gmail.com', // Something like: Jane Doe <janedoe@gmail.com>
            to: data.to,
            subject: data.subject, // email subject
            html: data.html
        };

        // returning result
        return transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                return {sent:false, error, info};
            }
            return {sent:true, info};
        });
    });
    //data needs to, subject and html
});

exports.setUserClaims = functions.https.onCall( ( async (data, context) => {
    let student = data.type === 'student';
    let parent = data.type === 'parent';
    await admin.auth().setCustomUserClaims(data.uid, {student, parent})
    // data needs type and uid
}))

exports.setUserDoc = functions.https.onCall((async (data, context) => {
    await admin.firestore().collection('users').doc(context.auth.uid).set(data.document, data.options ? data.options : {})
    // data needs document and options
}))