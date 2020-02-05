
$(document).ready(() => {
    let inventoryTable = $('#inventoryManagementTable');
    let inventoryChefTable = $('#inventoryChefTable');
    let managerRoleTable = $('.managerRoleTable')
    let chefRoleTable = $('.chefRoleTable')
    let roleDefine = JSON.parse($.cookie("role"));

    if (roleDefine === 'chef') {
        managerRoleTable.hide();
    } else {
        chefRoleTable.hide();
    }


    const fetchInventoryItemCall = () => {
        $('#mainLoader').show();
        const url = 'getInventoryItem';
        const queryData = {};
        XHRCall(url, queryData, true).then((responseData) => {
            let dataQuery = responseData.response;
            let html = '';
            let vendorTemp = '';
            let bakerTemp = '';
            dataQuery.forEach((data, index) => {
                let totalvalue = st = 0;
                html += `<tr>
                            <td>${data.category}</td>
                            <td>${data.itemName}</td>
                            <td>${data.quantity}</td>`;

                data.vendor.map(d => {
                    totalvalue += parseInt(d.vendor_quantity);
                    if (roleDefine != 'chef') {
                        html += `<td>${d.vendor_quantity}</td>`;
                    }
                    if (parseInt(d.vendor_quantity) == 0) { st++; }
                });

                html += `<td>${totalvalue}</td>`;
                if (st > 0) { html += `<td class= "statusValue colorRed">Insufficient</td>`; }
                else {
                    if (data.quantity > totalvalue) { html += `<td class="statusValue colorRed">Insufficient</td>`; }
                    else { html += `<td class="statusValue colorGreen">OK</td>`; }
                }

                let foodCategory = data.foodCategory;
                if (foodCategory.length > 0) {
                    foodCategory.map(itemName => {
                        if (itemName === 'bakery') {
                            html += `<td class="colorRed">Y</td>`
                        } else if (itemName === 'indian') {
                            html += `<td class="colorRed">Y</td>`
                        } else if (itemName === 'italian') {
                            html += `<td class="colorRed">Y</td>`
                        } else {
                            html += `<td>N</td>`
                        }
                    })
                } else {
                    html += `<td class="colorGreen">N</td>`
                    html += `<td class="colorGreen">N</td>`
                    html += `<td class="colorGreen">N</td>`
                }

                html += '</tr>'
            });
            inventoryTable.append(`<tbody>${html}</tbody>`);
            inventoryTable.DataTable({
                "pagingType": "full_numbers"
            });
        });
    };

    const fetchInventoryChefItemCall = () => {
        $('#mainLoader').show();
        const url = 'getInventoryItem';
        const queryData = {};
        XHRCall(url, queryData, true).then((responseData) => {
            let dataQuery = responseData.response;
            let html = '';
            let vendorTemp = '';
            let bakerTemp = '';
            dataQuery.forEach((data, index) => {
                let totalvalue = st = 0;
                html += `<tr>
                            <td>${data.category}</td>
                            <td>${data.itemName}</td>
                            <td>${data.quantity}</td>`;

                data.vendor.map(d => {
                    totalvalue += parseInt(d.vendor_quantity);
                    if (roleDefine != 'chef') {
                        html += `<td>${d.vendor_quantity}</td>`;
                    }
                    if (parseInt(d.vendor_quantity) == 0) { st++; }
                });

                html += `<td>${totalvalue}</td>`;
                if (st > 0) { html += `<td class= "statusValue colorRed">Insufficient</td>`; }
                else {
                    if (data.quantity > totalvalue) { html += `<td class="statusValue colorRed">Insufficient</td>`; }
                    else { html += `<td class="statusValue colorGreen">OK</td>`; }
                }

                let foodCategory = data.foodCategory;
                if (foodCategory.length > 0) {
                    foodCategory.map(itemName => {
                        if (itemName === 'bakery') {
                            html += `<td class="colorRed">Y</td>`
                        } else if (itemName === 'indian') {
                            html += `<td class="colorRed">Y</td>`
                        } else if (itemName === 'italian') {
                            html += `<td class="colorRed">Y</td>`
                        } else {
                            html += `<td>N</td>`
                        }
                    })
                } else {
                    html += `<td class="colorGreen">N</td>`
                    html += `<td class="colorGreen">N</td>`
                    html += `<td class="colorGreen">N</td>`
                }

                html += '</tr>'
            });
            inventoryChefTable.append(`<tbody>${html}</tbody>`);
            inventoryChefTable.DataTable({
                "pagingType": "full_numbers"
            });
        });
    };


    if (roleDefine === 'chef') {
        fetchInventoryChefItemCall();
    } else {
        fetchInventoryItemCall();
    }

});