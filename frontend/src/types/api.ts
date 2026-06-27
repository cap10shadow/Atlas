export interface ApiResponse<T> {
	success: boolean;
	message: string;
	timestamp: string;
	data: T;
}

export interface ApiErrorResponse {
	success: false;
	message: string;
	errorCode: string;
	timestamp: string;
	errors: string[];
}
