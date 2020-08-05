// Config
import { root, user } from "./config";

const throwError = (status) => {
  if (status >= 400 && status < 500) {
    throw new Error("Client Error");
  } else if (status >= 500) {
    throw new Error("Server Error");
  }
};


export const api = Object.freeze({
  fetch: async () => {
    const response = await fetch(`${root}`, {
      method: "GET",
      headers: {
        "x-user": user,
      },
    });

    throwError(response.status);

    return response;
  },
  create: async (payload) => {
    const response = await fetch(`${root}`, {
      method: "POST",
      headers: {
        "x-user": user,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    throwError(response.status);

    return response;
  },
  update: async (hash, payload) => {
    const response = await fetch(`${root}/${hash}`, {
      method: "PUT",
      headers: {
        "x-user": user,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    throwError(response.status);

    return response;
  },
  delete: async (hash) => {
    const response = await fetch(`${root}/${hash}`, {
      method: "DELETE",
      headers: {
        "x-user": user,
      },
    });

    throwError(response.status);

    return response;
  }
});
