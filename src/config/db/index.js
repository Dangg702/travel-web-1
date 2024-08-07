const mongoose = require('mongoose');
const dotenvFlow = require('dotenv-flow');
const mysql = require('mysql');
// const Blogs = require('../../models/Blogs')
dotenvFlow.config();

const connect = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connect successfully!');
        })
        .catch((err) => console.log('Error connecting to Mongoose server'));
};

const connectMysql = mysql.createConnection({
    host: 'blog.clwsgi6u02ga.ap-southeast-2.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: '29072002',
    database: 'blog_db',
});

// connectMysql.connect((err) => {
//     if (err) {
//         console.log(err.message);
//         return;
//     }
//     console.log('Connect Mysql success!');
//     // Tạo bảng comments khi kết nối thành công
//     Blogs.createTable();
// });
// const Blogs = {
//     // Phương thức để tạo bảng blogs trong cơ sở dữ liệu
//     createTable: () => {
//         const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS blogs (
//             id INT AUTO_INCREMENT PRIMARY KEY ,
//             title TEXT NOT NULL,
//             imgUrl TEXT NOT NULL,
//             contentHtml LONGTEXT,
//             description LONGTEXT,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )
//         `;
//         connectMysql.query(createTableQuery, (err, results, fields) => {
//             if (err) {
//                 console.error('Error creating table:', err);
//                 return;
//             }
//             if (results.warningStatus === 0) {
//                 console.log('Table "blogs" already exists');
//             } else {
//                 // console.log('Table "blogs" created successfully');
//             }
//         });
//     },

//     createBlog: (blogData) => {
//         return new Promise((resolve, reject) => {
//             const insertQuery = 'INSERT INTO blogs SET ?';
//             // console.log('insertQuery', insertQuery)
//             connectMysql.query(insertQuery, blogData, (err, results) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(results.insertId);
//                 }
//             });
//         });
//     },

//     getBlogs: () => {
//         return new Promise((resolve, reject) => {
//             const selectQuery = 'SELECT * FROM blogs ';
//             connectMysql.query(selectQuery, (err, results) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });
//     },
//     getBlogByTitle: (title) => {
//         return new Promise((resolve, reject) => {
//             const selectQuery = 'SELECT * FROM blogs WHERE title = "' + title +'"';
//             connectMysql.query(selectQuery, (err, results) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });
//     },
// };

module.exports = { connect };
