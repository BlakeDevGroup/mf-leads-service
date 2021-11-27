export interface ISuccessPayload {
    data: any;
    status: number;
}

export interface IErrorPayload {
    error: Error;
    status: number;
}

export type ResponsePayload = ISuccessPayload | IErrorPayload;

export const sendSuccess = (
    status: number = 200,
    data: any = []
): ResponsePayload => {
    return { data, status };
};

export const sendFailure = (
    status: number = 400,
    error: Error
): ResponsePayload => {
    return { error, status };
};

const MessageService = {
    sendSuccess: sendSuccess,
    sendFailure: sendFailure,
};

export default MessageService;
