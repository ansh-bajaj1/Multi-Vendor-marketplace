/**
 * API Configuration and Utilities
 * Backend URL is hardcoded for local development
 */

// Use Next.js local API routes as a proxy so the frontend remains functional
// even when the backend process is unreachable from the browser environment.
export const API_URL = "/api";

export interface HealthResponse {
  success: boolean;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
    };
    accessToken: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * Fetch health status from backend
 */
export const fetchHealth = async (): Promise<HealthResponse> => {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Health check failed:", error);
    throw error;
  }
};

/**
 * Login user
 */
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Login failed");
  }
  
  return response.json();
};

/**
 * Register user
 */
export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Registration failed");
  }
  
  return response.json();
};
