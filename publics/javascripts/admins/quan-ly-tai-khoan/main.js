
$(document).ready(function () {
    //Initialize Table
    tableQuanLyTaiKhoan = $('#tableQuanLyTaiKhoan').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="idTaiKhoan" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="username" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="password" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="loai" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let taiKhoan = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaTaiKhoan' 
idTaiKhoan="${taiKhoan.idTaiKhoan}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deleteTaiKhoanRowInTable($(this));">
    <i class="fas fa-trash"></i>
</button>
`;
                    return `${renderData}`;
                },
            },
        ],
    });

    //Initialize Button Events
    $('#refreshAll').click(function () {
        refreshPageData();
        swal({ text: 'Làm mới thành công ', icon: 'success', timer: 1000});
    });

    //Events

    //Initialize final
    refreshPageData();
});

//Functions
//Get taiKhoans
function getTaiKhoans() {
    return new Promise(function (resolve, reject) {
        $.get('/api/tai-khoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in taiKhoans
function refreshTableData() {
    tableQuanLyTaiKhoan.clear();
    for (let taiKhoan of taiKhoans) {
        tableQuanLyTaiKhoan.row.add([
            taiKhoan.idTaiKhoan, taiKhoan.username, taiKhoan.password, taiKhoan.loai, taiKhoan
        ]);
    }
    tableQuanLyTaiKhoan.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemTaiKhoan();
    refreshDataInModelSuaTaiKhoan();

    taiKhoans = await getTaiKhoans();
    refreshTableData();
}    
