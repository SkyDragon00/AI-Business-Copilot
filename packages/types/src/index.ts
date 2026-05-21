// ─── Tipos compartidos: AI Business Copilot ─────────────────────

// ─── Appointments ───────────────────────────────────────────────
export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export interface Appointment {
  id: string;
  businessId: string;
  clientId: string;
  serviceId: string;
  startTime: string; // ISO 8601
  endTime: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Transactions ───────────────────────────────────────────────
export type TransactionType = "income" | "expense";
export type TransactionSource = "voice" | "text" | "auto";

export interface Transaction {
  id: string;
  businessId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  category: string;
  description: string;
  sriCategory: string;
  source: TransactionSource;
  createdAt: string;
}

// ─── Conversational State (KV) ─────────────────────────────────
export type ConversationStep =
  | "idle"
  | "booking_name"
  | "booking_service"
  | "booking_time"
  | "booking_confirm"
  | "transaction_input"
  | "transaction_confirm";

export interface ConversationState {
  step: ConversationStep;
  businessId: string;
  pending: Record<string, unknown>;
  lastActivity: number; // Unix timestamp ms
}

// ─── Gemini parsed responses ────────────────────────────────────
export interface GeminiTransactionParsed {
  type: TransactionType;
  amount: number;
  currency: string;
  category: string;
  description: string;
  sriCategory: string;
}

export interface GeminiIntentResponse {
  intent: string;
  message: string;
  data?: Record<string, unknown>;
}

// ─── WhatsApp webhook types ─────────────────────────────────────
export interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  type: "text" | "audio" | "interactive" | "button";
  text?: { body: string };
  audio?: { id: string; mime_type: string };
  interactive?: {
    type: "button_reply" | "list_reply";
    button_reply?: { id: string; title: string };
    list_reply?: { id: string; title: string };
  };
}

// ─── API Responses ──────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ─── Daily Summary ──────────────────────────────────────────────
export interface DailySummary {
  id: string;
  businessId: string;
  date: string;
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  appointmentsCompleted: number;
  createdAt: string;
}
