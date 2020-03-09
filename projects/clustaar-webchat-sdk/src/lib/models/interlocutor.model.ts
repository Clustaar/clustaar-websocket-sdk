export interface Interlocutor {
    type: 'interlocutor';
    id?: string;
    userID?: string;
    socketToken?: string;
    location?: {
        lat: number;
        long: number;
    };
}
