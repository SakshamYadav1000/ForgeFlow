export interface RegisterRequest {
    full_name: string;
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    full_name: string;
    email: string;
    role: string;
    is_active: boolean;
    is_verified: boolean;
    avatar_url: string | null;
    created_at: string;
}