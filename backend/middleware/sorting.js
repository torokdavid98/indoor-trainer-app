function sorting(models, sort, sortDir, defaultOrder) {
    let order = sort && sortDir ? [sort, sortDir] : defaultOrder;
    // Handle included sorts or even multipart
    if (order[0].indexOf('.') >= 0) {
        const orderParts = order[0].split('.');
        const modelNames = orderParts.slice(0, -1);
        const field = orderParts[orderParts.length - 1];
        order = [...modelNames.map((modelName) => models[modelName]), field, order[1]];
    }
    return order;
}

module.exports = sorting;
