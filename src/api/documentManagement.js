const BASE_URL = "https://apis.allsoft.co/api/documentManagement";

export const generateOTP = async (mobileNumber) => {
  const response = await fetch(`${BASE_URL}/generateOTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mobile_number: mobileNumber }),
  });
  const data = await response.json();
  return { ok: response.ok, data: data };
};

export const validateOTP = async (mobileNumber, otp) => {
  const response = await fetch(`${BASE_URL}/validateOTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mobile_number: mobileNumber, otp: otp }),
  });
  return response.json();
};
export const searchDocuments = async (searchPayload, token) => {
  const response = await fetch(`${BASE_URL}/searchDocumentEntry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(searchPayload),
  });
  const data = await response.json();
  return {
    ok: response.ok,
    status: data.status,
    data: data.data,
    message: data.message,
    recordsFiltered: data.recordsFiltered,
  };
};
export const getDocumentTags = async (term, token) => {
  const response = await fetch(`${BASE_URL}/documentTags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ term: term }),
  });
  const data = await response.json();
  return { ok: response.ok, data: data };
};
