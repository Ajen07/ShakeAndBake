import sendEmail from "./sendEmail.js";


const verificationEmail=async({to,origin,email,verificationCode})=>{
    const subject=`Email verification`;
    const html=`<a href='${origin}/user-email-verification?email=${email}&verificationCode=${verificationCode}'>Click on the link to verify your account</a>`;

    return sendEmail({to,subject,html});
    
}

export default verificationEmail;