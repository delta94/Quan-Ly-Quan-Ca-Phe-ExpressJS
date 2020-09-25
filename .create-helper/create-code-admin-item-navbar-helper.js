const fs = require('fs');
const path = require('path');

const tableData = require('./tableData');
const ccfs = require('./createCodeFunctions');

let datas = tableData.tableData;

let contents = '';

//Create controller
contents += `
nav.sb-topnav.navbar.navbar-expand.navbar-dark.bg-dark
    a.navbar-brand(href='/admin') Quản lý quán cà phê
    button#sidebarToggle.btn.btn-link.btn-sm.order-1.order-lg-0
        i.fas.fa-bars
    //Navbar options
    ul.navbar-nav.ml-auto
        li.nav-item.dropdown
            a#userDropdown.nav-link.dropdown-toggle(href='', role='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                i.fas.fa-user.fa-fw
                span#loginInfo(idTaiKhoan=taikhoan.idTaiKhoan, username=taikhoan.username) #{taikhoan.username}
            // Thông tin tài khoản
            .dropdown-menu.dropdown-menu-right(aria-labelledby='userDropdown')
                a.dropdown-item(href='/login/account-info') Thông tin tài khoản 
                a.dropdown-item(href='/login/change-account-info') Thay đổi thông tin tài khoản 
                .dropdown-divider
                a.dropdown-item(href='/login/logout') Đăng xuất
                .dropdown-divider
                a.dropdown-item(href='/staff') Trang dành cho STAFF
                a.dropdown-item(href='/user') Trang dành cho USER
`;

ccfs.writeStringSync(`${__dirname}/results/views/admins`, `_item_navbar.pug`, contents);
