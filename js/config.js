
var apiRootUrl = "/";
var loadUrl = "je/api/load";
var imgViwerUrl = "je/api/readImg";

/**
 * 加载数据
 * @param {Object} tableCode
 * @param {Object} whereSql
 * @param {Object} orderSql
 * @param {Object} page
 * @param {Object} start
 * @param {Object} limit
 */
function getData(tableCode, whereSql, orderSql, page, start, limit) {

    var date = {
        returnData: '',
        returnCount: ''
    }

    $.ajax({
        type: "get",
        url: apiRootUrl + loadUrl,
        data: {
            "tableCode": tableCode,
            "whereSql": whereSql,
            "orderSql": orderSql,
            "page": page,
            "start": start,
            "limit": limit
        },
        async: false,
        success: function (data) {
            //console.log(data);
            var jsonData = $.parseJSON(data);
            if (jsonData.success) {
                date.returnData = jsonData.rows;
                date.returnCount = jsonData.totalCount;
            } else {
                alert("接口结果返回错误！")
            }
        },
        error: function (data) {
            //console.log(data);
            alert("接口结果返回错误！")
        }
    });
    return date;
}

function alertError() {
    var check = window.confirm("该页面不存在,请确认路径名是否正确");
    if (check == true) {
        window.location.href = "gmww.html";
    } else {
        window.location.href = "gmww.html";
    }
}

function loadCheck(msg) {
    //第一步进行路径名的检查,如果路径名中的博物馆名为空或者根本不存在,则直接返回主页
    if (UrlParam.paramValues(msg) == undefined || UrlParam.paramValues(msg) == "") {
        alertError();
    }
    var mov = UrlParam.paramValues(msg)[0];
    console.log(mov);
    //将路径名中的博物馆信息返回
    return mov;
}

//设置图片的链接
function setImg(path) {
    let imgSrc = "/je/api/readImg?filePath=" + path;
    // http://192.168.31.185
    // let imgSrc = "http://192.168.31.186/je/apis/readImg?filePath=" + path;
    return imgSrc;
}