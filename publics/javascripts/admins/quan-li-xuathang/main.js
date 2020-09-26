
$(document).ready(function () {
    //Initialize Table
    tableQuanLyxuathang = $('#tableQuanLyxuathang').DataTable({
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maxuathang" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ngaygioxuat" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="manhanvien" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="makhachhang" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="maban" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ghichu" data="${data}">${renderData}</span>`;
                }
            },
    
            {
                targets: 6,
                render: function (data, type, row, meta) {
                    let xuathang = data;
                    let renderData = `
<button type="button" class="btn btn-outline-secondary rounded-0 m-1" data-toggle="modal" data-target='#modelSuaxuathang' 
maxuathang="${xuathang.maxuathang}"
>
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-outline-dark rounded-0 m-1" onclick="deletexuathangRowInTable($(this));">
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
//Get xuathangs
function getxuathangs() {
    return new Promise(function (resolve, reject) {
        $.get('/api/xuathang', {}, function (data, status, xhr) {
            resolve(data);
        });
    });
}

//Refresh data in table with data in xuathangs
function refreshTableData() {
    tableQuanLyxuathang.clear();
    for (let xuathang of xuathangs) {
        tableQuanLyxuathang.row.add([
            xuathang.maxuathang, xuathang.ngaygioxuat, xuathang.manhanvien, xuathang.makhachhang, xuathang.maban, xuathang.ghichu, xuathang
        ]);
    }
    tableQuanLyxuathang.draw();
}

//Refresh all data in page
async function refreshPageData() {
    refreshDataInModelThemxuathang();
    refreshDataInModelSuaxuathang();

    xuathangs = await getxuathangs();
    refreshTableData();
}    