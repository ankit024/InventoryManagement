const XHRCall = (url, queryData, async) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        // xhr.onload = function () {
        //   alert(1);
        // };
        xhr.onload = function () {
            let tempData = {};
            if (xhr.responseText.length > 0) {
                tempData.response = JSON.parse(xhr.responseText);
            } else {
                tempData.response = '';
            }
            if (xhr.status === 200 || xhr.status === 204) {
                tempData.statusCode = xhr.status;
            }
            resolve(tempData);
        };
        xhr.open("POST", "/" + url, async);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("x-csrf-token", $('meta[name="csrf-token"]').attr('content'));
        xhr.send(JSON.stringify({
            'query': queryData
        }));
    });
};