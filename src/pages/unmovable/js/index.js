$(function () {
    //对筛选信息和页数进行检索, 目前还没有做数据筛选,有数据筛选之后再考虑这边该如何进行数据统计
    let page;
    // console.log(UrlParam.paramValues("page")[0]);

    //获取当前页码
    (UrlParam.paramValues("page") == undefined || UrlParam.paramValues("page")[0] == "") ? page = 1 : page = parseInt(
        UrlParam.paramValues("page")[0]);
    // console.log(typeof(page))
    console.log(page);

    //获取当前筛选对象
    let searchMsg = deCodeUrl();
    // console.log(searchMsg)
    //根据当前对象, 渲染搜索导航列表
    renderList(searchMsg);
    //为导航栏设置跳转
    setNavListUrl(searchMsg);
    //拼接sql语句
    let sql = setSql(searchMsg);

    console.log(sql);

    // let test = {
    // 	azhe:"啊这",
    // 	buhuiba:"不会吧",
    // 	wofo:"我佛"
    // }
    // let testchange = setUrl("wofo","你佛锤子佛",test);
    // console.log(test);
    // console.log(testchange);
    // let a = setUrl("page",3,searchMsg);
    // console.log(a);
    // $("li#中华民国" ).addClass("selected");



    //通过请求数据库,获取当前总计的条数 这个数据已经是number型的的了,不需要强制类型转换
    // let start = (page-1)*15;
    let count = 0;
    // console.log(sql)
    if (searchMsg.name != "selectall" || searchMsg.pici != "selectall" || searchMsg.niandai != "selectall" || searchMsg.leixing !=
        "selectall") {
        // count = getData("B_V_BKYD1271", sql, "", 1, 0, -1).length;
        count = getData("GM_V_BKYDWBDW", sql, "", 1, 0, 15).returnCount;

    } else {
        // count = getData("b_v_1271shuju", "", "", 1, 0, 15)[0].NATIONALHERITAGE_NAME;
        count = getData("GM_V_COUNTBKYD", "", "", 1, 0, 1).returnData[0].NATIONALHERITAGE_NAME;
    }
    $("span#count").text(count);

    let listData = getData("GM_V_BKYDWBDW", sql, "", 1, (page - 1) * 15, 15).returnData;
    console.log(listData);
    // console.log(JSON.parse(listData[0].NATIONALHERITAGE_TPXX)[0].path);
    function setList() {
        // debugger;
        let html = [];
        for (let i = 0; i < listData.length; i++) {
            let picSrc = "";
            if (listData[i].ZP_FJ == null || listData[i].ZP_FJ == "") {
                picSrc = "img/default.jpg"
            } else {
                picSrc = setImg(JSON.parse(listData[i].ZP_FJ)[0].path)
            }

            html.push('<div class="col-md-4 col-sm-4 itemdiv">');
            html.push(' <div class="itemcontainer">');
            html.push(
                ' <a href="unmovdetail.html?msg=' + listData[i].GM_WBDW_ID + '" target="_blank" class="products-border">' +
                '<div class="imgcontainer">' +
                '<img src="' + picSrc + '" alt="">' +
                '</div>' +
                '</a>');
            html.push(' <strong id="unmovname">' + listData[i].WBDW_DWMC + '</strong>');
            html.push('<p class="level">所属年代:' + listData[i].WBDW_GMSQ_NAME + '</p>');
            // html.push(
            // 	' <p id="knowmore"><a href="unjngdetail.html?msg=' + listData[i].NATIONALHERITAGE_NAME + '" target="_blank" class="products-aniu">了解更多<i class="fa fa-angle-right"></i></a></p>'
            // );
            html.push('</div> </div>');
        }
        if (listData.length == 0) {
            html.push('<h2 class="default">对不起!没有找到您想要的信息</h2>');
        }
        // console.log(html);
        $("#listDiv").html(html.join(" "));
    }
    setList();




    //设置设置翻页条的点击事件
    function setTurnPage(searchMsg) {
        let lastpage = Math.ceil(count / 15);
        console.log(lastpage);
        if (listData.length == 0) { //一条都找不到还加载个锤子页码

        } else if (page <= 7) { //当前页码在7以下时,应该是     << [1] [2] [3] [4] [5] [6] [7] ... >>的样子
            /*第一步!添加"<<"按钮*/
            let fristhtml = [];
            if (page == 1) { //如果page为1,就不能翻页了,要禁用掉上一页按钮
                fristhtml.push('<li class="disabled">');
                fristhtml.push('<a  aria-label="Previous">');
                fristhtml.push('<span aria-hidden="true">&laquo;</span>');
                fristhtml.push('</a>');
                fristhtml.push('</li>');
                // fristhtml.push('');
            } else { //如果不为1 则上一页按钮可以正常启用

                fristhtml.push('<li>');
                // console.log(setUrl("page",page-1,searchMsg));
                fristhtml.push('<a href="' + setUrl("page", page - 1, searchMsg) + '" aria-label="Previous">');
                fristhtml.push('<span aria-hidden="true">&laquo;</span>');
                fristhtml.push('</a>');
                fristhtml.push('</li>');
                // console.log(fristhtml);
            }
            // $('ul.pagination-lg').html(fristhtml.join(' '));
            /*第二步!添加中间的[1] [2] [3] [4] [5] [6] [7]按钮*/
            let middlehtml = [];
            for (let i = 1; i <= lastpage; i++) {
                if (i <= 7) { //前七页,为每个li添加点击事件
                    if (i == page) { //如果当前li是我所在的页,那么这个li要变蓝
                        middlehtml.push('<li class="active"><a href="' + window.location.href + '">' + i + '</a></li>');
                        if (page == 7 && lastpage != 7) { //如果当前是第七页,并且第七页不是最后一页,为了使操作逻辑连贯,加个[8]在后面
                            middlehtml.push('<li><a href="' + setUrl("page", 8, searchMsg) + '">' + 8 + '</a></li>');
                        }
                    } else {
                        middlehtml.push('<li><a href="' + setUrl("page", i, searchMsg) + '">' + i + '</a></li>');

                    }
                } else { //后面的都可以省略
                    continue;
                }
            }
            // $('ul.pagination-lg').html(fristhtml.join(' ')+middlehtml.join(' '));
            /*第三步!添加 "... [26]  [27]" 和 ">>"按钮*/
            let lasthtml = [];
            if (lastpage > 8) {
                lasthtml.push('<li class="disabled dinone"><a>...</a></li>');
                lasthtml.push('<li class="dinone"><a href="' + setUrl("page", (lastpage - 1), searchMsg) + '">' + (lastpage - 1) +
                    '</a></li>');
                lasthtml.push('<li class="dinone"><a href="' + setUrl("page", lastpage, searchMsg) + '">' + lastpage +
                    '</a></li>');
            }

            if (page == lastpage) {
                lasthtml.push('<li class="disabled"><a aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
            } else {
                lasthtml.push('<li><a href="' + setUrl("page", page + 1, searchMsg) +
                    '" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
            }

            /*第四步!把大象放进冰箱门里并关上冰箱*/
            $('ul.pagination-lg').html(fristhtml.join(' ') + middlehtml.join(' ') + lasthtml.join(' '));








        } else if (page > 7 && page <= (lastpage - 4)) { //如果是中间的页数,那么样式应该为 << [1] [2] ...[9] [10] [11] [12] [13] ... [28]>>的样子
            let fristhtml = [];
            let middlehtml = [];
            let lasthtml = [];
            //第一步, << [1] [2] ...的加载
            fristhtml.push('<li>');
            fristhtml.push('<a href="' + setUrl("page", page - 1, searchMsg) + '" aria-label="Previous">');
            fristhtml.push('<span aria-hidden="true">&laquo;</span>');
            fristhtml.push('</a>');
            fristhtml.push('</li>');

            fristhtml.push('<li class="dinone"><a href="' + setUrl("page", 1, searchMsg) + '">' + 1 + '</a></li>');
            fristhtml.push('<li class="dinone"><a href="' + setUrl("page", 2, searchMsg) + '">' + 2 + '</a></li>');

            fristhtml.push('<li class="disabled dinone"><a>...</a></li>');

            //第二步, [9] [10] [11] [12] [13] 的加载
            for (let i = page - 2; i < page + 3; i++) {
                if (i == page) { //如果当前li是我所在的页,那么这个li要变蓝
                    middlehtml.push('<li class="active"><a href="' + window.location.href + '">' + i + '</a></li>');
                } else {
                    middlehtml.push('<li><a href="' + setUrl("page", i, searchMsg) + '">' + i + '</a></li>');
                }
            }


            //第三步, ... [28]>> 的加载
            lasthtml.push('<li class="disabled dinone"><a>...</a></li>');
            lasthtml.push('<li class="dinone"><a href="' + setUrl("page", lastpage, searchMsg) + '">' + lastpage + '</a></li>');
            lasthtml.push('<li><a href="' + setUrl("page", page + 1, searchMsg) +
                '" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');



            //第四步, 拼接并执行
            $('ul.pagination-lg').html(fristhtml.join(' ') + middlehtml.join(' ') + lasthtml.join(' '));



        } else { //如果是末尾的页数,那么样式应该为 << [1] [2] ... [25] [26] [27] [28]>>的样子
            let fristhtml = [];
            let middlehtml = [];
            let lasthtml = [];

            //第一步, << [1] [2] ...的加载
            fristhtml.push('<li>');
            fristhtml.push('<a href="' + setUrl("page", page - 1, searchMsg) + '" aria-label="Previous">');
            fristhtml.push('<span aria-hidden="true">&laquo;</span>');
            fristhtml.push('</a>');
            fristhtml.push('</li>');

            fristhtml.push('<li class="dinone"><a href="' + setUrl("page", 1, searchMsg) + '">' + 1 + '</a></li>');
            fristhtml.push('<li class="dinone"><a href="' + setUrl("page", 2, searchMsg) + '">' + 2 + '</a></li>');

            fristhtml.push('<li class="disabled dinone"><a>...</a></li>');
            //第二步, [25] [26] [27] [28]的加载
            for (let i = lastpage - 3; i <= lastpage; i++) {
                if (i == page) { //如果当前li是我所在的页,那么这个li要变蓝
                    middlehtml.push('<li class="active"><a href="' + window.location.href + '">' + i + '</a></li>');
                } else {
                    middlehtml.push('<li><a href="' + setUrl("page", i, searchMsg) + '">' + i + '</a></li>');
                }
            }
            //第三步, >>的加载
            if (page == lastpage) { //如果当前页已经是最后一页了,那么要对这页进行禁用
                lasthtml.push('<li class="disabled"><a aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
            } else {
                lasthtml.push('<li><a href="' + setUrl("page", page + 1, searchMsg) +
                    '" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
            }

            //第四步, 拼接并执行
            $('ul.pagination-lg').html(fristhtml.join(' ') + middlehtml.join(' ') + lasthtml.join(' '));

        }
    }

    setTurnPage(searchMsg);


})




//网页的解析与加载部分


//函数1: 根据当前url网址,  将搜索信息解析出来
function deCodeUrl() {
    let searchMsg = {
        page: 1,
        name: "",
        jibie: "",
        shiqi: "",
        province: "",
        pianqu: "",
    }

    //页数 默认是1
    // console.log(UrlParam.paramValues("page"));
    if (UrlParam.paramValues("page") != undefined) {
        searchMsg.page = parseInt(UrlParam.paramValues("page")[0]);
    } else {
        searchMsg.page = 1
    }

    //名称
    if (UrlParam.paramValues("name") != undefined) {
        searchMsg.name = UrlParam.paramValues("name")[0];
    } else {
        searchMsg.name = "selectall"
    }

    //批次
    // if (UrlParam.paramValues("pici") != undefined) {
    // 	searchMsg.pici = UrlParam.paramValues("pici")[0];
    // } else {
    // 	searchMsg.pici = "selectall"
    // }

    // //年代
    // if (UrlParam.paramValues("niandai") != undefined) {
    // 	searchMsg.niandai = UrlParam.paramValues("niandai")[0];
    // } else {
    // 	searchMsg.niandai = "selectall"
    // }

    // //类型
    // if (UrlParam.paramValues("leixing") != undefined) {
    // 	searchMsg.leixing = UrlParam.paramValues("leixing")[0];
    // } else {
    // 	searchMsg.leixing = "selectall"
    // }
    //级别
    if (UrlParam.paramValues("jibie") != undefined) {
        searchMsg.jibie = UrlParam.paramValues("jibie")[0];
    } else {
        searchMsg.jibie = "selectall"
    }

    //时期
    if (UrlParam.paramValues("shiqi") != undefined) {
        searchMsg.shiqi = UrlParam.paramValues("shiqi")[0];
    } else {
        searchMsg.shiqi = "selectall"
    }

    //省份
    if (UrlParam.paramValues("province") != undefined) {
        searchMsg.province = UrlParam.paramValues("province")[0];
    } else {
        searchMsg.province = "selectall"
    }

    //革命片区pianqu
    if (UrlParam.paramValues("pianqu") != undefined) {
        searchMsg.pianqu = UrlParam.paramValues("pianqu")[0];
    } else {
        searchMsg.pianqu = "selectall"
    }

    return searchMsg;
}

//函数2: 根据当前的search对象,将搜索信息拼接成sql语句
//根据传入的对象, 编织sql语句,之后将其塞入接口请求函数中
//返回string是一个包含好几个and的sql语句
function setSql(searchMsg) {
    let sql = []
    if (searchMsg.name != "selectall") {
        sql.push("AND WBDW_DWMC like '%" + searchMsg.name + "%'");
    }

    // if (searchMsg.pici != "selectall") {
    // 	sql.push("AND NATIONALHERITAGEBATCH_NAME = '" + searchMsg.pici + "'");
    // }

    // if (searchMsg.niandai != "selectall") {
    // 	sql.push("AND NATIONALHERITAGEAGE_NAME='" + searchMsg.niandai + "'");
    // }

    // if (searchMsg.leixing != "selectall") {
    // 	sql.push("AND NATIONALHERITAGETYPE_NAME='" + searchMsg.leixing + "'");
    // }
    if (searchMsg.jibie != "selectall") {
        sql.push("AND WBDW_JB_NAME like '%" + searchMsg.jibie + "%'");
    }
    if (searchMsg.shiqi != "selectall") {
        sql.push("AND WBDW_GMSQ_NAME like '%" + searchMsg.shiqi + "%'");
    }

    if (searchMsg.province != "selectall") {
        sql.push("AND WBDW_SHENG_NAME like '%" + searchMsg.province + "%'");
    }
    //片区的设置, 很麻烦 因为涉及到很多个省和sql语句的拼接
    if (searchMsg.pianqu != "selectall") {
        let pianquSql = [];
        let pianquData = getData("BWG_JCXX_GMWWPQWH", `AND GMWWPQWH_FQMC = '${searchMsg.pianqu}'`, "", 1, 0, -1).returnData;
        // console.log(pianquData);
        for (let i = 0; i < pianquData.length; i++) {
            if (i == 0) {
                pianquSql.push("WBDW_XIAN_CODE = '" + pianquData[i].GMWWPQWH_XIAN_CODE + "'")
            } else {
                pianquSql.push("OR WBDW_XIAN_CODE = '" + pianquData[i].GMWWPQWH_XIAN_CODE + "'")
            }
        }
        sql.push("AND (" + pianquSql.join(" ") + ")")

    }



    console.log(sql.join(" "))
    return sql.join(" ");
}

//函数3: 根据当前的search对象和要跳转的页面,拼接url语句
//用于为左侧的搜索List和下方的翻页添加点击传参,根据不同的按钮,跳转到不同的链接
//为此,需要传入两个参数 ①需要修改的对象属性 ②属性的参数 ③当前网页对象
//想要设置
//返回值为地址的string
function setUrl(key, value, searchMsg) {
    let url = "unmovable.html?";
    let searchKey = []
    let objCopy = JSON.parse(JSON.stringify(searchMsg));
    objCopy[key] = value;
    for (let i in objCopy) {
        if (objCopy[i] != "selectall") {
            let str = i + "=" + objCopy[i];
            searchKey.push(str);
        }
    }
    // console.log(searchKey);
    url += searchKey.join("&");
    console.log(url);
    return url;
}

//函数4: 根据当前的搜索对象,对不同的list赋予class="selected" 表明该项已被选中
// 同时,  
//这个函数放在正片代码的开头,获取到searchMsg后立即执行
function renderList(searchMsg) {
    if (searchMsg.name != "selectall") {
        $("input.searchname").attr('value', searchMsg.name);
    }
    let provinceList = getProvinceList();
    console.log(provinceList);
    for (let i of provinceList) {
        $("ul#provinceList").append(
            `<li role="presentation" id="${i}">
					<a role="menuitem" tabindex="-1" href="${setUrlforList("province", i, searchMsg)}">${i}</a>
			</li>`
        )
    }

    let pianquList = getData("BWG_V_GMWWPQWH_FQMC", "", "", 1, 0, -1).returnData;
    // console.log(pianquList);
    for (let i of pianquList) {
        $("ul#pianquList").append(
            `<li role="presentation" id="${i.GMWWPQWH_FQMC}">
					<a role="menuitem" href="${setUrlforList("pianqu", i.GMWWPQWH_FQMC, searchMsg)}">${i.GMWWPQWH_FQMC}</a>
			</li>`
        )
    }



    if (searchMsg.province != "selectall") {
        $("button#provinceselect").html(`${searchMsg.province}<span class="caret"></span>`)
    }

    if (searchMsg.pianqu != "selectall") {
        $("button#pianquselect").html(`${searchMsg.pianqu}<span class="caret"></span>`)
    }
    // $("li#" + searchMsg.pici).addClass("selected");
    // $("li#" + searchMsg.niandai).addClass("selected");
    // $("li#" + searchMsg.leixing).addClass("selected");
    $("li#" + searchMsg.jibie).addClass("selected");
    $("li#" + searchMsg.shiqi).addClass("selected");
    $("li#" + searchMsg.province).addClass("selected");
    $("li#" + searchMsg.pianqu).addClass("selected");
}

//函数5: 为list中的每个选项卡设置herf的url跳转
function setNavListUrl(searchMsg) {
    //input的回车跳转
    $('input.searchname').on('keypress', function (event) {
        // console.log($("input.searchname").val());
        // console.log(event);
        if (event.keyCode == 13) {
            if ($("input.searchname").val() == "") {
                window.location.href = setUrlforList("name", "selectall", searchMsg);
            } else {
                window.location.href = setUrlforList("name", $("input.searchname").val(), searchMsg);
            }
        }

    });
    //搜索按钮的点击跳转
    $('button.searchbutton').click(function (event) {
        // console.log('success')
        if ($("input.searchname").val() == "") {
            window.location.href = setUrlforList("name", "selectall", searchMsg);
        } else {
            window.location.href = setUrlforList("name", $("input.searchname").val(), searchMsg);
        }
    })

    // $("li#第一批>a").attr('href', setUrlforList("pici", "第一批", searchMsg));
    // $("li#第二批>a").attr('href', setUrlforList("pici", "第二批", searchMsg));
    // $("li#第三批>a").attr('href', setUrlforList("pici", "第三批", searchMsg));
    // $("li#第四批>a").attr('href', setUrlforList("pici", "第四批", searchMsg));
    // $("li#第五批>a").attr('href', setUrlforList("pici", "第五批", searchMsg));
    // $("li#第六批>a").attr('href', setUrlforList("pici", "第六批", searchMsg));
    // $("li#第七批>a").attr('href', setUrlforList("pici", "第七批", searchMsg));


    // $("li#宋>a").attr('href', setUrlforList("niandai", "宋", searchMsg));
    // $("li#元>a").attr('href', setUrlforList("niandai", "元", searchMsg));
    // $("li#明>a").attr('href', setUrlforList("niandai", "明", searchMsg));
    // $("li#清>a").attr('href', setUrlforList("niandai", "清", searchMsg));
    // $("li#中华民国>a").attr('href', setUrlforList("niandai", "中华民国", searchMsg));
    // $("li#新中国>a").attr('href', setUrlforList("niandai", "新中国", searchMsg));


    // $("li#宅第>a").attr('href', setUrlforList("leixing", "宅第", searchMsg));
    // $("li#建筑群落>a").attr('href', setUrlforList("leixing", "建筑群落", searchMsg));
    // $("li#衙署>a").attr('href', setUrlforList("leixing", "衙署", searchMsg));
    // $("li#书院学堂>a").attr('href', setUrlforList("leixing", "书院学堂", searchMsg));
    // $("li#会馆祠堂>a").attr('href', setUrlforList("leixing", "会馆祠堂", searchMsg));
    // $("li#寺庙>a").attr('href', setUrlforList("leixing", "寺庙", searchMsg));

    $("li#国保>a").attr('href', setUrlforList("jibie", "国保", searchMsg));
    $("li#省保>a").attr('href', setUrlforList("jibie", "省保", searchMsg));
    $("li#市县保>a").attr('href', setUrlforList("jibie", "市县保", searchMsg));
    $("li#未定级>a").attr('href', setUrlforList("jibie", "未定级", searchMsg));

    $("li#旧民主主义革命>a").attr('href', setUrlforList("shiqi", "旧民主主义革命", searchMsg));
    $("li#党组织的创立及大革命>a").attr('href', setUrlforList("shiqi", "党组织的创立及大革命", searchMsg));
    $("li#土地革命>a").attr('href', setUrlforList("shiqi", "土地革命", searchMsg));
    $("li#抗日战争>a").attr('href', setUrlforList("shiqi", "抗日战争", searchMsg));
    $("li#解放战争>a").attr('href', setUrlforList("shiqi", "解放战争", searchMsg));
    $("li#社会主义革命>a").attr('href', setUrlforList("shiqi", "社会主义革命", searchMsg));
    $("li#改革开放>a").attr('href', setUrlforList("shiqi", "改革开放", searchMsg));




    // $("li#" + searchMsg.pici + ">a").attr('href', setUrlforList("pici", "selectall", searchMsg));
    // $("li#" + searchMsg.niandai + ">a").attr('href', setUrlforList("niandai", "selectall", searchMsg));
    // $("li#" + searchMsg.leixing + ">a").attr('href', setUrlforList("leixing", "selectall", searchMsg));
    $("li#" + searchMsg.jibie + ">a").attr('href', setUrlforList("jibie", "selectall", searchMsg));
    $("li#" + searchMsg.shiqi + ">a").attr('href', setUrlforList("shiqi", "selectall", searchMsg));
    $("li#" + searchMsg.province + ">a").attr('href', setUrlforList("province", "selectall", searchMsg));
    $("li#" + searchMsg.pianqu + ">a").attr('href', setUrlforList("pianqu", "selectall", searchMsg));



}
//对左侧搜索栏的url特供版,因为这个url需要将page默认改为1;
window.setUrlforList = function (key, value, searchMsg) {
    let url = "unmovable.html?";
    let searchKey = []
    let objCopy = JSON.parse(JSON.stringify(searchMsg));
    objCopy[key] = value;
    for (let i in objCopy) {
        if (i == "page") {
            objCopy[i] = 1;
            let str = i + "=" + objCopy[i];
            searchKey.push(str);
            continue;
        }
        if (objCopy[i] != "selectall") {
            let str = i + "=" + objCopy[i];
            searchKey.push(str);
        }
    }
    // console.log(searchKey);
    url += searchKey.join("&");
    // console.log(url);
    return url;
}
