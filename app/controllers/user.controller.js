const user = require("../models/user.models");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content tidak boleh kosong"
        });
    }
    const user = new User({
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
        images: req.body.images
    });
    user.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Terjadi kesalahan"
            });
        }
        else {
            res.send(data);
        }
    });
};


// login
exports.Login = (req, res) => {
    user.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            res.status(400).send('Username tidak ada');
        }

        bctypt.compare(req.body.password, user.get('password'), function (err, isMatch) {
            if (err) {
                res.status(400).send('Password Error');
            };

            if (isMatch) {
                jwt.sign({
                    id: user.get('id'),
                    hakakses: user.get('roles')
                }, process.env.SECRETKEY, (error, token) => {
                    res.json({
                        token: token
                    });
                })
            } else {
                res.status(400).send('Wrong Password');
            }
        })
    })
}