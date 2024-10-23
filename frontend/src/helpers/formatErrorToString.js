function formatErrorToString(error) {
    let stringMessage = 'Something went wrong!';
    try {
        if (typeof error === 'object' && error?.response?.body?.message) {
            stringMessage = error?.response?.body?.message;
        } else if (typeof error === 'object' && error?.message) {
            stringMessage = error?.message;
        } else if (typeof error === 'string') {
            stringMessage = error;
        } else {
            stringMessage = error.toString();
        }
    } catch (err) {
        console.log(error, err);
    }
    return stringMessage;
}

export default formatErrorToString;
