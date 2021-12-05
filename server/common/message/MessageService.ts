export interface ISuccessPayload {
    data: any;
    status: number;
}

export interface IErrorPayload {
    error: object;
    status: number;
}

interface IErrorResponse {
    message: string;
    status: number;
}

export type ResponsePayload = ISuccessPayload | IErrorPayload;

export const sendSuccess = (
    status: number = 200,
    data: any = []
): ResponsePayload => {
    return { data, status };
};

export const makeErrorResposne = (message: string, status: number) => {
    return { error: { message, status } };
};

export const sendFailure = (
    status: number = 400,
    message: string
): ResponsePayload => {
    return { error: makeErrorResposne(message, status), status };
};

const MessageService = {
    sendSuccess: sendSuccess,
    sendFailure: sendFailure,
};

export default MessageService;
