const fs = require('fs');
const path = require('path');

const tableData = require('./tableData');
const ccfs = require('./createCodeFunctions');

let datas = tableData.tableData;

let contents = '';

//Create controller
contents += `
extends ../layouts/_layout_admin_main_bootstrap

block custom_stylesheets
    //Custom Stylesheet files
    link(type="text/css", rel="stylesheet", href="/stylesheets/admins/admin-main.css")

block content
    //Start Navbar 
    include _item_navbar
    ///End Navbar

    //Content
    #layoutSidenav
        //Sidebar
        include _item_sidebar
        
        //Start Content
        #layoutSidenav_content
            main
                .container-fluid
                    //Title
                    h1.mt-4 Tổng quát

                    //Start Breadcrumb
                    include ../items/_item_breadscrumb
                    ///End readcrumb
                    
                    //Start Main Content
                    .d-flex.flex-column.justify-content-center.align-items-center
                        h1.font-weight-light
                            span Chào mừng đến phần mềm quản lý quán cà phê 
                        span Xin chào #{taiKhoan.tenDangNhap}
                    
                    ///End Main Content
            //Start Footer                
            include ../items/_item_footer
            ///End Footer
        ///End Content

block custom_javascripts
    //Custom javascript files
    script(type="text/javascript", src="/javascripts/admins/admin-main.js")

`;

ccfs.writeStringSync(`${__dirname}/results/views/admins`, `tong-quat.pug`, contents);
