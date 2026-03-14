const twilio = require("twilio");

function normalizePhoneNumber(value) {
  if (!value) return null;

  let normalized = String(value).trim().replace(/[\s\-()]/g, "");
  if (!normalized) return null;

  if (normalized.startsWith("00")) {
    normalized = `+${normalized.slice(2)}`;
  }

  // Default local 10-digit numbers to India country code for this PDS deployment.
  if (/^\d{10}$/.test(normalized)) {
    normalized = `+91${normalized}`;
  }

  if (/^\d{8,15}$/.test(normalized) && !normalized.startsWith("+")) {
    normalized = `+${normalized}`;
  }

  if (!/^\+[1-9]\d{7,14}$/.test(normalized)) {
    return null;
  }

  return normalized;
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const rawTwilioFrom = process.env.TWILIO_PHONE_NUMBER;
const twilioFromNumber = normalizePhoneNumber(rawTwilioFrom);

const hasTwilioConfig = Boolean(accountSid && authToken && twilioFromNumber);
const twilioClient = hasTwilioConfig ? twilio(accountSid, authToken) : null;

function buildConfirmationMessage({ quantity, grain, fpsLocation, transactionId }) {
  return `JustRation Alert: You received ${quantity} kg ${grain} from FPS ${fpsLocation}. Reply YES if correct or NO if incorrect. Transaction ID: ${transactionId}`;
}

async function sendConfirmationSms(toPhoneNumber, message) {
  const normalizedTo = normalizePhoneNumber(toPhoneNumber);
  if (!normalizedTo) {
    return {
      sent: false,
      status: "invalid_phone",
      error: "Invalid beneficiary phone number"
    };
  }

  if (!hasTwilioConfig || !twilioClient) {
    return {
      sent: false,
      status: "not_configured",
      error: "Twilio credentials are not configured"
    };
  }

  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: twilioFromNumber,
      to: normalizedTo
    });

    return {
      sent: true,
      status: "sent",
      sid: response.sid,
      to: normalizedTo
    };
  } catch (error) {
    return {
      sent: false,
      status: "failed",
      error: error.message,
      to: normalizedTo
    };
  }
}

function parseConfirmationReply(bodyText) {
  const text = String(bodyText || "").trim().toUpperCase();
  const decisionMatch = text.match(/^(YES|NO)\b/);

  if (!decisionMatch) {
    return {
      valid: false,
      reason: "invalid_response"
    };
  }

  const decision = decisionMatch[1];
  const txIdMatch = text.match(/[0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i);

  return {
    valid: true,
    decision,
    transactionId: txIdMatch ? txIdMatch[0] : null
  };
}

function buildTwimlMessage(messageText) {
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(messageText);
  return twiml.toString();
}

module.exports = {
  hasTwilioConfig,
  normalizePhoneNumber,
  buildConfirmationMessage,
  sendConfirmationSms,
  parseConfirmationReply,
  buildTwimlMessage
};
