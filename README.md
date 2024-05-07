# IDOR-Insecure-direct-object-referanse-
IDOR vulnerability simulation with nodeJs 


Insecure Direct Object References (IDOR) zafiyeti bir saldırganın hedef web uygulamasında yetkisiz erişim elde etmesine ve eylemler gerçekleştirmesine olanak tanıyan bir web uygulama zafiyetidir.

Örneğin bir kullanıcının paylaştı bir resmi veya bir post'tu onun yetkisi olmadan. Silebilirseniz bu bir Insucere direct object referanse kısaca IDOR güvenlik açığı sömürmüş olacaksınız.

Kendi yaptığım projede ise bu güvenilk açğını barındıran bir web uygulaması tasarladım.


Application architecture

https://github.com/El-Turkco/IDOR-Insecure-direct-object-referanse-/assets/103064152/2eb0700a-3202-4c96-be52-8b0070d91a40



Steps to produce IDOR
1- İki tane farklı hesap açın.(1-Account:hacker,2-Account:TestUser)
2- Test hesabından bir message paylaşın ve messageID'ni alın 
3- Hacker hesabından mesaj silme işlemi gidin ve test hesabın messageID'ni verin ve isteği gönderin.


Bu güvenlik açını kapatmak için: Silme işlemdeki messageID ile giriş yapmış olan kullanıcının userID kontrol edilmelidir. 

Bu yamayı src/Controller/MsjController.js "delete_message" functionun 76 satırında paylaştım. Dilerseniz oraya göz atabilirsiniz. 
