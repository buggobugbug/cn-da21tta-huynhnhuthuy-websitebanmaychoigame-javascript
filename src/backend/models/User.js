const db = require('../config/db');

const User = {
    getAllUsers: (callback) => {
        db.query('SELECT * FROM nguoi_dung', callback);
    },
    getUserById: (id, callback) => {
        db.query('SELECT * FROM nguoi_dung WHERE id = ?', [id], callback);
    },
    createUser: (user, callback) => {
        db.query('INSERT INTO nguoi_dung SET ?', user, callback);
    },
    updateUser: (id, user, callback) => {
        db.query('UPDATE nguoi_dung SET ? WHERE id = ?', [user, id], callback);
    },
    deleteUser: (id, callback) => {
        db.query('DELETE FROM nguoi_dung WHERE id = ?', [id], callback);
    },
};

module.exports = User;
