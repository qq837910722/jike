
angular.module('ionicApp', ['ionic'])
    .config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('tabs', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
        })
        .state('tabs.home', {
          url: "/home",
          views: {
            'home-tab': {
              templateUrl: "templates/home.html",
              controller: 'HomeTabCtrl'
            }
          }
        })
        .state('tabs.facts', {
          url: "/facts",
          views: {
            'home-tab': {
              templateUrl: "templates/facts.html"
            }
          }
        })
        .state('tabs.facts2', {
          url: "/facts2",
          views: {
            'home-tab': {
              templateUrl: "templates/facts2.html"
            }
          }
        })
        .state('tabs.about', {
          url: "/about",
          views: {
            'about-tab': {
              templateUrl: "templates/about.html"
            }
          }
        })
        .state('tabs.navstack', {
          url: "/navstack",
          views: {
            'about-tab': {
              templateUrl: "templates/nav-stack.html"
            }
          }
        })
        .state('tabs.contact', {
          url: "/contact",
          views: {
            'contact-tab': {
              templateUrl: "templates/contact.html"
            }
          }
        });


       $urlRouterProvider.otherwise("/tab/home");

    })

    .factory('Mydata',function(){
        return{
            //做任何操作。
            goods:[
            {
                id:1000,
                name:'英特尔（Intel）酷睿四核 i5-6500 1151接口 盒装CPU处理器',
                img:'img/55e69d62Nfc2b0056.jpg',
                quantity:1,
                price:1439
            },
            {
                id:3300,
                name:'金士顿（Kingston）16GB 80MB/s 高速存储卡',
                quantity:1,
                img:'img/562dcaa0N0a71d46a.jpg',
                price:51
            },
            {
                id:232,
                name:'小米手环',
                img:'img/5641d827N0d0b46fe.jpg',
                quantity:1,
                price:79
            },
            {
                id:100,
                name:'华为 畅享5S 金色 移动联通电信4G手机 双卡双待',
                img:'img/5680a02dN848c1634.jpg',
                quantity:1,
                price:949
            },
            {
                id:105,
                name:'光明 莫斯利安 常温酸奶酸牛奶',
                img:'img/57735d43Nb85f78aa.jpg',
                quantity:1,
                price:37
            },
            {
                id:1030,
                name:'乐事（Lay’s）无限薯片 休闲零食 104g*3组合装',
                img:'img/58660379N1b3bfbc4.jpg',
                quantity:1,
                price:20
            }
            
        ],
        cart:[
           
            
        ]
        }
    })



    .controller('goodsList',function($scope,$ionicModal,Mydata){
        console.log('goodsList');
        $scope.Mydata =Mydata;  
        console.log($scope.Mydata.cart);
            
        //加入购物车确认
        $scope.confirm = function(id){
            var index = findIndex(id);
            if(index != -1){
                 $scope.add(id);
                alert(id+'购买数量加1')
                console.log($scope.Mydata.cart);
            }else{
                var indexn = findGood(id);
                var newshop={
                    id:$scope.Mydata.goods[indexn].id,
                    name:$scope.Mydata.goods[indexn].name,
                    price:$scope.Mydata.goods[indexn].price,
                    quantity:1
                }
                $scope.Mydata.cart.push(newshop);

                console.log($scope.Mydata.cart);
                alert('购物车新增' + id)
            }    
        }
         var findGood = function(id){
            var index = -1;
            angular.forEach($scope.Mydata.goods, function(item, key){
                if(item.id == id){
                    index = key;
                }
            });
            return index;
        }
        var findIndex = function(id){
            var index = -1;
            angular.forEach( $scope.Mydata.cart, function(item, key){
                if(item.id == id){
                    index = key;
                }
            });
            return index;
        }


    })

    .controller('HomeTabCtrl', function($scope,$ionicModal,Mydata) {
        console.log('HomeTabCtrl');
        $scope.Mydata =Mydata;  
        console.log($scope.Mydata.cart);
      

        //产品总价
        $scope.totalPrice = function(){
            var total = 0;
            angular.forEach($scope.Mydata.cart,function(item){
                total+=item.quantity*item.price;
            })
            return total;
        }
        //产品总数
        $scope.totalQuantity = function(){
            var total = 0;
            angular.forEach($scope.Mydata.cart,function(item){
                total+=parseInt(item.quantity);
            })
            return total;
        }
        //移除产品
        $scope.remove = function(id){
            var index =  findIndex(id);
            if(index != -1){
                $scope.Mydata.cart.splice(index,1)
            }
        }
        //清空购物车
        $scope.clearCart = function(){
            $scope.Mydata.cart = []
        }
        //增加数量
        $scope.add = function(id){
            var index = findIndex(id);
            if(index != -1){
               $scope.Mydata.cart[index].quantity++;
            }
        }
        $scope.reduce = function(id){
            var index = findIndex(id);
            if(index != -1){
                var item = $scope.Mydata.cart[index];
                if(item.quantity >1) {
                    item.quantity--;
                }
                else{
                    var returnKey = confirm('是否从购物车删除该产品?');
                    if(returnKey)
                        $scope.remove(id);
                }
            }
        }
        var findIndex = function(id){
            var index = -1;
            angular.forEach($scope.Mydata.cart, function(item, key){
                if(item.id == id){
                    index = key;
                }
            });
            return index;
        }
        
        $scope.$watch('cart',function(newValue, oldValue){
            angular.forEach(newValue,function(item, key){
               // console.log(newValue);
                if(item.quantity < 1){
                    var returnKey = confirm('是否从购物车中删除该产品?');
                    if(returnKey)
                        $scope.remove(item.id);
                    else
                        item.quantity = oldValue[key].quantity;
                }
            })
        },true); 

    })


