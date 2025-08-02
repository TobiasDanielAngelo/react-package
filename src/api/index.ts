import { PaginatedResponse } from "../constants/interfaces";

export function autoFormData(body: Record<string, any>) {
  let needsFormData = false;
  const fileExtensionRegex = /\.(jpg|jpeg|png|gif|pdf|docx?|xlsx?|txt)$/i;

  for (const value of Object.values(body)) {
    if (value instanceof File || value instanceof Blob) {
      needsFormData = true;
      break;
    }
  }

  if (!needsFormData) {
    // strip keys with file-like strings even in JSON
    const filtered: Record<string, any> = {};
    for (const key in body) {
      if (
        !(typeof body[key] === "string" && fileExtensionRegex.test(body[key]))
      ) {
        filtered[key] = body[key];
      }
    }
    return filtered;
  }

  // Build FormData, skip existing file links
  const formData = new FormData();
  for (const key in body) {
    const value = body[key];
    if (typeof value === "string" && fileExtensionRegex.test(value)) {
      continue;
    }
    formData.append(key, value);
  }

  return formData;
}

export function getCookie(name: string): string {
  const cookies = document.cookie ? document.cookie.split(";") : [];
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return "";
}

export const fetchCSRF = async (baseURL: string) => {
  return await guidedRequest(
    "csrf/",
    {
      method: "GET",
    },
    baseURL
  );
};

export type Related = {
  id: number | string;
  field: string;
  name: string;
};

export async function guidedRequest<T>(
  endpoint: string,
  options: {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    body?: any;
    itemId?: number | string;
    params?: string;
  },
  baseURL: string,
  customURL?: string,
  hasNoCredentials?: boolean
): Promise<{
  details: any;
  ok: boolean;
  data: T | null;
}> {
  const input = new URLSearchParams(options.params);
  const filtered = new URLSearchParams();

  for (const [key, value] of input.entries()) {
    if (value.trim()) filtered.append(key, value);
  }

  let url = customURL ? `${customURL}/${endpoint}` : `${baseURL}/${endpoint}`;
  if (options.itemId) url += `${options.itemId}/`;
  if (options.params) url += `?${filtered.toString()}`;

  const preparedBody = options.body ? autoFormData(options.body) : undefined;
  const isFormData = preparedBody instanceof FormData;

  const headers: Record<string, string> = {
    "ngrok-skip-browser-warning": "any",
    "X-CSRFToken": getCookie("csrftoken"),
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method: options.method,
    credentials: hasNoCredentials ? undefined : "include",
    body: preparedBody
      ? isFormData
        ? preparedBody
        : JSON.stringify(preparedBody)
      : undefined,
    headers,
  });

  if (!response.ok) {
    const msg = await response.json();
    return { details: msg, ok: false, data: null };
  }

  try {
    if (options.method === "DELETE") {
      return { details: "", ok: true, data: null };
    }

    const json: T = await response.json();
    return { details: "", ok: true, data: json };
  } catch (error) {
    console.error("Parsing Error", error);
    return { details: "Parsing Error", ok: false, data: null };
  }
}

export async function fetchItemsRequest<T>(
  baseURL: string,
  endpoint: string,
  params?: string
): Promise<{
  details: any;
  ok: boolean;
  data: T[] | null;
  related: Related[] | null;
  optionFields: string[];
  relatedFields: string[];
  dateFields: string[];
  datetimeFields: string[];
  priceFields: string[];
  timeFields: string[];
  pageDetails?: Omit<PaginatedResponse<T>, "results">;
}> {
  const result = await guidedRequest<{
    results: T[];
    related: Related[];
    optionFields: string[];
    relatedFields: string[];
    dateFields: string[];
    datetimeFields: string[];
    priceFields: string[];
    timeFields: string[];
    count: number;
    next: string | null;
    previous: string | null;
    currentPage: number;
    totalPages: number;
    ids: number[];
  }>(endpoint, { method: "GET", params: params }, baseURL);

  if (!result.ok || !result.data)
    return {
      ...result,
      related: null,
      data: null,
      relatedFields: [],
      optionFields: [],
      dateFields: [],
      datetimeFields: [],
      priceFields: [],
      timeFields: [],
    };

  const {
    results,
    related,
    optionFields,
    relatedFields,
    dateFields,
    datetimeFields,
    timeFields,
    priceFields,
    ...pageDetails
  } = result.data;

  return {
    details: "",
    ok: true,
    data: results,
    related: related,
    optionFields,
    relatedFields,
    dateFields,
    timeFields,
    datetimeFields,
    priceFields,
    pageDetails,
  };
}

export async function postItemRequest<T>(
  baseURL: string,
  endpoint: string,
  body?: T
) {
  return await guidedRequest<T>(
    endpoint,
    {
      method: "POST",
      body: body,
    },
    baseURL
  );
}

export async function updateItemRequest<T>(
  endpoint: string,
  baseURL: string,
  itemId: number | string,
  body: T
) {
  return await guidedRequest<T>(
    endpoint,
    {
      method: "PATCH",
      body: body,
      itemId: itemId,
    },
    baseURL
  );
}

export async function deleteItemRequest(
  baseURL: string,
  endpoint: string,
  itemId: number | string
) {
  return await guidedRequest(
    endpoint,
    {
      method: "DELETE",
      itemId: itemId,
    },
    baseURL
  );
}
