import ConfirmationEmailData from '@/types/ConfirmationEmailData';

type ContactMessageFields = {
  [key: string]: string;
};

// Appointment request emails
const CONTACT_MESSAGE_FIELDS: ContactMessageFields = {
  first_name: 'First Name: ',
  last_name: 'Last Name: ',
  mobile_phone: 'Phone Number: ',
  email: 'Email: ',
  dob: 'Date of Birth: ',
  requested_date: 'Requested Date: ',
  requested_time: 'Requested Time: ',
  appointment_type: 'Appointmet Type: ',
  description: 'Description: ',
  is_emergency: 'Is this an emergency? ',
};

export const generateEmailContent = (data: Appointment) => {
  const stringData = Object.entries(data).reduce((str: string, [key, val]) => {
    return (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val as string} \n\n`);
  }, '');

  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<div style="padding: 5px 0;"><h3 class="form-heading" style="display: inline;">${
      CONTACT_MESSAGE_FIELDS[key]
    }</h3><p class="form-answer" style="display: inline;">${
      val as string
    }</p></div>`);
  }, '');
  return {
    subject: `Connectient Appointment Request`,
    text: stringData,
    html: `<!doctypehtml><title></title><meta charset=utf-8><meta content="width=device-width,initial-scale=1"name=viewport><meta content="IE=edge"http-equiv=X-UA-Compatible><style>a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table{border-collapse:collapse!important}body{height:100%!important;margin:0!important;padding:0!important;width:100%!important}@media screen and (max-width:525px){.wrapper{width:100%!important;max-width:100%!important}.responsive-table{width:100%!important}.padding{padding:10px 5% 15px 5%!important}.section-padding{padding:0 15px 50px 15px!important}}.form-container{margin-bottom:24px;padding:20px;border:1px dashed #ccc}.form-heading{color:#2a2a2a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400;text-align:left;line-height:20px;font-size:18px;margin:0 0 8px;padding:0}.form-answer{color:#2a2a2a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;text-align:left;line-height:20px;font-size:16px;margin:0 0 24px;padding:0}div[style*='margin: 16px 0;']{margin:0!important}</style><body style=margin:0!important;padding:0!important;background:#fff><div style=display:none;font-size:1px;color:#fefefe;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden></div><div style="margin:20px 50px;font-size:1.1rem"><p>Hi ${data.first_name},</p><p>Thanks for using Connectient Appointment Request System! Your appointment at Essential Dental Solutions has been successfully requested. Our staff will give you a call on the contact number provided within 48 hours to schedule and confirm your appointment. Below is the information submitted with your request. If you have any questions or concerns, please contact us at (868) 387-1325.</div><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td class=section-padding style="padding:10px 15px 30px 15px"align=center bgcolor=#ffffff><table border=0 cellpadding=0 cellspacing=0 width=100% class=responsive-table style=max-width:500px><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td class="message-content padding"style=padding:0;font-size:16px;line-height:25px;color:#232323><h2>Appointment Request Information</h2><div class=form-container>${htmlData}</div></table></table></table></table>`,
  };
};

// Appointment confirmation emails
const CONFIRMATION_MESSAGE_FIELDS: ContactMessageFields = {
  first_name: 'First Name: ',
  last_name: 'Last Name: ',
  appointment_type: 'Appointmet Type: ',
  scheduled_date: 'Appointment Date: ',
  scheduled_time: 'Appointment Time: ',
};

export const generateConfirmationEmailContent = (
  data: ConfirmationEmailData,
) => {
  const stringData = Object.entries(data).reduce((str: string, [key, val]) => {
    return (str += `${CONFIRMATION_MESSAGE_FIELDS[key]}: \n${
      val as string
    } \n\n`);
  }, '');

  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<div style="padding: 5px 0;"><h3 class="form-heading" style="display: inline;">${
      CONFIRMATION_MESSAGE_FIELDS[key]
    }</h3><p class="form-answer" style="display: inline;">${
      val as string
    }</p></div>`);
  }, '');
  return {
    subject: `Connectient Appointment Confirmation`,
    text: stringData,
    html: `<!doctypehtml><title></title><meta charset=utf-8><meta content="width=device-width,initial-scale=1"name=viewport><meta content="IE=edge"http-equiv=X-UA-Compatible><style>a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table{border-collapse:collapse!important}body{height:100%!important;margin:0!important;padding:0!important;width:100%!important}@media screen and (max-width:525px){.wrapper{width:100%!important;max-width:100%!important}.responsive-table{width:100%!important}.padding{padding:10px 5% 15px 5%!important}.section-padding{padding:0 15px 50px 15px!important}}.form-container{margin-bottom:24px;padding:20px;border:1px dashed #ccc}.form-heading{color:#2a2a2a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400;text-align:left;line-height:20px;font-size:18px;margin:0 0 8px;padding:0}.form-answer{color:#2a2a2a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;text-align:left;line-height:20px;font-size:1.2rem;margin:0 0 24px;padding:0}div[style*='margin: 16px 0;']{margin:0!important}</style><body style=margin:0!important;padding:0!important;background:#fff><div style=display:none;font-size:1px;color:#fefefe;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden></div><div style="margin:20px 50px;font-size:1.1rem"><p>Hi ${data.first_name},<p>Thanks for using Connectient Appointment Request System! Your appointment at Essential Dental Solutions has been successfully confirmed. Below is the scheduled date and time for your appointment. Cancellations are allowed up to 24 hours before your appointment. If you have any questions or concerns, please contact us at (868) 387-1325. We look forward to seeing you!</div><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td class=section-padding style="padding:10px 15px 30px 15px"align=center bgcolor=#ffffff><table border=0 cellpadding=0 cellspacing=0 width=100% class=responsive-table style=max-width:500px><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td class="message-content padding"style=padding:0;font-size:16px;line-height:25px;color:#232323><h2>Appointment Confirmation Information</h2><div class=form-container>${htmlData}</div></table></table></table></table>`,
  };
};
