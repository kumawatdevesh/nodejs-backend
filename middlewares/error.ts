interface Error {
    message: string
    statusCode: number
}

interface ErrorResponse {
    success: boolean
    error: string
}

export const errorResponse = (err: Error, req: any, res: any, next: any): Promise<ErrorResponse> => {

    return res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    })
}

