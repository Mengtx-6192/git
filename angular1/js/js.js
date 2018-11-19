// $('#sub').click(function(e) {
//     alert(1);
//     e.preventDefault();
//     var use = this.value;
//     console.log(use);
//     // sessionStorage.setItem('us',)
// });

// var title_Name;
// var dataPrice;
// $(".btn1").click(function(e) {
//     e.preventDefault();
//     console.log(this.title);
//     title_Name = this.title;
//     var dataPrice = $(this).data('price');
//     $('#zhezhao').css('display', 'block');
//     $('#info>span').html(title_Name);
//     $('#info>i').html(dataPrice);
// });

//var app = angular.moudel('myapp', []);
//app.directive('mymask', [function() {
//  return {
//      templateUrl: '',
//      restrict: 'E',
//      replace: true,
//  }
//}])

var app = angular.module('myapp', []);

//注册开始
app.controller('submitCtl', ['$scope', '$http', function($scope, $http) {
	$scope.password = '';
	$scope.sub = function() {
		
		var U = new User($scope.password);
		var result = U.save();
		if(result) {
			$scope.msg = '注册成功';
		} else {
			$scope.msg = '注册失败';
		}

		

	}

}])

//注册结束

//登录开始
app.controller('singinCtl', ['$scope', function($scope) {
	$scope.singin_comt = function() {
		var U = new User($scope.tel);
		var result = U.sign();
		if(result) {
			$scope.tel_info = $scope.tel;
			console.log($scope.tel_info)

		} else {
			alert(1)
			$scope.tel_info = '未注册，请重新注册'
		}
	}
}])
//登录结束

app.controller('breakfast', ['$scope', '$http', function($scope, $http) {
	$http.get('./js/waimai.json')
		.then(function(res) {
			console.log(res.data);
			$scope.data = res.data;
		});
	//  $scope.highLight = function  (i) {
	//  	$scope.focuss = i;
	//  	console.log($scope.focuss);
	//  	console.log(i);
	//  }

	$scope.user = [];
	$scope.choose = function() {
		$scope.num = 1;
		$scope.id = this.item.id;
		$scope.price = this.item.price * 1;
		$scope.title = this.item.title;
		//$scope.totleprice = $scope.price * $scope.number1
		console.log($scope.price);
		console.log($scope.title);
		
		
		var str = {
			id: $scope.id - 0 + 1,
			title1: $scope.title,
			price1: $scope.price,
			num: $scope.num,
			totlePrice: $scope.price * $scope.num,
		};

		$scope.user.push(str);
		console.log($scope.user)
	};
	$scope.delData = function(id) {
		if(!confirm('你确定要删除吗？')) {
			return
		};
		var index = this.user.findIndex(function(item) {
			return item.id == id
		})
		this.user.splice(index, 1);
		this.user.disable = true
	}

	var getsss = sessionStorage.getItem('myPasswrod');
}])
app.directive('myMoban', [function() {
	return {
		template: '<div class="col-xs-6 col-md-4 tmp" ng-repeat="item in data.result"><img ng-src="{{item.imgUrl}}"/><p id="getInfo"><span>{{item.title}}</span><i>{{item.price | currency}}</i></p><div style="overflow-y:scroll"><p>{{item.info}}</p></div><button href="javascript:;" ng-class="{focus:focuss}" ng-click=" choose()" ng-disabled="btnDisabled">购买</button></div>',
		//      ng-click="showw = !show"配合highLight()方法和上面的ng-click="focuss = true"完成两种效果
		restrict: 'ACE',
		replace: true,
		// controller: 'breakfast'
		link:function (scope,element) {
			console.log(element)
			element.on('click',function(){
				alert('你点我了')
			})
		}
	}

}])
app.directive('myShopping', [function() {
	return {
		template: '<ul id="mask_shopping"><li ng-repeat="item1 in user"><span class="glyphicon glyphicon-remove" ng-click="delData();"></span><span>{{item1.id}}</span><span>{{item1.title1}}</span><input type="number"  ng-model="num" value="1" max="100" min="0"><span>{{item1.price1 | currency}}</span><span>{{item1.totlePrice | currency}}</span></ul>',
		restrict: 'E',
		replace: true
	}
}])

function User(password, http1) {
	this.password = password;
	this.http1 = http1;

}
User.prototype.save = function() {

	var str = sessionStorage.getItem('myPasswrod1') || '[]';
	var arr = JSON.parse(str);

	for(var i = 0; i < arr.length; i++) {
		if(arr[i].myPasswrod === this.password) {
			return;
		}
	}

	arr.push({
		myPasswrod: this.password
	});
	sessionStorage.setItem('myPasswrod1', JSON.stringify(arr));

	//	this.http1.get('http://myitcast.com/web_index/waimai/waimai.php', {
	//		params: {
	//			myps: 1
	//		}
	//	}).success(function  (data) {
	//		console.log(data)
	//	})

	return true;
}
User.prototype.sign = function() {
	var str = sessionStorage.getItem('myPasswrod') || '[]';
	var arr = JSON.parse(str);
	for(var i = 0; i < arr.length; i++) {
		if(arr[i].myPasswrod === this.password) {
			return true;
		} else {
			return;
		}
	}
}
//$('#info').modal('hide')