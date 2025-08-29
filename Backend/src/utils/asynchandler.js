const asyncHandler = (requestHeader) => {
    return (req, res, next) => {
         Promise
        .resolve(requestHeader(req, res, next))
        .catch((error) => next(error))
    }
}


export {asyncHandler}