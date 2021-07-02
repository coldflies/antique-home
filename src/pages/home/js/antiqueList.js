$(function () {
    //获取并加载首页轮播图
    function getCarousel() {
        //picData中包含了图片的图片名/图片地址/图片顺序等信息
        var picData = getData("b_v_gmwwbhpq_lbt", "", "order by GMTP_TPSX asc", 1, 0, -1).returnData;
        // console.log(picData);
        //huo
        var pathData = [];
        for (let i = 0; i < picData.length; i++) {
            pathData[i] = JSON.parse(picData[i].GMTP_TP);
        }
        // console.log(pathData[0][0].path);
        //轮播图下面那个小点点的html
        var htmlDot = "";
        //轮播图的html
        var htmlPic = "";

        for (let i = 0; i < picData.length; i++) {
            // 通过获得的path, 拼接请求图象的api
            var src = setImg(pathData[i][0].path);
            console.log(src);
            if (i == 0) {
                htmlDot += "<li data-target=\"#carousel-example-generic\" data-slide-to=\"0\" class=\"active\"></li>";
                htmlPic += "<div class=\"item active\"><img src=" + src + "  alt=\"...\"></div>";
            } else {
                htmlDot += "<li data-target=\"#carousel-example-generic\" data-slide-to=\"" + i + "\"></li>";
                htmlPic += '<div class=\"item\"><a ><img  src=' + src + '  alt=\"...\"></a>'
                    // + '<div class="carousel-caption"><p>有了新一代</p></div>'
                    +
                    '</div>';
            }
        }
        $("ol.lunbodot").html(htmlDot);
        $(".lunboimg").html(htmlPic);
    }
    // getCarousel();


    //新版的新闻轮播界面
    function setNews2() {
        let Imglist = getData("CS_XWLBSX", 'and XWLBSX_XWPT != ""', "order by XWLBSX_XWRQ desc", 1, 0, 4).returnData;
        let pathData = [];
        let tittleData = [];
        //获取标题和新闻内容

        //显示左侧的轮播图
        for (let i = 0; i < Imglist.length; i++) {
            pathData[i] = setImg(Imglist[i].XWLBSX_XWPT.split("*")[1]);
            tittleData[i] = Imglist[i].XWLBSX_XWBT;
        }
        console.log(pathData);
        console.log(tittleData);
        let imgHtml = "";
        let dotHtml = "";
        for (let i = 0; i < Imglist.length; i++) {
            if (i == 0) {
                imgHtml += '<div class="item active">' +
                    '<a href="newdetail.html?newsid=' + Imglist[i].CS_XWLBSX_ID + '&start=' + i + '" target="_blank">' +
                    '<img src="' + pathData[i] + '"></a>' +
                    '<div class="carousel-caption"><p>' + tittleData[i] + '</p></div>' +
                    '</div>';
                dotHtml += '<li data-target="#LBbox" data-slide-to="0" class="active"></li>';
            } else {
                imgHtml += '<div class="item">' +
                    '<a href="newdetail.html?newsid=' + Imglist[i].CS_XWLBSX_ID + '&start=' + i + '" target="_blank">' +
                    '<img src="' + pathData[i] + '"></a>' +
                    '<div class="carousel-caption"><p>' + tittleData[i] + '</p></div>' +
                    '</div>';
                dotHtml += '<li data-target="#LBbox" data-slide-to="' + i + '"></li>';
            }
        }
        $(".newscarousel").html(imgHtml);
        $(".newsdot").html(dotHtml);
        //然后是右侧的li
        let newslist = getData("CS_XWLBSX", "", "order by XWLBSX_XWRQ desc", 1, 0, 8).returnData;
        let lihtml = "";
        for (let i = 0; i < newslist.length; i++) {
            lihtml += '<li>' +
                '<a href="newdetail.html?newsid=' + newslist[i].CS_XWLBSX_ID + '&start=' + i + '" target="_blank">• ' + newslist[
                    i].XWLBSX_XWBT + '</a>' +
                '<span>' + newslist[i].XWLBSX_XWRQ + '</span>' +
                '</li>'
        }
        $("#rtight-inner ul").html(lihtml);
    }
    setNews2();

    let searchMessage = 1;
    // 搜索框的加载事件
    function setSearchBar() {
        //不可移动文物
        $("li#unmovable").click(function () {
            //改变显示样式
            $("input.form-control").attr("placeholder", "不可移动文物...");
            $("button#dropdownMenu1").html('不可移动<span class="caret"></span>');


            $("ul.dropdown-menu>li").removeClass('selected');
            $("li#unmovable").addClass("selected");
            searchMessage = 1;
        })
        //可移动文物
        $("li#movable").click(function () {

            $("input.form-control").attr("placeholder", "可移动文物...");
            $("button#dropdownMenu1").html('可移动<span class="caret"></span>');
            $("ul.dropdown-menu>li").removeClass('selected');
            $("li#movable").addClass("selected");
            searchMessage = 2;
        })
        //通知动态
        $("li#message").click(function () {
            $("input.form-control").attr("placeholder", "通知动态...");
            $("button#dropdownMenu1").html('通知动态<span class="caret"></span>');
            $("ul.dropdown-menu>li").removeClass('selected');
            $("li#message").addClass("selected");
            searchMessage = 3;
        })

        $("button#search").click(function () {
            let search = $("input.form-control").val();
            switch (searchMessage) {
                case 1:
                    // console.log("不可移动文物");
                    search == "" ? window.open("/unmovable.html") : window.open("/unmovable.html?page=1&name=" + search)
                    break
                case 2:
                    // console.log("可移动文物");
                    search == "" ? window.open("/movable.html") : window.open("/movable.html?page=1&name=" + search)
                    break
                case 3:
                    // console.log("通知动态");
                    search == "" ? window.open("/newsList.html") : window.open("/newsList.html?page=1&name=" + search)
                    break
            }
        })

        $("input.form-control").on('keypress', function (event) {
            if (event.keyCode == 13) {
                let search = $("input.form-control").val();
                switch (searchMessage) {
                    case 1:
                        // console.log("不可移动文物");
                        search == "" ? window.open("/unmovable.html") : window.open("/unmovable.html?page=1&name=" + search)
                        break
                    case 2:
                        // console.log("可移动文物");
                        search == "" ? window.open("/movable.html") : window.open("/movable.html?page=1&name=" + search)
                        break
                    case 3:
                        // console.log("通知动态");
                        search == "" ? window.open("/newsList.html") : window.open("/newsList.html?page=1&name=" + search)
                        break
                }
            }
        })
    }
    setSearchBar();



    //设置百度地图
    var map = new BMapGL.Map("dituContent");
    // 创建地图实例 
    var point = new BMapGL.Point();
    // 创建点坐标 
    map.centerAndZoom(point, 6);
    // 初始化地图，设置中心点坐标和地图级别(级别越小,地图显示范围越大,10左右就能显示整个北京市了)
    //令地图可以滚动!
    map.enableScrollWheelZoom();
    //在不同缩放比例下控制标签的显隐
    map.addEventListener('zoomend', function (e) {
        if (map.getZoom() > 6) {
            // console.log("现在可以显示标签");
            // console.log(map);
            // console.log(map.getPanes().markerMouseTarget);
            // console.log(map.getOverlays());
            for (let i of map.getOverlays()) {
                if (i.content != undefined) {
                    i.show()
                }
            }
        } else {
            // console.log("现在不能显示标签");
            for (let i of map.getOverlays()) {
                // console.log(i.content);
                if (i.content != undefined) {
                    i.hide()
                }
            }
        }
    })

    // 设置革命时期的地图
    function getUnmovTime() {
        for (let i = 0; i < 7; i++) {
            $('a.gmsq-' + (i + 1)).click(function () {
                $("a.list-group-item").removeClass("active"); //移除其他片区的蓝标
                $(this).addClass("active"); //给自己整一个
                let sql = `and WBDW_GMSQ_CODE = '${$(this).attr('name').split('-')[1]}'`
                // console.log(sql);
                let data = getData("GM_V_BKYDWBDW", sql, "", 1, 0, 60).returnData;

                //生成之前,先清除地图上过去的标记
                map.clearOverlays();


                // console.log(data);
                if (data.length != 0) {
                    //这部分是批量生成坐标点的函数
                    let myGeo = new BMapGL.Geocoder();
                    //设置地图中心位置
                    // myGeo.getPoint(data[0].WBDW_DWMC, function(point) {
                    // 	map.centerAndZoom(point, 5);
                    // 	// map.setCenter(point)
                    // });

                    for (let i of data) {
                        // debugger
                        console.log("waiceng:" + i.WBDW_DWMC)
                        // console.log(i.WBDW_WD)
                        // console.log(i.WBDW_JD)
                        //当纬度或经度信息不存在时 才采用名称定位
                        if (i.WBDW_WD.length == 0 || i.WBDW_JD.length == 0) {
                            myGeo.getPoint(i.WBDW_DWMC, function (point) {
                                if (point) {
                                    var address = new BMapGL.Point(point.lng, point.lat);
                                    addMarker(address, new BMapGL.Label(i.WBDW_DWMC, {
                                        offset: new BMapGL.Size(10, -10)
                                    }));
                                }
                            });
                        } else {
                            // 当经纬度信息存在时, 就需要采用经纬度定位获取更准确的数据
                            let dotpoint = new BMapGL.Point(i.WBDW_JD, i.WBDW_WD);


                            let convertor = new BMapGL.Convertor();
                            let pointArr = [];
                            pointArr.push(dotpoint);
                            convertor.translate(pointArr, COORDINATES_WGS84, COORDINATES_BD09, function (data) {
                                if (data.status === 0) {
                                    let marker = new BMapGL.Marker(data.points[0]);
                                    map.addOverlay(marker);
                                    console.log(i.WBDW_DWMC)
                                    let label = new BMapGL.Label(i.WBDW_DWMC, {
                                        offset: new BMapGL.Size(10, -10)
                                    });
                                    marker.setLabel(label); //添加百度label
                                    map.setCenter(data.points[0]);
                                }
                            })

                        }



                    }

                    function addMarker(point, label) {
                        let marker = new BMapGL.Marker(point);
                        map.addOverlay(marker);
                        marker.setLabel(label);
                    }
                } else {
                    console.log("该年代暂时没有数据!");
                }


            })
        }
    }
    getUnmovTime()
    $('a.gmsq-1').trigger("click");
    //获取片区,并为片区添加点击事件
    function getPianqu() {
        var pianquData = getData("BWG_V_GMWWPQWH_FQMC", "", "ORDER BY GMWWPQWH_PQXH ASC", 1, 0, -1).returnData;
        var html = "";
        var html2 = "";
        var count = 0;
        console.log(pianquData);
        for (var i = 0; i < pianquData.length; i++) {
            //当其为第一批次的片区数据时,装入html中
            if (pianquData[i].GMWWPQWH_GBPC_CODE == 1) {
                // console.log(pianquData[i].GMWWPQWH_PQXH.charAt(1) == 1);
                if (i == 0) {
                    html += "<li id=\"pianqu" + i + "\" class=\"active pianqubutton\"><a href=\"#home\" data-toggle=\"tab\">" +
                        pianquData[i].GMWWPQWH_FQMC +
                        "</a></li>";
                    count++;
                } else {
                    html += "<li id=\"pianqu" + i + "\" class=\"pianqubutton\"><a href=\"#home\" data-toggle=\"tab\">" + pianquData[
                        i].GMWWPQWH_FQMC +
                        "</a></li>"
                    count++;
                }

            } else if (pianquData[i].GMWWPQWH_GBPC_CODE == 2) { //当其为第二片区的数据时,装入html2(右边的栏)中
                if (i == count) {
                    html2 += "<li id=\"pianqu" + i + "\" class=\"active pianqubutton\"><a href=\"#home\" data-toggle=\"tab\">" +
                        pianquData[i].GMWWPQWH_FQMC +
                        "</a></li>"
                } else {
                    html2 += "<li id=\"pianqu" + i + "\" class=\"pianqubutton\" ><a href=\"#home\" data-toggle=\"tab\">" +
                        pianquData[i].GMWWPQWH_FQMC +
                        "</a></li>"
                }
            }
        }
        //将两份导航添加到表单中去
        $(".pianqu").html(html);
        $(".pianqu2").html(html2);
        //动态为每个片区添加点击事件(点击后表单变化为该片区对应的信息)
        for (let i = 0; i < pianquData.length; i++) {
            $("#pianqu" + i).click(function () {
                console.log(pianquData[i].GMWWPQWH_PQXH);
                //查找该地区所有的省市县信息;
                sqlUrl = "and GMWWPQWH_PQXH=" + "\"" + pianquData[i].GMWWPQWH_PQXH + "\"" + " and GMWWPQWH_GBPC_CODE = " +
                    pianquData[i].GMWWPQWH_GBPC_CODE;
                var detailData = getData("BWG_V_GMWWPQWH_SHDY", sqlUrl, "ORDER BY GMWWPQWH_SHI_CODE ASC", 1, 0, -1).returnData;
                console.log(detailData);
                let cityCount = detailData.length;
                // let countyCount = 0;
                let tableHtml = "";


                // let focuseCity =detailData[3].GMWWPQWH_SHI_NAME;//焦点城市,用于在点击后,视角移动到当前片区大体地图所在的位置
                // console.log(focuseCity);
                //adds是县名的数组
                let adds = [];
                for (let j = 0; j < cityCount; j++) {


                    // countyCount += Number(detailData[j].GMWWPQWH_XIAN_COUNT);
                    tableHtml += "<tr><td class=\"tbshi" + j + "\">" + detailData[j].GMWWPQWH_SHI_NAME + "</td><td class=\"tbxian" +
                        j + "\">" + detailData[j].GMWWPQWH_XIAN_NAME + "</td></tr>"
                    // $("td").hover(function(){
                    // 	// $("td.tbshi"+j).css("color","#888888");
                    // 	console.log("azjhe");
                    // },function() {
                    // });



                    //生成市+县组成的字符串数组
                    if (detailData[j].GMWWPQWH_XIAN_NAME.charAt(',') == -1) {
                        adds.append(detailData[j].GMWWPQWH_XIAN_NAME);
                    } else {
                        adds = adds.concat(detailData[j].GMWWPQWH_XIAN_NAME.split(','));
                    }


                }
                $("caption").text("片区所含地域：市" + cityCount + "个，县" + adds.length + "个");
                $("tbody").html(tableHtml);


                //当点击这个片区时,其他片区的标志要取消
                // let thisclass = $(this).attr('class');
                // if(thisclass.indexOf("pianquone") != -1){//如果当前片区是第一批中的按钮,那么删除第二批中的显示
                // 	$("li.pianqutwo").removeClass("active");
                // }else{
                // 	$("li.pianquone").removeClass("active");
                // }
                $("li.pianqubutton").removeClass("active"); //移除其他片区的蓝标
                $(this).addClass("active"); //给自己整一个


                console.log(adds.length);
                //地图部分的点击事件
                //生成之前,先清除地图上过去的标记
                map.clearOverlays();

                //这部分是批量生成坐标点的函数
                var myGeo = new BMapGL.Geocoder();



                myGeo.getPoint(adds[6], function (point) {
                    map.centerAndZoom(point, 6);
                });

                for (let i = 0; i < adds.length; i++) {
                    let add = adds[i];
                    myGeo.getPoint(add, function (point) {
                        if (point) {
                            var address = new BMapGL.Point(point.lng, point.lat);
                            addMarker(address, new BMapGL.Label( /*(i+1) + ":" + */ add, {
                                offset: new BMapGL.Size(10, -10)
                            }));
                        }
                    });
                }

                function addMarker(point, label) {
                    var marker = new BMapGL.Marker(point);
                    map.addOverlay(marker);
                    marker.setLabel(label);
                }

            });
        }


    }
    // getPianqu();





    //设置革命纪念馆栏的显示
    function setMovableList() {
        let movData = getData("GM_V_JNG", "and JNG_JJTP is not null and JNG_JJTP  != ''", "", 1, 0, 4).returnData;
        console.log(movData);
        //构建路径数组
        var pathData = [];
        for (let i = 0; i < movData.length; i++) {
            // console.log(movData[i].GMJNGJCSJDCB_GMJNGJJ)
            /*if (movData[i].GMJNGJCSJDCB_GMJNGJJ.match(/fileKey=(\S*)&quot/) === null) {
                console.log("发现无图片元素,使用默认图片展示");
                pathData[i] = "default";

            } else {
                pathData[i] = movData[i].GMJNGJCSJDCB_GMJNGJJ.match(/fileKey=(\S*)&quot/)[1];
            }*/
            if (movData[i].JNG_JJTP != "") {
                pathData[i] = movData[i].JNG_JJTP.split("*")[1];
            } else {
                pathData[i] = "default";
            }

        }
        //获得路径数组后,  将路径数组用来构建图片和文件var src = "http://192.168.31.185/je/api/readImg?filePath=" + pathData[i][0].path;
        var html = "<h5><a href=\"movable.html\">革命纪念馆</a></h5>";
        for (let i = 0; i < 4; i++) {
            let name = movData[i].JNG_JNGMC
            //当图片存在时,正常显示
            if (pathData[i] != "default") {
                let src = setImg(pathData[i]);

                html += "<div class=\"col-md-3 col-sm-3 col-xs-6 collectionItem\">" +
                    "<div class=\"innerItem\">" +
                    "<a href=\"jngdetail.html?msg=" + movData[i].GM_JNG_ID + "\"> <img src=\"" + src +
                    "\" alt=\"\" class=\"img-xz img-responsive\"></a>" +
                    "<time>" + name + "</time>" +
                    "</div>" +
                    "</div>";
            } else {
                //不存在时,使用默认图片进行展示
                html += "<div class=\"col-md-3 col-sm-3 col-xs-6 collectionItem\">" +
                    "<div class=\"innerItem\">" +
                    "<a target=\"_blank\" href=\"jngdetail.html?msg=" + movData[i].GM_JNG_ID +
                    "\"> <img src=\"img/default.jpg\" alt=\"\" class=\"img-xz img-responsive\"></a>" +
                    "<time>" + name + "</time>" +
                    "</div>" +
                    "</div>";
            }


        }
        $(".foundMovableList").html(html);
    }
    // setMovableList();

    //设置不可移动文物展览列表
    function setUnmovableList() {
        let unmovData = getData("GM_V_BKYDWBDW", "and ZP_FJ is not null and ZP_FJ  != ''", "", 1, 0, 4).returnData;
        console.log(unmovData);
        //构建路径数组
        var pathData = [];
        let a = 0;
        var html = "<h5><a href=\"unmovable.html\">不可移动革命文物</a></h5>";
        for (let i = 0; a < 4; i++) {

            // console.log(i);
            // console.log(unmovData[i].ZPXXB_SSWBDW_NAME);
            if (unmovData[i].ZP_FJ == "" || typeof unmovData[i].ZP_FJ == "undefined") {
                // console.log(i+"为空");
                continue;
            } else {
                let name = unmovData[i].WBDW_DWMC;
                let id = unmovData[i].GM_WBDW_ID
                pathData[a] = JSON.parse(unmovData[i].ZP_FJ);
                let src = setImg(pathData[a][0].path);
                console.log(pathData[a][0].path);
                // console.log("发现"+a+"个不为空的");
                html += "<div class=\"col-md-3 col-sm-3 col-xs-6 collectionItem\">" +
                    "<div class=\"innerItem\">" +
                    "<a target=\"_blank\" href=\"unmovdetail.html?msg=" + id + "\"> <img src=\"" + src +
                    "\" alt=\"\" class=\"img-xz img-responsive\"></a>" +
                    "<time>" + name + "</time>" +
                    "</div>" +
                    "</div>";
                a++;
            }
        }
        //获得路径数组后,  将路径数组用来构建图片和文件var src = "http://192.168.31.185/je/api/readImg?filePath=" + pathData[i][0].path;


        $(".foundUnmovableList").html(html);
    }
    // function setUnmovableList() {
    // 	let unmovData = getData("B_V_BKYD1271", "", "", 1, 0, 4);
    // 	console.log(unmovData);
    // 	//构建路径数组
    // 	var pathData = [];
    // 	let a = 0;
    // 	var html = "<h5><a href=\"unmovable.html\">不可移动革命文物</a></h5>";
    // 	for (let i = 0; a < 4; i++) {

    // 		// console.log(i);
    // 		// console.log(unmovData[i].ZPXXB_SSWBDW_NAME);
    // 		if (unmovData[i].NATIONALHERITAGE_TPXX == "") {
    // 			// console.log(i+"为空");
    // 			continue;
    // 		} else {
    // 			let name = unmovData[i].NATIONALHERITAGE_NAME;
    // 			pathData[a] = JSON.parse(unmovData[i].NATIONALHERITAGE_TPXX);
    // 			let src = "http://192.168.31.185/je/api/readImg?filePath=" + pathData[a][0].path;
    // 			console.log(pathData[a][0].path);
    // 			// console.log("发现"+a+"个不为空的");
    // 			html += "<div class=\"col-md-3 col-sm-3 col-xs-6 collectionItem\">" +
    // 				"<div class=\"innerItem\">" +
    // 				"<a target=\"_blank\" href=\"unmovdetail.html?msg="+name+"\"> <img src=\""+ src +"\" alt=\"\" class=\"img-xz img-responsive\"></a>" +
    // 				"<time>" + name + "</time>" +
    // 				"</div>" +
    // 				"</div>";
    // 			a++;
    // 		}
    // 	}
    // 	//获得路径数组后,  将路径数组用来构建图片和文件var src = "http://192.168.31.185/je/api/readImg?filePath=" + pathData[i][0].path;


    // 	$(".foundUnmovableList").html(html);
    // }
    setUnmovableList();



    // 设置可移动文物列表
    function setCollectionList() {
        let collectionData = getData("GM_V_KYD", "and KYDWW_TP is not null and KYDWW_TP  != ''", "", 1, 0, 4).returnData;
        //构建路径数组
        var pathData = [];
        let a = 0;
        var html = "<h5><a href=\"antique.html\">可移动文物</a></h5>";
        for (let i = 0; a < 4; i++) {

            // console.log(i);
            // console.log(unmovData[i].ZPXXB_SSWBDW_NAME);
            if (collectionData[i].KYDWW_TP == "") {
                // console.log(i+"为空");
                continue;
            } else {
                let name = collectionData[i].KYDWW_CPMC;

                let src = setImg(JSON.parse(collectionData[i].KYDWW_TP)[0].path);
                // console.log("发现"+a+"个不为空的");
                html += "<div class=\"col-md-3 col-sm-3 col-xs-6 collectionItem\">" +
                    "<div class=\"innerItem\">" +
                    "<a target=\"_blank\" href=\"antiqueItem.html?message=" + collectionData[i].GM_KYDWW_ID + "\"> <img src=\"" +
                    src + "\" alt=\"\" class=\"img-xz img-responsive\"></a>" +
                    "<time>" + name + "</time>" +
                    "</div>" +
                    "</div>";
                a++;
            }
        }
        //获得路径数组后,  将路径数组用来构建图片和文件var src = "http://192.168.31.185/je/api/readImg?filePath=" + pathData[i][0].path;


        $(".foundCollectionList").html(html);
    }
    setCollectionList();



    //获取新闻信息并渲染新闻列表
    function setNewsList() {
        // let listData = getData("CS_XWLBSX", "", "order by XWLBSX_XWRQ desc", 1, 0, 4);

        let listDataZcwj = getData("CS_XWLBSX", "AND XWLBSX_ZXLM_NAME ='政策文件'", "order by XWLBSX_XWRQ desc", 1, 0, 4).returnData;
        let listDataDfdt = getData("CS_XWLBSX", "AND XWLBSX_ZXLM_NAME ='地方动态'", "order by XWLBSX_XWRQ desc", 1, 0, 4).returnData;
        let listDataGjdt = getData("CS_XWLBSX", "AND XWLBSX_ZXLM_NAME ='国家动态'", "order by XWLBSX_XWRQ desc", 1, 0, 4).returnData;
        let listDataCgzs = getData("CS_XWLBSX", "AND XWLBSX_ZXLM_NAME ='成果展示'", "order by XWLBSX_XWRQ desc", 1, 0, 4).returnData;
        // console.log(listData);
        // let html = "";
        let htmlzcwj = setNewsHtml(listDataZcwj); //政策文件
        let htmldfdt = setNewsHtml(listDataDfdt); //地方动态
        let htmlgjdt = setNewsHtml(listDataGjdt); //国家动态
        let htmlcgzs = setNewsHtml(listDataCgzs); //成果展示



        function setNewsHtml(listData) {
            let html = '';
            for (let i = 0; i < listData.length; i++) {
                let title = listData[i].XWLBSX_XWBT;
                let imgSrc = "";
                if (listData[i].XWLBSX_XWPT != "") {
                    imgSrc = setImg(listData[i].XWLBSX_XWPT.split("*")[1]);
                } else {
                    imgSrc = "img/news/newsDefalut.jpg"
                }
                html += "<div class=\"new-list-item clearfix\">" +
                    "<div class=\"col-xs-4\">" +
                    "<img class=\"img-responsive\" src=\"" + imgSrc + "\" alt=\"\">" +
                    "</div>" +
                    "<div class=\"col-xs-7\">" +
                    "<a href=\"newdetail.html?newsid=" + listData[i].CS_XWLBSX_ID + "&start=" + i + "\" class=\"title\">" + title +
                    "</a>" +
                    "<div class=\"info\">" +
                    "<span> <span class=\"avatar\"></span>" + listData[i].XWLBSX_XWZZ + "</span> ⋅" +
                    "" +
                    "<span>" + listData[i].XWLBSX_XWRQ + "</span>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
            }
            return html;
        }




        $(".new-list-zcwj").html(htmlzcwj);
        $(".new-list-dfdt").html(htmldfdt);
        $(".new-list-gjdt").html(htmlgjdt);
        $(".new-list-cgzs").html(htmlcgzs);

    }
    // setNewsList();



    $('li#pianqu0').trigger("click");
})
