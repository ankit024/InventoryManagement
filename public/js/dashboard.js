
$(document).ready(() => {
    let inventoryTable = $('#inventoryManagementTable');
    const fetchInventoryItemCall = () => {
        $('#mainLoader').show();
        const url = 'getInventoryItem';
        const queryData = {};
        XHRCall(url, queryData, true).then((responseData) => {
            let dataQuery = responseData.response;
            console.log("TCL: fetchInventoryItemCall -> dataQuery", dataQuery)
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
                    totalvalue += parseInt(d.vendor_quantity)
                    html += `<td>${d.vendor_quantity}</td>`;
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
                            html += `<td class="colorChange">Y</td>`
                        } else if (itemName === 'indian') {
                            html += `<td class="colorChange">Y</td>`
                        } else if (itemName === 'italian') {
                            html += `<td class="colorChange">Y</td>`
                        } else {
                            html += `<td>N</td>`
                        }
                    })
                } else {
                    html += `<td>N</td>`
                    html += `<td>N</td>`
                    html += `<td>N</td>`
                }

                html += '</tr>'
            });
            inventoryTable.append(`<tbody>${html}</tbody>`);
            inventoryTable.DataTable({
                "pagingType": "full_numbers"
            });
            let statusData = $('.statusValue').text();
            let foodData = $('.colorChange');
            if (statusData === 'Insufficient') {
                foodData.addClass('colorRed');
                foodData.removeClass('colorGreen');
            } else if (statusData === 'OK')
                foodData.addClass('colorGreen');
            foodData.removeClass('colorRed');


        });
    };
    fetchInventoryItemCall();

});