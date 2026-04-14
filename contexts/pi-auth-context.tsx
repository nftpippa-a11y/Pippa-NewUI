"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { PI_NETWORK_CONFIG } from "@/lib/system-config";
import {
  initializeGlobalPayment,
} from "@/lib/pi-payment";

export type LoginDTO = {
  id: string;
  username: string;
  credits_balance: number;
  terms_accepted: boolean;
  app_id: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price_in_pi: number;
  total_quantity: number;
  is_active: boolean;
  created_at: string;
};

interface PiAuthContextType {
  isAuthenticated: boolean;
  authMessage: string;
  hasError: boolean;
  piAccessToken: string | null;
  userData: LoginDTO | null;
  reinitialize: () => Promise<void>;
  appId: string | null;
  products: Product[] | null;
}

const PiAuthContext = createContext<PiAuthContextType | undefined>(undefined);

const loadPiSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // If Pi is already on window, we're good
    if (typeof window !== "undefined" && window.Pi) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    if (!PI_NETWORK_CONFIG.SDK_URL) {
      throw new Error("SDK URL is not set");
    }
    script.src = PI_NETWORK_CONFIG.SDK_URL;
    script.async = true;

    script.onload = () => {
      console.log("✅ Pi SDK script loaded successfully");
      resolve();
    };

    script.onerror = () => {
      console.error("❌ Failed to load Pi SDK script");
      reject(new Error("Failed to load Pi SDK script"));
    };

    document.head.appendChild(script);
  });
};

let piInitialized = false;

export function PiAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMessage, setAuthMessage] = useState("Initializing Pi Network...");
  const [hasError, setHasError] = useState(false);
  const [piAccessToken, setPiAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<LoginDTO | null>(null);

  const authenticateAndLogin = async (): Promise<void> => {
    try {
      setAuthMessage("Authenticating with Pi Network...");
      console.log("🚀 Starting Pi authentication...");

      const scopes = ["username", "payments"];
      const piAuthResult = await window.Pi.authenticate(
        scopes,
        async (payment) => {
          console.log("Incomplete payment detected:", payment);
        }
      );

      console.log("✅ Pi authentication successful:", piAuthResult);

      if (!piAuthResult?.accessToken) {
        throw new Error(
          "authenticate: No access token received from Pi Network"
        );
      }

      setPiAccessToken(piAuthResult.accessToken);
      
      // Since there's no backend, we create a local user object from the SDK result
      setUserData({
        id: piAuthResult.user.uid,
        username: piAuthResult.user.username,
        credits_balance: 0,
        terms_accepted: true,
        app_id: "local-dev",
      });

      setIsAuthenticated(true);
      setHasError(false);
      setAuthMessage(`Connected as ${piAuthResult.user.username}`);
    } catch (err) {
      console.error("❌ Authentication failed:", err);
      setHasError(true);
      setAuthMessage(getErrorMessage(err));
      throw err;
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (!(error instanceof Error))
      return "An unexpected error occurred. Please try again.";

    const errorMessage = error.message;

    if (errorMessage.includes("SDK failed to load"))
      return "Failed to load Pi Network SDK. Please check your internet connection.";

    if (errorMessage.includes("authenticate"))
      return "Pi Network authentication failed. Please try again.";

    return `Authentication error: ${errorMessage}`;
  };

  const initializePiAndAuthenticate = async () => {
    try {
      setHasError(false);
      
      if (typeof window === "undefined") return;

      if (typeof window.Pi === "undefined") {
        setAuthMessage("Loading Pi Network SDK...");
        await loadPiSDK();
      }

      if (typeof window.Pi === "undefined") {
        throw new Error(
          "Pi SDK failed to load. Please check your network connection."
        );
      }

      if (!piInitialized) {
        setAuthMessage("Initializing Pi Network...");
        console.log("🚀 Initializing Pi SDK with sandbox:", PI_NETWORK_CONFIG.SANDBOX);
        await window.Pi.init({
          version: "2.0",
          sandbox: PI_NETWORK_CONFIG.SANDBOX,
        });
        piInitialized = true;
      }

      await authenticateAndLogin();

      // Assigns payment function to window.pay
      initializeGlobalPayment();
    } catch (err) {
      console.error("❌ Pi Network initialization failed:", err);
      setHasError(true);
      setAuthMessage(getErrorMessage(err));
    }
  };

  useEffect(() => {
    initializePiAndAuthenticate();
  }, []);

  const value: PiAuthContextType = {
    isAuthenticated,
    authMessage,
    hasError,
    piAccessToken,
    userData,
    reinitialize: initializePiAndAuthenticate,
    appId: userData?.app_id || null,
    products: [],
  };

  return (
    <PiAuthContext.Provider value={value}>{children}</PiAuthContext.Provider>
  );
}

export function usePiAuth() {
  const context = useContext(PiAuthContext);
  if (context === undefined) {
    throw new Error("usePiAuth must be used within a PiAuthProvider");
  }
  return context;
}
