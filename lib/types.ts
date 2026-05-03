export type Vibe = "heartfelt" | "humorous" | "poetic" | "professional";
export type Style =
  | "greenhouse"
  | "minimalist"
  | "sunset"
  | "library"
  | "paris_cafe"
  | "cinematic";
export type Plan = "single" | "bundle" | "apex";
export type OrderStatus =
  | "draft"
  | "paid"
  | "processing"
  | "avatar_ready"
  | "video_ready"
  | "delivered"
  | "failed";

export interface MemodroomState {
  orderId: string | null;
  senderEmail: string;
  senderName: string;
  step: 1 | 2 | 3 | 4 | 5;
  photos: File[];
  photoUrls: string[];
  voiceUploaded: boolean;
  recipientName: string;
  recipientEmail: string;
  relationship: string;
  messageText: string;
  vibe: Vibe;
  style: Style;
  plan: Plan;
  isLoading: boolean;
  error: string | null;
}

export interface Order {
  id: string;
  status: OrderStatus;
  plan: Plan;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail?: string;
  vibe: Vibe;
  style: Style;
  argilAvatarStatus?: string;
  videoUrls: string[];
  amountCents: number;
  createdAt: string;
  updatedAt: string;
}

export const STYLE_META: Record<
  Style,
  { label: string; icon: string; description: string }
> = {
  greenhouse: {
    label: "The Greenhouse",
    icon: "🌿",
    description: "Warm, nurturing, sunlit",
  },
  minimalist: {
    label: "The Gallery",
    icon: "▪",
    description: "Clean, modern, intentional",
  },
  sunset: {
    label: "The Terrace",
    icon: "🌅",
    description: "Romantic, golden-hour",
  },
  library: {
    label: "The Library",
    icon: "📚",
    description: "Thoughtful, wise, parental",
  },
  paris_cafe: {
    label: "The Paris Café",
    icon: "☕",
    description: "Breezy, adventurous, worldly",
  },
  cinematic: {
    label: "The Studio",
    icon: "🎬",
    description: "Epic, emotional, cinematic",
  },
};

export const VIBE_META: Record<
  Vibe,
  { label: string; description: string }
> = {
  heartfelt: { label: "Heartfelt", description: "Warm, sincere, from the heart" },
  humorous: { label: "Humorous", description: "Light, funny, with a smile" },
  poetic: { label: "Poetic", description: "Lyrical, metaphoric, timeless" },
  professional: {
    label: "Professional",
    description: "Polished, measured, sincere",
  },
};

export const PLAN_META: Record<
  Plan,
  {
    label: string;
    price: string;
    priceRaw: number;
    videos: string;
    extras: string;
    badge?: string;
  }
> = {
  single: {
    label: "Single Memo",
    price: "$14.99",
    priceRaw: 1499,
    videos: "1 video",
    extras: "",
    badge: undefined,
  },
  bundle: {
    label: "Premium Bundle",
    price: "$24.99",
    priceRaw: 2499,
    videos: "3 videos",
    extras: "In 3 different atmospheres",
    badge: "Best Value",
  },
  apex: {
    label: "Apex Gift",
    price: "$49.99",
    priceRaw: 4999,
    videos: "1 video",
    extras: "+ Reelin AI digital twin for recipient",
    badge: "The Gift That Keeps Giving",
  },
};

export const RELATIONSHIPS = [
  "Mom",
  "Dad",
  "Partner",
  "Grandparent",
  "Friend",
  "Sibling",
  "Colleague",
  "Mentor",
  "Other",
];
