export default function getEmail(to, code) {
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
