"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import type { MemodroomState, Vibe, Style, Plan } from "./types";

const STORAGE_ORDER_ID = "memodroom_order_id";
const STORAGE_EMAIL = "memodroom_email";

const initialState: MemodroomState = {
  orderId: null,
  senderEmail: "",
  senderName: "",
  step: 1,
  photos: [],
  photoUrls: [],
  voiceUploaded: false,
  recipientName: "",
  recipientEmail: "",
  relationship: "",
  messageText: "",
  vibe: "heartfelt",
  style: "greenhouse",
  plan: "single",
  isLoading: false,
  error: null,
};

type Action =
  | { type: "SET_ORDER_ID"; payload: string }
  | { type: "SET_SENDER"; payload: { email: string; name: string } }
  | { type: "SET_STEP"; payload: 1 | 2 | 3 | 4 | 5 }
  | { type: "SET_PHOTOS"; payload: File[] }
  | { type: "SET_PHOTO_URLS"; payload: string[] }
  | { type: "SET_VOICE_UPLOADED"; payload: boolean }
  | {
      type: "SET_PERSONALIZATION";
      payload: {
        recipientName: string;
        recipientEmail: string;
        relationship: string;
        messageText: string;
        vibe: Vibe;
        style: Style;
      };
    }
  | { type: "SET_VIBE"; payload: Vibe }
  | { type: "SET_STYLE"; payload: Style }
  | { type: "SET_PLAN"; payload: Plan }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "HYDRATE"; payload: Partial<MemodroomState> };

function reducer(state: MemodroomState, action: Action): MemodroomState {
  switch (action.type) {
    case "SET_ORDER_ID":
      return { ...state, orderId: action.payload };
    case "SET_SENDER":
      return {
        ...state,
        senderEmail: action.payload.email,
        senderName: action.payload.name,
      };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_PHOTOS":
      return { ...state, photos: action.payload };
    case "SET_PHOTO_URLS":
      return { ...state, photoUrls: action.payload };
    case "SET_VOICE_UPLOADED":
      return { ...state, voiceUploaded: action.payload };
    case "SET_PERSONALIZATION":
      return { ...state, ...action.payload };
    case "SET_VIBE":
      return { ...state, vibe: action.payload };
    case "SET_STYLE":
      return { ...state, style: action.payload };
    case "SET_PLAN":
      return { ...state, plan: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "HYDRATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

interface MemodroomContextValue {
  state: MemodroomState;
  dispatch: React.Dispatch<Action>;
  setOrderId: (id: string) => void;
  setSender: (email: string, name: string) => void;
  setStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const MemodroomContext = createContext<MemodroomContextValue | null>(null);

export function MemodroomProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const orderId = localStorage.getItem(STORAGE_ORDER_ID);
    const senderEmail = localStorage.getItem(STORAGE_EMAIL);
    if (orderId || senderEmail) {
      dispatch({
        type: "HYDRATE",
        payload: {
          orderId: orderId || null,
          senderEmail: senderEmail || "",
        },
      });
    }
  }, []);

  useEffect(() => {
    if (state.orderId) {
      localStorage.setItem(STORAGE_ORDER_ID, state.orderId);
    }
    if (state.senderEmail) {
      localStorage.setItem(STORAGE_EMAIL, state.senderEmail);
    }
  }, [state.orderId, state.senderEmail]);

  const setOrderId = useCallback((id: string) => {
    dispatch({ type: "SET_ORDER_ID", payload: id });
  }, []);

  const setSender = useCallback((email: string, name: string) => {
    dispatch({ type: "SET_SENDER", payload: { email, name } });
  }, []);

  const setStep = useCallback((step: 1 | 2 | 3 | 4 | 5) => {
    dispatch({ type: "SET_STEP", payload: step });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, []);

  return (
    <MemodroomContext.Provider
      value={{ state, dispatch, setOrderId, setSender, setStep, setLoading, setError }}
    >
      {children}
    </MemodroomContext.Provider>
  );
}

export function useMemodroom() {
  const ctx = useContext(MemodroomContext);
  if (!ctx) throw new Error("useMemodroom must be used within MemodroomProvider");
  return ctx;
}
