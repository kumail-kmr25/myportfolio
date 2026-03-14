const bcrypt = require("bcryptjs");
const password = "KUMAIL@admin25";
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(hash);
});
