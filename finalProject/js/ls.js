export const ls = {
    set: function (item) {
        const data = JSON.stringify(item);
        window.localStorage.setItem("favorites", data);
        
    },
    get: function () {
        const data = window.localStorage.getItem("favorites");
        return (data !== null) ? JSON.parse(data) : null;
    },
}