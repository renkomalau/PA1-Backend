module.exports = app => {
    const user = require("../controllers/user.controller");
    

    // Membuat user
    app.post("/resgister", user.create);
    // login 
    app.post("/login", user.login);

};