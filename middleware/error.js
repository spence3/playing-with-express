const errorHandler = (err, req, res, next) => {
    // Check if the error has a specific status
    if (err.status) {
        return res.status(err.status).json({ msg: err.message });
    }
    // If no specific status, send a generic 500 error
    return res.status(500).json({ msg: err.message });
};


module.exports = errorHandler