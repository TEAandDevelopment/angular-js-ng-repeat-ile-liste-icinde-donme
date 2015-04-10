##AngularJS kullanarak dizi içerisinde dönme, bunları ekrana yazdırma, ekleme ve silme işlemleri

Öncelikle AngularJS kütüphanesini sayfamıza "head" tagının içindeki "title" tagının altına ekliyoruz.


    <head>
    	<title>Talha Emin AYDEMİR :: AngularJS kullanarak dizi içerisinde dönme, bunları ekrana yazdırma, ekleme ve silme işlemleri</title>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>
    </head>

"head" tagı yukarıdaki hali alıyor. AngularJS kütüphanesinden sonra kendi JavaScript kodlarımızı yazacağımız js dosyasını sayfamıza referans ediyoruz.
Bu js dosyasının AngularJS kütüphanesinden sonra eklenmesi gerekmektedir. Aksi takdirde bozulmalar/çalışmamalar yaşanabilir.

	<head>
		<title>Talha Emin AYDEMİR :: AngularJS kullanarak dizi içerisinde dönme, bunları ekrana yazdırma, ekleme ve silme işlemleri</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>
        <script src="main.js"></script>
    </head>

"head" tagı bu hali aldıktan sonra app'imizi oluşturabiliriz.
Bunun için öncelikle bir elemente "ng-app" attribute'ü ile app belirtmemiz gerekiyor. App içinde birden fazla <strong>controller</strong> barındırabildiği için ben app'i html elementine bağlıyorum.

	<html ng-app="teaApp">
	    <head>
	    	<title>Talha Emin AYDEMİR :: AngularJS kullanarak dizi içerisinde dönme, bunları ekrana yazdırma, ekleme ve silme işlemleri</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>
        <script src="main.js"></script>
	    </head>
	    <body>

	    </body>
	</html>

Kodlarımızın son durumu bu oluyor. Burada html elementine verdiğim ng-app attribute'ünün değeri sizin app isminiz oluyor. Bu app üzerinden controller'lar directive'ler ekleyerek genişletiyorsunuz. Burada benim kullandığım "teaApp" kendi seçtiğim bir isim buraya kendi app isminizi girebilirsiniz. Burayı değiştirirken dikkat etmeniz gereken 3 şey var.

<ul>
	<li>Burada app ismini değiştirdikten sonra yazacağımız js'deki app isimlerini de kendinize göre düzenleyin.</li>
	<li>Birden fazla app kullanılacak projelerde bunların karışmaması ve çakışmamasına dikkat edin</li>
	<li>App isimlendirmesi yaparken özel karekter($,#,_,-,? vs.), özel terimler(return, do, while, if vs.) ve Türkçe karekterler(ü,ş,İ,ç,ö vs.) kullanmamaya dikkat edin.</li>
</ul>

Şimdi JavaScript tarafında app'imizi tanımlayalım. "main.js" isimli dosyayı açıp içerisine aşağıdaki kodu yazalım.

	var app = angular.module("teaApp", []);

Burada app'i bir değişkene atıyoruz. İlk verdiğim parametre benim app ismimi. İkincideki boş dizi daha ileri de kullanacağınız route, angularfire tarzı şeyleri tanımlamanız için kullanılacak. Buradaki app değişkeni üzerinden controller, directive vs. eklemeleri gerçekleşiyor. O yüzden app değişkeninize iyi bakın.

Şimdi controller tanımlamaya geçelim öncelikle bizim yapacağımız işlem basit olduğu için birden fazla controller kullanmayacağız. O yüzden ben controller'ımı body elementinde tanımlayacağım.

	<body ng-controller="teaCntrl"></body>

body tagıma yukarıdaki gibi controller'ımı tanımladım. Buradaki teaCntrl benim controller ismim. Controller'ımın isminin sonundaki Cntrl benim değişkenimin controller olduğunu belirtmek için kullandım. Kullanılması zorunlu değil ama faydalı buluyorum.

Controller'ı js tarafında tanımlamaya geçiyoruz. main.js dosyamızı açıp aşağıdaki satırı ekliyoruz.

	app.controller("teaCntrl", function ($scope) {

	});

Burada app değişkenimize controller fonksiyonu ile controller ekliyoruz. İlk parametre app tanımlamadaki gibi controller ismi.
İkinci parametre ise controller'ın ana fonksiyonu. Fonksiyonun aldığı $scope parametresi ise sabit bir parametredir. İsmi değiştirilmemelidir. Bu değişken size controller'ın scope'unu verir. Bu $scope üzerinde tanımladığınız değişken, fonksiyon vs şeylere html tarafında da ulaşabilirsiniz. 

Şimdi bizim eklediğimiz verilerin tutulacağı diziyi controller'ımızın içerisinde tanımlayalım.

	app.controller("teaCntrl", function ($scope) {
		$scope.Messages = [];
	});

Controller'ımız yukardaki gibi oldu. Şimdi bu diziye ekleme yapmak için html kodlarımızın içerisinde bir form oluşturmamız içerisine de bir buton ve input atmamız gerekiyor.
Body elementinin içerisini aşağıdaki gibi dolduruyoruz.

	<form ng-submit="addMessage()">
        <input type="text" ng-model="NewMessage">
        <button type="submit">Ekle</button>
    </form>

Yukarıdaki kodda ng-submit attribute'ü bizim formumuzun submit ettiğinde vereceği tepki oluyor. Ben bu attribute'ün içerisini addMessage fonksiyonunu çağırarak doldurdum. Yani formumuz submit olduğunda bu fonksiyon çağıracak. Ama parametre göndermiyor. Peki veriler nasıl taşınacak?

Sorunun cevabı şu şekilde oluyor. Input nesnesine verdiğim ng-model attribute'ü controller'ımın içerisindeki bir değişken olacak. ng-model çift taraflı binding oluyor. Yani ben inputa bir değer girdiğimde hiçbir şekilde hiçbirşey tetikletmesem bile controller'ımındaki değişkenin değeri değişiyor. addMessage fonksiyonundan da scope üzerindeki değişkenin değeri üzerinden işlem yapacağız. 

Şimdi controller'ımıza NewMessage değişkenini ve addMessage fonksiyonunu tanımlamaya başlayalım. Öncelikle aşağıdaki satırını buluyoruz.

	$scope.Messages = [];

satırının altına aşağıdaki kodu ekleyelim.

	$scope.NewMessage = "";

	$scope.addMessage = function () {
        $scope.Messages.push($scope.NewMessage);
        $scope.NewMessage = "";
    };

Burada ilk olarak eklenecek değeri değişken olarak tanımlıyoruz.
Daha sonra scope üzerinde bir değere bir fonksiyonu atadık. Bu fonksiyon bizim controller'ımızın Messages dizisine push fonksiyonu ile değer ekliyor. Daha sonra da input'un temizlenmesi ve bir sonraki eklemede değerler birbirine girmemesi için değişkenin değerini temizliyoruz.

Ekleme işlemini yaptık şimdi görüntülemeye geçelim. Aşağıdaki kodu body'nin içerisinde herhangi bir yere ekleyebilirsiniz.

	<ul>
        <li ng-repeat="thsMessage in Messages">{{$index}}&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{thsMessage}}&nbsp;&nbsp;&nbsp;:<span ng-click="removeMessage($index)">Sil</span></li>
    </ul>

Buradaki ng-repeat foreach gibi bir döngü oluyor. {{$index}} değeri bize kaçıncı değeri basıyorsa onun indexini veriyor. Dikkat etmeniz gereken olay ise bu değer 0 dan başlar.
{{thsMessage}} ise o anki Messages dizindeki elemanı veriyor. Span elementine atadığımız ng-click olayi isminden de anlaşıldığı gibi click eventi bağlamak için kullanılıyor. 
Burada fonksiyona bir parametre gönderiyoruz. Burada parametre göndermeyi tercih etmemizin sebebi index değeri her li için farklı olmasıdır. Şimdi silme fonksiyonunu controller'ımızda addMessage fonksiyonun altına aşağıdaki gibi tanımlayalım.

	$scope.removeMessage = function (Index) {
        $scope.Messages.splice(Index, 1);
    };

Buradaki splice fonksiyonu ile gelen index değerindeki elemanı siliyoruz. 
