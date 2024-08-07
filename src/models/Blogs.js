// const { connectMysql } = require('../config/db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        imgUrl: { type: String, required: true },
        desc: { type: String, required: true },
        contentHtml: { type: String },
    },
    {
        timestamps: true,
    },
);

const Blogs = {
    // Phương thức để tạo bảng blogs trong cơ sở dữ liệu
    createTable: () => {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS blogs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title TEXT NOT NULL,
            imgUrl TEXT NOT NULL,
            contentHtml LONGTEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        `;
        connectMysql.query(createTableQuery, (err, results, fields) => {
            if (err) {
                console.error('Error creating table:', err);
                return;
            }
            if (results.warningStatus === 0) {
                console.log('Table "blogs" already exists');
            } else {
                // console.log('Table "blogs" created successfully');
            }
        });
    },

    createBlog: (blogData) => {
        return new Promise((resolve, reject) => {
            const insertQuery = 'INSERT INTO blogs SET ?';
            // console.log('insertQuery', insertQuery)
            connectMysql.query(insertQuery, blogData, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    },

    // Phương thức để lấy thông tin của một bình luận từ cơ sở dữ liệu theo ID
    getById: (id_product) => {
        return new Promise((resolve, reject) => {
            const selectQuery = 'SELECT * FROM blogs WHERE id_product = ?';
            connectMysql.query(selectQuery, [id_product], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
};
// module.exports = Blogs;
module.exports = mongoose.model('Blogs', blogsSchema);
