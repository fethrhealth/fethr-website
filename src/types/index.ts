// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Waitlist types
export interface WaitlistData {
  email: string;
}

export interface AttioPersonRecord {
  data: {
    values: {
      name?: string;
      email_addresses: string[];
    };
  };
}

// Demo form types
export interface DemoFormData {
  fullName: string;
  workEmail: string;
  companySize: string;
  howCanWeHelp: string;
}

// Form validation error types
export type FormErrors<T> = {
  [K in keyof T]?: string;
}

// Carousel types
export interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
}

// Newsletter/Waitlist signup response
export interface WaitlistResponse {
  success: boolean;
  message: string;
  error?: string;
}