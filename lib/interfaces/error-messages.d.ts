export interface ErrorMessages {
    [controlName: string]: {
        message: any;
        code: string;
    }[];
}
