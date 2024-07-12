export const responseHandler = (res, data, status = 200) => {
    return res.status(status).json({
        status: 'success',
        statusCode: status,
        dataSource: data
    });
}

export const errorResponseHandler = (res, error, status = 500) => {
    return res.status(status).json({
        status: 'error',
        statusCode: status,
        message: error
    });
}   