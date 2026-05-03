const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  error?: string;
  data?: T;
}

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<{ success: boolean; error?: string } & T> {
  const url = `${API_URL}${path}`;
  try {
    const res = await fetch(url, options);
    const json = await res.json();

    if (res.status === 409) {
      return { success: true, ...json };
    }

    return json;
  } catch {
    throw new Error("Connection error — please check your internet and try again");
  }
}

export async function createOrder(senderEmail: string, senderName: string) {
  return request<{ orderId: string; status: string }>(
    "/memodroom/orders",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderEmail, senderName }),
    }
  );
}

export async function uploadPhotos(orderId: string, files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("photos", file));
  return request<{ photoUrls: string[] }>(
    `/memodroom/orders/${orderId}/photos`,
    {
      method: "POST",
      body: formData,
    }
  );
}

export async function patchOrder(
  orderId: string,
  data: Record<string, unknown>
) {
  return request<{ order: Record<string, unknown> }>(
    `/memodroom/orders/${orderId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
}

export async function uploadVoice(orderId: string, file: File) {
  const formData = new FormData();
  formData.append("voice", file);
  return request<{ voiceSampleUrl: string }>(
    `/memodroom/orders/${orderId}/voice`,
    {
      method: "POST",
      body: formData,
    }
  );
}

export async function createCheckout(orderId: string) {
  return request<{ checkoutUrl: string; sessionId: string }>(
    `/memodroom/orders/${orderId}/checkout`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }
  );
}

export async function getOrder(orderId: string, senderEmail: string) {
  return request<{ order: import("./types").Order }>(
    `/memodroom/orders/${orderId}?email=${encodeURIComponent(senderEmail)}`
  );
}
