
//封装经纬度
function getLocation(map,callback){
	   map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
        callback(data);
    }
    //解析定位错误信息
    function onError(data) {
        document.getElementById('tip').innerHTML = '定位失败';
    }
}

//通过经纬度获取详细信息
function getAddrInfo(_lon,_lat,callBack){
	 	lnglatXY = [_lon,_lat]; //已知点坐标
  		var arr=new AMap.LngLat(_lon,_lat);
        var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });        
        geocoder.getAddress(lnglatXY, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
//              var address = result.regeocode.formattedAddress; //返回地址描述
                var address = result.regeocode;
                callBack(address);
            } 
        }); 
} 
 
 /////搜索点击事件   周边搜索
 function searchInfo(_type,_map,_cpoint,_index,callBack){
	  AMap.service(["AMap.PlaceSearch"], function() {
	        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
	            pageSize: 10,
	            type: _type,
	            pageIndex: _index,	           
	            map: _map,
//	            panel: "panel"
	        });	        
	        var cpoint =_cpoint; //中心点坐标
	        placeSearch.searchNearBy('', cpoint, 2000, function(status, result) {
				callBack(result);
	        });
	  });
}