export interface User{
    id: number;
    userName: string;
    email: string;
    createdAt: Date;
    lastLogin: Date;
    isUserAdmin: boolean;
    active: boolean;
    sessionId: string;
}