function format_date (timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

function format_time(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US');
};

function increment(value) {
    return parseInt(value) + 1;
}

function decrement(value) {
    return parseInt(value) - 1;
}

function pagination(totalPages, currentPage) {
    var pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push({
            page: i,
            isCurrent: i === parseInt(currentPage)
        });
    }
    return pages;
}



module.exports = { format_date, format_time, increment, decrement, pagination };