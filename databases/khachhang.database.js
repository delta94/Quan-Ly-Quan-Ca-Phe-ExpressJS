//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const KhachHang = require('../models/khachhang');

module.exports.createWHEREPart = function (input, isPrimarykeyOnly = false) {
    let query = ` WHERE 1=1 `;
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND ID_KHACH_HANG = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object' && input.constructor === KhachHang) {
            if (input.idKhachHang) {
                query += ` AND ID_KHACH_HANG = ${mysql.escape(input.idKhachHang)} `;
                if (isPrimarykeyOnly) {
                    return query;
                }
            }

            if (input.ten) {
                query += ` AND TEN = ${mysql.escape(input.ten)} `;
            }

            if (input.sdt) {
                query += ` AND SDT = ${mysql.escape(input.sdt)} `;
            }

            if (input.idTaiKhoan) {
                query += ` AND ID_TAI_KHOAN = ${mysql.escape(input.idTaiKhoan)} `;
            }

            if (input.diemTichLuy) {
                query += ` AND DIEM_TICH_LUY = ${mysql.escape(input.diemTichLuy)} `;
            }
        }
        //Input is Array
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input
                .map((item) => {
                    if (typeof item === 'number' || typeof item === 'string') {
                        return ` ID_KHACH_HANG = ${mysql.escape(item)} `;
                    }
                    return ` ID_KHACH_HANG = ${mysql.escape(item.idKhachHang)} `;
                })
                .join(' OR ');
            query += ')';
        }
    }
    return query;
};

module.exports.createQueryGet = function (input) {
    let query = 'SELECT * FROM khach_hang';
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryPost = function (input) {
    let query = `INSERT INTO khach_hang (ID_KHACH_HANG,TEN,SDT,ID_TAI_KHOAN,DIEM_TICH_LUY) VALUES ( ${mysql.escape(input.idKhachHang)},${mysql.escape(input.ten)},${mysql.escape(input.sdt)},${mysql.escape(input.idTaiKhoan)},${mysql.escape(input.diemTichLuy)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE khach_hang SET `;
    let queryChanges = [];

    if (input.ten) {
        queryChanges.push(` TEN = ${mysql.escape(input.ten)} `);
    }

    if (input.sdt) {
        queryChanges.push(` SDT = ${mysql.escape(input.sdt)} `);
    }

    if (input.idTaiKhoan) {
        queryChanges.push(` ID_TAI_KHOAN = ${mysql.escape(input.idTaiKhoan)} `);
    }

    if (input.diemTichLuy) {
        queryChanges.push(` DIEM_TICH_LUY = ${mysql.escape(input.diemTichLuy)} `);
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart(input.idKhachHang);

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM khach_hang`;
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryExists = function (input) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM khach_hang `;

    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.converResultGet = function (input) {
    let output = new KhachHang();

    output.idKhachHang = input.ID_KHACH_HANG;

    output.ten = input.TEN;

    output.sdt = input.SDT;

    output.idTaiKhoan = input.ID_TAI_KHOAN;

    output.diemTichLuy = input.DIEM_TICH_LUY;

    return output;
};

module.exports.get = function (input) {
    return baseDatabase.get(input, module.exports.createQueryGet, module.exports.converResultGet);
};

module.exports.post = function (input) {
    return baseDatabase.post(input, module.exports.createQueryPost);
};

module.exports.put = function (input) {
    return baseDatabase.put(input, module.exports.createQueryExists, module.exports.createQueryPatch, module.exports.createQueryPost);
};

module.exports.patch = function (input) {
    return baseDatabase.patch(input, module.exports.createQueryPatch);
};

module.exports.delete = function (input) {
    return baseDatabase.delete(input, module.exports.createQueryDelete);
};

module.exports.exists = function (input) {
    return baseDatabase.exists(input, module.exports.createQueryExists);
};
