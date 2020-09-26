
$(document).ready(function () {
    //Initialize Table
    tableQuanLytaikhoan = $('#tableQuanLytaikhoan').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="mataikhoan" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="tendangnhap" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="matkhau" data="${data}">${renderData}</span>`;
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
                    let taikhoan = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuataikhoan' 
mataikhoan="${taikhoan.mataikhoan}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletetaikhoanRowInTable($(this));">
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
//Get taikhoans
function gettaikhoans() {
    return new Promise(function (resolve, reject) {
        $.get('/api/taikhoan', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in taikhoans
function refreshTableData() {
    tableQuanLytaikhoan.clear();
    for (let taikhoan of taikhoans) {
        tableQuanLytaikhoan.row.add([
            taikhoan.mataikhoan, taikhoan.tendangnhap, taikhoan.matkhau, taikhoan.loai, taikhoan
        ]);
    }
    tableQuanLytaikhoan.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemtaikhoan();
    refreshDataInModelSuataikhoan();

    taikhoans = await gettaikhoans();
    refreshTableData();
}    