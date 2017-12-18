   	//获取经纬度	
   		function getGeolocation(){
   			 if(navigator.geolocation){
				     navigator.geolocation.getCurrentPosition(on_success);  
			    };  
				//成功回调  
			function on_success(position){   
				  var lon=position.coords.longitude;  //经度
				  var lat=position.coords.latitude; //纬度
				  // 估算的经度   
				 // console.log(position.coords.longitude);    
				 // title.innerHTML+=position.coords.latitude+"纬度="+position.coords.latitude;
				    changeMap(lon,lat);
					getTextTip(lon,lat);
			} ;
   		}  
		//转换坐标
        //谷歌坐标
        function changeMap(lon,lat){
		    var x = lon;
		    var y = lat;
		    var ggPoint = new BMap.Point(x,y);		
		    //地图初始化
		    var bm = new BMap.Map("allmap");
		    bm.centerAndZoom(ggPoint, 15);
		    bm.addControl(new BMap.NavigationControl());		
		    //坐标转换完之后的回调函数
		    translateCallback = function (data){
		      if(data.status == 0) {
		        var marker = new BMap.Marker(data.points[0]);
		        bm.addOverlay(marker);//添加谷百度marker
		        bm.setCenter(data.points[0]);//data.points[0]百度地址
		        //得到详细地址再进行标注
		        getInfoAddr(data.points[0],marker,bm);
				
		      }
		    }
		
		    setTimeout(function(){
		        var convertor = new BMap.Convertor();
		        var pointArr = [];
		        pointArr.push(ggPoint);
		        convertor.translate(pointArr, 3, 5, translateCallback)
		    }, 1000);
		}	
		//创建一个方法,通过经纬度来获取详细信息
		function getInfoAddr(_point,marker,bm){
			var gc = new BMap.Geocoder(); 
			gc.getLocation(_point, function(rs) {
				//alert(rs.sematic_description);
				var addComp = rs.addressComponents;
				//得到省份，城市，街道
	//			var mapAddress = addComp;
				var _addrInfo=addComp.province+","+addComp.city+","+addComp.district+","+addComp.street+","+addComp.streetNum;
				var opts = {
				  width : 200,     // 信息窗口宽度
				  height: 100,     // 信息窗口高度
				  title : "当前你的位置是" , // 信息窗口标题
				  enableMessage:true,//设置允许信息窗发送短息
				  message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
				}
				var infoWindow = new BMap.InfoWindow(_addrInfo, opts);  // 创建信息窗口对象 
				marker.addEventListener("click", function(){          
					bm.openInfoWindow(infoWindow,_point); //开启信息窗口
				});
			})
		}