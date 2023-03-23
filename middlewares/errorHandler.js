const errorHandler = (err, req, res, next) => {
    switch (true) {
        case err.name == "SequelizeValidationError":
            res.status(400).json({ ResponseCode: '01', message: err.errors[0].message })
            break;
        case err.name == "UserNotFound":
            res.status(400).json({ ResponseCode: '01', message: "User data not found" })
            break;
        case err.name == "InvalidCredentials":
            res.status(401).json({ ResponseCode: '01', message: "Username/password incorrect" })
            break;
        case err.name == "NoInput":
            res.status(400).json({ ResponseCode: '01', message: "Please input the requirement data" })
            break;
        case err.name == "TokenNotFound":
            res.status(401).json({ ResponseCode: '01', message: "Access token not found" })
            break;
        case err.name == "JsonWebTokenError":
            res.status(401).json({ ResponseCode: '01', message: "Access token incorrect" })
            break;
        case err.name == "NotFound":
            res.status(404).json({ ResponseCode: '01', message: "Data yang dicari not found" })
            break;
        case err.name == "Forbidden":
            res.status(403).json({ ResponseCode: '01', message: "Access forbidden"})
            break;
        case err.name == "SequelizeUniqueConstraintError":
            res.status(403).json({ ResponseCode: '01', message: "Data must be unique"})
            break;
        default:
            res.status(500).json({ ResponseCode: '01', message: "Internal server error" })
            break;
    }
}

module.exports = errorHandler;