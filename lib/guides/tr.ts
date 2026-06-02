import type { GuideCatalog } from "./types";

/**
 * Turkish guide content. Editorial rule: we never say "güvenli" (safe) about a
 * check result. Even at the lowest risk we say "Daha düşük risk — yine de
 * doğrulayın".
 */
export const GUIDES_TR: GuideCatalog = {
  "is-this-a-scam": {
    category: "Buradan başlayın",
    title: "Bu dolandırıcılık mı? Ödemeden önce durun ve kontrol edin",
    description:
      "Beklenmedik bir mesaj, arama veya ödeme isteği mi aldınız? Para göndermeden, kod paylaşmadan veya bir bağlantıya tıklamadan önce kontrol edilecek uyarı sinyalleri burada.",
    ogTitle: "Bu dolandırıcılık mı? Ödemeden veya paylaşmadan önce durun.",
    ogDescription:
      "Acele ettiriliyorsanız, yalnız bırakılıyorsanız veya önce ödeme isteniyorsa — durun. O his genellikle haklıdır.",
    h1: "Bu dolandırıcılık mı? Ödemeden veya paylaşmadan önce durun.",
    subhead:
      "Acele ettiriliyorsanız, kararla yalnız bırakılıyorsanız veya bir şey almadan önce ödeme isteniyorsa — durun. O his genellikle haklıdır. Doğru kontrol etmek için iki dakika ayırın.",
    example: {
      sender: "Bilinmeyen numara",
      timestamp: "Bugün · 14:02",
      bubbles: [
        "İyi günler, sosyal güvenlik kurumundan arıyorum.",
        "Adınıza bekleyen 4.200 TL var. Serbest bırakabilmemiz için lütfen kimlik numaranızı doğrulayın.",
        "Bugün havaleyi işleme almak için 200 TL'lik tek seferlik bir işlem ücreti var.",
      ],
    },
    plain: [
      "Dolandırıcılık, tanımadığınız birinin size ulaşıp aciliyet veya güven yaratarak özel bir şeyi ödemenizi ya da paylaşmanızı istemesidir. Senaryo her seferinde değişir — iade, iş, kargo, ilişki, banka güvenlik uyarısı — ama baskı her zaman aynıdır.",
      "Acele ettiriliyorsanız, kararla yalnız bırakılıyorsanız veya bir şey almadan önce ödeme isteniyorsa: durun. Gerçek kurumlar sizi on dakika içinde harekete geçirmeye asla ihtiyaç duymaz.",
    ],
    redFlags: [
      "Beklenmedik bir anda size onlar ulaştı.",
      "Aciliyet var — bugün ödeyin, bir saat içinde harekete geçin, süresi dolmadan.",
      "Sizden para göndermeniz, OTP / güvenlik kodu paylaşmanız veya kimlik fotoğrafı göndermeniz isteniyor.",
      "AnyDesk, TeamViewer, Quick Assist veya herhangi bir “destek” uygulaması yüklemeniz isteniyor.",
      "Bunu ailenizden veya arkadaşlarınızdan gizli tutmanız söyleniyor.",
      "Başvurmadığınız bir para vaat ediliyor — ödül, iade, miras, kâr veya iş.",
      "Ödeme, geri alınamayan yöntemlere yönlendiriliyor: havale, hediye kartı veya kripto.",
    ],
    whatToDo: {
      dont: [
        "Yalnızca bu arama veya mesaj üzerine para göndermeyin ya da bilgi paylaşmayın.",
        "OTP / güvenlik kodu, parola, PIN veya kimlik fotoğrafı paylaşmayın.",
        "AnyDesk, TeamViewer veya başka bir uzaktan erişim uygulaması yüklemeyin.",
        "Sizi hatta tutmalarına izin vermeyin — istediğiniz an kapatabilirsiniz.",
      ],
      do: [
        "Kartınızın üzerindeki veya resmi web sitelerindeki numarayı kullanarak şirketi ya da bankayı doğrudan arayarak doğrulayın.",
        "Harekete geçmeden önce güvendiğiniz bir kişiye sorun — çoğu dolandırıcılık ikinci bir kişi araya girdiği anda çöker.",
        "Para, kod veya bilgi zaten paylaşıldıysa, şimdi bankanızı arayın ve bildirin.",
      ],
    },
    shareMessage:
      "Selam — lütfen bir an dur. Biri sana dolandırıcılık yapıyor olabilir. Para, OTP kodu veya kimlik fotoğrafı göndermeden önce şunu oku:",
  },

  "pay-fee-to-receive-money-scam": {
    category: "Ön ödeme dolandırıcılığı",
    title: "Para almak için ücret ödemen mi isteniyor? Bu dolandırıcılık",
    description:
      "Bir iadeyi, ödülü, mirası veya sosyal güvenlik ödemesini açmak için “küçük bir ücret” ödemeniz söyleniyorsa — yapmayın. Nedeni ve ne yapacağınız burada.",
    ogTitle: "Para almak için ücret ödemek? Bu dolandırıcılık",
    ogDescription:
      "Hiçbir gerçek kurum, sonradan para alabilmeniz için önce para göndermenizi asla istemez.",
    h1: "Para almak için ücret ödemen mi isteniyor? Ödeme.",
    subhead:
      "Hiçbir gerçek kurum, sonradan para almanız için önce para göndermenizi asla istemez. Bu, dünyanın en eski ve en güvenilir dolandırıcılıklarından biridir.",
    example: {
      sender: "+234 80 *** ****",
      timestamp: "Bugün · 09:14",
      bubbles: [
        "Merhaba, 8.500 USD'lik bir havale için seçildiniz.",
        "Fonu serbest bırakmak için lütfen bu bağlantıyla 180$ takas ücretini ödeyin.",
        "Ödemeden sonra paranızı 30 dakika içinde göndereceğiz.",
      ],
    },
    plain: [
      "Buna ön ödeme dolandırıcılığı denir. Dolandırıcı büyük bir tutarı önünüze koyar — ödül, iade, miras, ödeme, sosyal güvenlik talebi — ama bunu açmak için “küçük” bir ücret ödemeniz gerekir. Ödedikten sonra başka bir ücret çıkar. Sonra bir tane daha. Vaat edilen para asla gelmez.",
      "Vaat edilen tutar ücretten çok daha büyük olduğu için ödemek mantıklı gibi görünür. Değildir. Ücret, dolandırıcılığın tüm amacıdır.",
    ],
    redFlags: [
      "Başvurmadığınız bir para hakkında size ulaşıldı.",
      "Bir şey almadan önce bir ücret var — takas, işlem, vergi, gümrük, idari.",
      "Vaat edilen tutar şüpheli derecede büyük.",
      "Ödeme havale, kripto veya hediye kartıyla isteniyor — orijinal gönderene geri değil.",
      "Bugün harekete geçmeniz için baskı yapılıyor.",
      "Tereddüt ettiğinizde hikâye değişir veya yeni bir ücret ortaya çıkar.",
    ],
    whatToDo: {
      dont: [
        "Hiçbir ücreti ödemeyin — sizi bekleyen gerçek bir havale yok.",
        "Banka veya kart bilgilerinizi gönderenle paylaşmayın.",
        "“Doğrulama için” kimlik fotoğrafı göndermeyin.",
        "Pazarlık etmek ya da soru sormak için yanıt vermeyin — bu sadece teması derinleştirir.",
      ],
      do: [
        "Göndereni engelleyin ve mesajı uygulama içinden bildirin (WhatsApp, SMS, e-posta).",
        "Gerçek bir kuruluşa büründülerse, o kuruluşla doğrudan resmi web sitesinden iletişime geçin.",
        "Güvendiğiniz bir kişiye anlatın — yüksek sesle konuşmak, kafanızı toparlamanın en hızlı yoludur.",
      ],
    },
    shareMessage:
      "Kısa bir uyarı — biri daha büyük bir parayı serbest bırakmak için sana küçük bir “ücret” ödemeni isterse, bu dolandırıcılıktır. Bir şey yapmadan önce lütfen şunu oku:",
  },

  "money-waiting-scam": {
    category: "“Bekleyen para” dolandırıcılığı",
    title: "“Bekleyen paranız var” — böyle bir arama gelirse ne yapmalı",
    description:
      "Biri size talep edilmemiş paranız, sosyal güvenlik, miras veya iade olduğunu söylüyor — ama önce ödeme yapmanız gerekiyor. Gerçekte olan bu.",
    ogTitle: "“Bekleyen paranız var” — gerçek değil",
    ogDescription:
      "Bekleyen para yok. İstedikleri ücret, dolandırıcılığın kendisi.",
    h1: "“Bekleyen paranız var.” Neredeyse kesinlikle yok.",
    subhead:
      "Biri size adınıza para olduğunu söyledi — sosyal güvenlik, iade, miras, çekiliş, eski bir hesap. Sonra serbest bırakmak için küçük bir ödeme yapmanızı istiyor. O para gerçek değil.",
    example: {
      sender: "Arayan kimliği gizli",
      timestamp: "Bugün · 11:38",
      bubbles: [
        "Merhaba, sosyal güvenlik kurumundan arıyorum.",
        "Adınıza hiç talep edilmemiş 4.200 TL var. Bugün serbest bırakabiliriz.",
        "Kimliğinizi doğrulamamız ve 200 TL'lik idari ücreti işleme almamız gerekiyor.",
        "Lütfen bunu kimseyle konuşmayın — bu özel bir devlet işlemi.",
      ],
    },
    plain: [
      "“Bekleyen para” dolandırıcılığı basit bir hile üzerine kuruludur: vaat ettikleri miktar, sizden istedikleri ödemeden çok daha büyüktür. Beyniniz bunu iyi bir takas gibi değerlendirir. Bir takas değildir — bekleyen para hiçbir zaman gerçek değildi.",
      "Gerçek kurumlar size talep edilmemiş para konusunda asla ulaşmaz, serbest bırakmak için ücret istemez ve ailenizden gizli tutmanızı asla istemez.",
    ],
    redFlags: [
      "Adınıza bir miktar para olduğu söyleniyor, ama hiç başvurmadınız.",
      "Serbest bırakmadan önce ön ödeme, vergi veya “doğrulama bedeli” var.",
      "Bunu ailenizden gizli tutmanız isteniyor.",
      "Aciliyet yarattılar — “sadece bugün”, “dosya kapanmadan önce”.",
      "Kimlik numaranızı, banka bilgilerinizi veya kimlik fotoğrafınızı istediler.",
      "Arayan kimliği yabancı, gizli veya tuhaf biçimde resmi görünüyor.",
    ],
    whatToDo: {
      dont: [
        "Ücreti göndermeyin — ne kadar küçük veya “tek seferlik” gelirse gelsin.",
        "Kimlik numaranızı, banka bilgilerinizi veya belge fotoğraflarını paylaşmayın.",
        "Bunu ailenizden gizli tutmayı kabul etmeyin — yalnız bu istek dolandırıcılığı kanıtlar.",
      ],
      do: [
        "Kapatın ve kurumu veya bankayı, güvendiğiniz bir numarayla (kartınızda yazılı, web sitelerinde, eski bir mektupta) doğrudan arayın.",
        "Size söylenenleri güvendiğiniz bir kişiye anlatın.",
        "Numarayı engelleyin ki sizi tekrar arayıp baskı yapamasınlar.",
      ],
    },
    shareMessage:
      "Biri sana adına “bekleyen para” hakkında ulaşıyor olabilir. Bu bilinen bir dolandırıcılık — lütfen ödeme yapma ve bilgi paylaşma. Önce şunu oku:",
  },

  "fake-bank-call": {
    category: "Sahte banka araması",
    title: "Sahte banka araması — gerçek bankalar asla bunları istemez",
    description:
      "Biri bankanızın güvenlik ekibinden olduğunu söyleyip OTP, parola veya uygulama yüklemenizi istiyorsa — kapatın. Güvenli doğrulama burada.",
    ogTitle: "Sahte banka araması — gerçek bankaların asla istemediği şeyler",
    ogDescription:
      "Gerçek bankalar OTP, parola veya telefonunuza uzaktan erişim asla istemez.",
    h1: "Sahte banka araması: gerçek bankalar asla bunları istemez.",
    subhead:
      "Biri arayıp veya yazıp hesabınızın risk altında olduğunu, onu “korumaları” gerektiğini söylüyor. Kod, parola veya uygulama yüklemenizi isteyen anda — artık bankanız değildir.",
    example: {
      sender: "“Banka Güvenlik”",
      timestamp: "Bugün · 21:04",
      bubbles: [
        "İyi akşamlar, hesabınıza başka bir ülkeden yetkisiz bir giriş tespit ettik.",
        "İşlemi durdurmak için lütfen az önce gönderdiğimiz 6 haneli kodu okuyun.",
        "Sonra fonlarınızı geçici olarak güvenli bir hesaba taşıyacağız.",
      ],
    },
    plain: [
      "Banka kimliğine bürünme işe yarar çünkü senaryo iyi prova edilmiştir ve aciliyet gerçek hissettirir. Arayan, sizi inandırıcı tutmaya yetecek kadar (genellikle kamuya açık verilerden veya önceki oltalamadan) zaten bilir. Sonra sizi bir kodu, parolayı paylaşmaya veya uzaktan erişim uygulaması yüklemeye iter — tuzak budur.",
      "Sizi para taşımaya yönlendirdikleri “güvenli hesap” onlarındır. Havale yapıldığında geri alınması son derece zordur.",
    ],
    redFlags: [
      "Onlar sizi aradı — siz onları değil.",
      "OTP / doğrulama kodu, PIN, parola veya tam kart numarası istiyorlar.",
      "AnyDesk, TeamViewer, Quick Assist yüklemenizi veya ekranınızı paylaşmanızı istiyorlar.",
      "Parayı “güvenli” veya “tutma” hesabına taşımanızı istiyorlar.",
      "Arayan kimliği bankanıza uyuyor — arayan kimliği taklit edilebilir.",
      "Hatta kalmanız ve kimseye danışmamanız için baskı yapıyorlar.",
    ],
    whatToDo: {
      dont: [
        "Hiçbir kodu, OTP veya parolayı okumayın — bankanız bunları asla istemez.",
        "“Resmi görünse bile” onların isteğiyle hiçbir uygulama yüklemeyin.",
        "“Güvende tutmak için” parayı taşımayın — dolandırıcılığın kendisi budur.",
        "Baskı hissediyorsanız hatta kalmayın. Kapatıp kendiniz arayabilirsiniz.",
      ],
      do: [
        "Kapatın. Bir dakika bekleyin. Sonra banka kartınızın üzerindeki veya resmi uygulamadaki numarayı kullanarak bankanızı arayın.",
        "Aramayı bankanızın dolandırıcılık hattına ve ülkenizin dolandırıcılıkla mücadele kurumuna bildirin.",
        "Bir şey paylaşıldı veya aktarıldıysa, hemen bankanızla iletişime geçerek geri çağırma talep edin ve kartları dondurun.",
      ],
    },
    shareMessage:
      "Biri bankanın güvenlik ekibinden olduğunu söyleyip kod, parola veya uygulama yüklemeni isterse — kapat. Lütfen şunu oku:",
  },

  "otp-code-scam": {
    category: "OTP / güvenlik kodu",
    title: "OTP kodu dolandırıcılığı — kodu asla, “bankanız” bile olsa paylaşmayın",
    description:
      "Bir OTP, doğrulama kodu veya tek kullanımlık parola, hesabınızın anahtarıdır. Gerçek şirketler asla istemez. Nedeni ve nasıl tepki vereceğiniz burada.",
    ogTitle: "OTP kodu dolandırıcılığı — kodu asla paylaşma",
    ogDescription:
      "Az önce gönderilen 6 haneli kodu isteyen biri varsa — o sizin bankanız değildir.",
    h1: "Kodu asla paylaşmayın. Bankanızla bile, kimseyle.",
    subhead:
      "Telefonunuza az önce gelen 6 haneli kod bir anahtardır. Bunu sizden isteyen herkes — banka, kurye, yetkili, “destek temsilcisi” — gönüllü olarak asla açmayacağınız bir kapıyı açmaya çalışıyor.",
    example: {
      sender: "+1 (***) *** 3148",
      timestamp: "Bugün · 17:21",
      bubbles: [
        "Doğrulama kodunuz 248-371. Bunu kimseyle paylaşmayın.",
        "(birkaç saniye sonra, bir telefon araması)",
        "Merhaba, hesap güvenliği — gerçekten siz olduğunuzu doğrulamak için az önce gönderdiğimiz 6 haneli kodu okur musunuz?",
      ],
    },
    plain: [
      "OTP — tek kullanımlık parola, SMS kodu, doğrulama uygulaması kodu — bir hesaba giriş yaptığınızı veya bir ödemeyi onayladığınızı kanıtlayan ikinci faktördür. Tüm sistem, bunu başka kimseye vermemenize bağlıdır.",
      "Biri bu kodu sizden isterse, ne kadar resmi konuşursa konuşsun, sizin yerinize giriş yapmaya veya paranızı taşımaya çalışıyordur. SMS'in kendisini okuyun: genellikle “bunu kimseyle paylaşmayın” yazar.",
    ],
    redFlags: [
      "Biri — bankanızdan olduğunu söyleyen biri bile — OTP / doğrulama kodu istiyor.",
      "Kod, siz istemeden geldi.",
      "Arayan, telefonda sizi “kimliğinizi doğrulama” sürecinden geçiriyor.",
      "Kodu “aciliyetle” istiyorlar, kod süresinin dolmaması için.",
      "Sakin ve profesyonel konuşuyorlar — dolandırıcılar bunun için eğitim alır.",
    ],
    whatToDo: {
      dont: [
        "Kodu sesli okumayın, bir sohbete yazmayın veya gönderdikleri bir siteye yapıştırmayın.",
        "Arayan kimliğine veya e-posta gönderici adına güvenmeyin — ikisi de sahte olabilir.",
        "Kaba görünmek konusunda endişelenmeyin. Kapatın.",
      ],
      do: [
        "Kodu siz istemediyseniz, o hesabın parolasını hemen değiştirin.",
        "Bir şey ters geliyorsa kartınızdaki resmi numarayı kullanarak bankanızı arayın.",
        "Mümkünse uygulama tabanlı kimlik doğrulamayı (Authenticator uygulamaları, güvenlik anahtarları) açın — SMS kodlarına göre oltalama yapılması daha zordur.",
      ],
    },
    shareMessage:
      "Kısa bir hatırlatma: 6 haneli OTP kodunu kimseyle paylaşma — bankanızdanım diyen biriyle bile. Lütfen şunu oku:",
  },

  "whatsapp-scam": {
    category: "WhatsApp dolandırıcılıkları",
    title: "WhatsApp dolandırıcılığı — yaygın örüntüleri nasıl fark edersiniz",
    description:
      "Kimlik taklidi, “Anne, ben” mesajları, sahte iş teklifleri, yatırım grupları, ödül kazanımları. En yaygın WhatsApp dolandırıcılıkları ve nasıl başa çıkılır.",
    ogTitle: "WhatsApp dolandırıcılığı — yaygın örüntüleri fark edin",
    ogDescription:
      "Aynı senaryo, farklı numara. WhatsApp dolandırıcılıklarının gerçek yüzü.",
    h1: "WhatsApp dolandırıcılığı — aynı senaryo, farklı numara.",
    subhead:
      "Çoğu WhatsApp dolandırıcılığı küçük bir örüntü setini tekrar tekrar kullanır: tanıdığınız birine bürünme, kolay para teklifi, ödül vaadi veya banka taklidi. Örüntüleri bir kez görünce saniyeler içinde fark edebilirsiniz.",
    example: {
      sender: "Bilinmeyen · +44 7*** *** ***",
      timestamp: "Bugün · 19:46",
      bubbles: [
        "Anne, ben yeni numaram — telefonum küvete düştü.",
        "Bir iyilik yapar mısın? Acil bir şey ödemem gerek ve banka uygulamam henüz çalışmıyor.",
        "Bu hesaba 6.200 TL gönderebilir misin? Yarın geri ödeyeceğim.",
      ],
    },
    plain: [
      "WhatsApp dolandırıcılıkları neredeyse her zaman aynı şekilde başlar: tanımadığınız bir numaradan, tanıdık bir tını ile gelen mesaj. “Anne, yeni numaram.” “Selam, profilini gördüm, kolay bir iş için müsait misin?” “Tebrikler, kazandın.” “Bankamızdanım.”",
      "Numarayı tanımıyorsanız, söyledikleri her şeye size hikâye anlatan bir yabancı muamelesi yapın. Harekete geçmeden önce zaten güvendiğiniz bir kanaldan doğrulayın.",
    ],
    redFlags: [
      "Rehberinizde olmayan bir numaradan mesaj.",
      "“Telefonunu kaybetmiş” veya “yeni numarası olan” bir aile üyesi ya da arkadaş olduğunu iddia ediyor.",
      "Hızla para, kod veya “onlar adına” bir ödeme istiyor.",
      "Basit işler için olağanüstü yüksek ödeyen bir iş teklif ediyor.",
      "Büyük kârlar gösteren “öğrencilerle” dolu bir gruba ekliyor.",
      "Doğrulamak, ödül talep etmek veya küçük bir ücret ödemek için bağlantı gönderiyor.",
    ],
    whatToDo: {
      dont: [
        "Yalnızca WhatsApp mesajı üzerine para göndermeyin.",
        "OTP kodları, parolaları veya banka bilgilerini paylaşmayın.",
        "Bilinmeyen kişilerden gelen bağlantılara — kısa olsalar bile — tıklamayın.",
      ],
      do: [
        "Bir aile üyesi olduğunu söylüyorsa, önce eski numarasından arayıp doğrulayın. Ya da tanıdık bir hesaptan video araması yapın.",
        "Numarayı WhatsApp içinden bildirin ve engelleyin (isme dokun → Bildir).",
        "Kendi WhatsApp'ınızın ele geçirildiğinden şüpheleniyorsanız, WhatsApp ayarlarından tüm cihazlardan çıkış yapın ve numaranızı yeniden doğrulayın.",
      ],
    },
    shareMessage:
      "Hızlı uyarı — aile üyelerine, bankalara veya iş tekliflerine bürünen bir WhatsApp dolandırıcılığı dalgası var. Sıra dışı bir şeye yanıt vermeden önce lütfen şunu oku:",
  },

  "facebook-marketplace-scam": {
    category: "Pazaryeri dolandırıcılığı",
    title: "Facebook Marketplace dolandırıcılığı — alıcı ve satıcı uyarıları",
    description:
      "Sahte kuryeler, fazla ödeme, platform dışı pazarlıklar, ön ödemeli “kargo ücretleri”. En yaygın Facebook Marketplace dolandırıcılıkları, sade Türkçe.",
    ogTitle: "Facebook Marketplace dolandırıcılığı — uyarı sinyalleri",
    ogDescription:
      "Platform dışı, fazla ödeme, sahte kurye — bilinmesi gereken örüntüler.",
    h1: "Facebook Marketplace dolandırıcılığı — alıcı ve satıcı örüntüleri.",
    subhead:
      "Pazaryeri dolandırıcılıkları aynı birkaç hamleyi kullanır: fazla ödeme, sahte kurye bağlantısı, platform dışı baskı ve “doğrulama” telefonları. Örüntüleri bilmek korumanın büyük kısmıdır.",
    example: {
      sender: "İlgili alıcı · Messenger",
      timestamp: "Bugün · 12:08",
      bubbles: [
        "Selam! İstediğin fiyata alıyorum.",
        "Almak için bir kurye gönderiyorum. Sizden 180 TL küçük bir kargo ücreti alacaklar — ürün ücretiyle birlikte PayPal üzerinden iade edeceğim.",
        "Sana iade edebilmem için kart bilgilerini gönderebilir misin?",
      ],
    },
    plain: [
      "Pazaryeri dolandırıcılıkları tanınabilir birkaç biçime ayrılır. Alıcı tarafı: bir “alıcı” yanlışlıkla fazla öder ve farkı geri ister — genellikle sahte bir makbuzla. Satıcı tarafı: bir “satıcı” harika bir teklif sunar ama sizi platform dışına çıkarıp depozito, kargo ücreti veya doğrulama bedeli ödetmek için baskı yapar.",
      "Bir anlaşma tuhaf biçimde pürüzsüz ilerliyorsa ve karşı taraf hızla platformdan ayrılmak istiyorsa — yavaşlayın. Marketplace'in koruması yalnız platformda kaldığınız sürece geçerlidir.",
    ],
    redFlags: [
      "Konuşmayı hemen Marketplace dışına taşımak istiyorlar (WhatsApp, SMS, e-posta).",
      "“Henüz hesaba düşmemiş” bir ödemenin ekran görüntüsünü gönderiyorlar.",
      "Kart bilgilerinizi, banka girişinizi veya “doğrulama için” tek seferlik kod istiyorlar.",
      "Kartınızı girip “paketi serbest bırakmanız” için bilinmeyen bir kurye bağlantısı kullanıyorlar.",
      "Anlaşma fiyatı her yerden çok daha iyi.",
      "Ürünü görmeden önce depozito istiyorlar.",
    ],
    whatToDo: {
      dont: [
        "Kart bilgilerinizi, banka girişinizi veya OTP kodlarınızı başka bir kullanıcıyla paylaşmayın.",
        "Bilinmeyen kurye bağlantılarına depozito veya “kargo ücreti” ödemeyin.",
        "Ödeme gerçekten hesabınıza geçmeden ürünleri kargoya vermeyin.",
        "Hassas görüşmeleri platform dışına taşımayın.",
      ],
      do: [
        "Yüksek değerli ürünler için gündüz kalabalık bir yerde yüz yüze buluşun ya da kendi seçtiğiniz bir kuryeyi kullanın.",
        "Alıcı veya satıcının profilini kontrol edin — geçmişi, fotoğrafı olmayan yeni hesaplar bir uyarı sinyalidir.",
        "Şüpheli mesajları sohbet üzerinden Facebook'a bildirin (mesaja dokun → Bildir).",
      ],
    },
    shareMessage:
      "Facebook Marketplace'te alıyor veya satıyorsanız, bir anlaşmayı kabul etmeden veya bilgi paylaşmadan önce lütfen şunu okuyun:",
  },

  "romance-money-scam": {
    category: "Romantik dolandırıcılık",
    title: "Romantik dolandırıcılık — aşkın para isteğine dönüştüğü an",
    description:
      "Biri sizinle çevrimiçi bir ilişki kurdu, ardından acil bir durumda para istedi. Romantik dolandırıcılıkların işleyişi ve güvenli şekilde geri çekilmek.",
    ogTitle: "Romantik dolandırıcılık — aşkın para isteğine dönüştüğü an",
    ogDescription:
      "Yalnızca çevrimiçi yaşayan bir ilişki ve acil bir para isteği — romantik dolandırıcılığın örüntüsü budur.",
    h1: "Romantik dolandırıcılık — aşkın para isteğine dönüştüğü an.",
    subhead:
      "Romantik dolandırıcılıklar saflıkla ilgili değildir. Aylarca süren sabırlı bir bağ kurmanın ardından gelen tek bir baskı anıyla ilgilidir. Şu an o anı yaşıyorsanız, lütfen bir şey göndermeden önce durun.",
    example: {
      sender: "Daniel · 5 ay",
      timestamp: "Bugün · 23:14",
      bubbles: [
        "Sevgilim, seni çok özledim. Sonunda buluşacağımız için sabırsızlanıyorum.",
        "Ama bir şey oldu. Hastane, 1.800 EUR'luk faturayı ödeyene kadar beni burada tutuyor.",
        "Güvenebileceğim tek kişi sensin. Lütfen bu gece gönder — eve dönünce ödeyeceğim.",
      ],
    },
    plain: [
      "Romantik dolandırıcılık senaryosu uzun ve kasıtlıdır. Haftalarca veya aylarca süren sıcaklık. Birlikte gelecek planları. Net video görüşmesinden veya yüz yüze buluşmadan kaçınma, her zaman inandırıcı bir gerekçeyle. Sonra ani bir kriz: tıbbi fatura, takılı bir kargo, yurt dışında donmuş bir hesap, gümrük ücreti. “Aşk” bir para isteğine dönüşür.",
      "Bu ne kadar zeki olduğunuzla ilgili değil. Ne kadar insan olduğunuzla ilgili. Dolandırıcılık tam da bağın gerçek hissettirdiği için işler.",
    ],
    redFlags: [
      "Çevrimiçi tanıştınız ve net video görüşmesinden veya yüz yüze buluşmadan kaçındılar.",
      "Uygun şekilde uzakta bir yerde yaşıyor ya da çalışıyorlar — asker, petrol platformu, yurt dışında doktor, sürekli seyahat eden yönetici.",
      "Çabucak sizi sevdiklerini söylediler veya birlikte bir gelecekten bahsettiler.",
      "Aniden bir acil durum paranızı gerektiriyor — tıbbi, hukuki, gümrük, donmuş hesap.",
      "Bunu ailenizden gizli tutmanızı istiyorlar.",
      "Reddederseniz ton suçluluğa veya öfkeye kayıyor.",
    ],
    whatToDo: {
      dont: [
        "Para, hediye kartı veya kripto göndermeyin — hikâye ne kadar acil görünse de.",
        "Onlara yardım etmek için kredi çekmeyin, ailenizden borç almayın, bir şey satmayın.",
        "Daha sonra size baskı yapmak için kullanılabilecek fotoğraflar paylaşmayın.",
        "Size değer veren insanlardan gizli tutmaya söz vermeyin.",
      ],
      do: [
        "Güvendiğiniz bir kişiye olanları anlatın. Mesajları yüksek sesle birlikte okuyun.",
        "Fotoğraflarını ters görsel aramada arayın — birçok romantik dolandırıcı aynı resimleri tekrar tekrar kullanır.",
        "Para göndermiş olsanız bile hemen bankanızla iletişime geçin. Yanlış bir şey yapmadınız ve yalnız değilsiniz.",
      ],
    },
    shareMessage:
      "Selam — naifçe bir şey paylaşmak istiyorum. Çevrimiçi tanıştığın biri acil bir durumda para istiyorsa, bir şey göndermeden önce lütfen şunu oku:",
  },

  "fake-job-task-scam": {
    category: "Sahte iş / görev dolandırıcılığı",
    title: "Sahte görev dolandırıcılığı — paranızı isteyen “kolay iş”",
    description:
      "WhatsApp veya Telegram'da bir “iş”, video beğenmek ya da ürün puanlamak için kolay günlük ödeme sunuyor — ta ki kazancı açmak için para yatırmanız istenene kadar.",
    ogTitle: "Sahte görev dolandırıcılığı — kolay iş para istediğinde",
    ogDescription:
      "Bir iş, kazanmaya devam etmek için para yatırmanızı istiyorsa, o bir iş değildir.",
    h1: "Sahte görev dolandırıcılığı — paranızı isteyen kolay iş.",
    subhead:
      "Bunlar WhatsApp veya Telegram'da samimi yarı zamanlı teklifler olarak başlar; kendi paranızı — sıklıkla kripto olarak — yatırmanız istenerek sonlanır, “zaten kazandığınız” maaşı açmak için.",
    example: {
      sender: "İK · Maria",
      timestamp: "Bugün · 10:32",
      bubbles: [
        "Selam! CV'nizi gördük. Basit çevrimiçi görevler için günde 70€ ödüyoruz — ürün puanlamak, video beğenmek.",
        "İlk 30 görevden sonra, hesabınızı etkinleştirmek ve kazancı açmak için 120€ yatırmanız gerekecek.",
        "Herkes yapıyor — 2 günde kendini ödüyor.",
      ],
    },
    plain: [
      "Bu dolandırıcılıklar gerçek yarı zamanlı işi taklit eder. Size basit görevler verilir ve bir gösterge panelinde büyüyen bir “bakiye” gösterilir. Sonra bir duvar belirir: para yatırın — genellikle kripto — bir sonraki seviyeyi açmak ya da kazancı çekmek için. Gösterge paneli sahtedir. Yatırdığınız para gitmiştir.",
      "Gerçek bir işveren, maaş alabilmeniz için size para göndermenizi asla istemez. Asla.",
    ],
    redFlags: [
      "İş teklifi WhatsApp veya Telegram'a istenmeden gelir.",
      "Çok basit iş için ödeme olağandışı şekilde yüksek.",
      "Platform dışına, bir “eğitmenle” özel bir gruba alınırsınız.",
      "Bazı görevlerden sonra devam etmek veya çekim için para — genellikle kripto — yatırmanız gerekir.",
      "Gösterge paneli henüz çekemediğiniz büyük bekleyen kazançlar gösterir.",
      "Gruptaki diğer “mutlu çalışanlar” kazançlarının ekran görüntülerini paylaşır.",
    ],
    whatToDo: {
      dont: [
        "Bir hesabı “etkinleştirmek” veya kazancı “açmak” için hiçbir para yatırmayın.",
        "Bir iş teklifi üzerinden tanıştığınız kimseye kripto göndermeyin.",
        "Kimlik fotoğrafı, banka bilgileri veya kartınızı paylaşmayın.",
        "Arkadaşlarınızı veya ailenizi gruba dahil etmeyin — dolandırıcılık böyle büyür.",
      ],
      do: [
        "Kişiyi engelleyin ve ilgili gruplardan ayrılın.",
        "Mesajı WhatsApp / Telegram içinden bildirin.",
        "Zaten yatırdıysanız bankanız veya borsanızla iletişime geçin — ne kadar erken, kurtarma şansı o kadar yüksek.",
      ],
    },
    shareMessage:
      "Yaygınlaşan bir iş dolandırıcılığı örüntüsü hakkında hızlı uyarı — bir “iş” kazancı açmak için para yatırmanı isterse, o iş değildir. Lütfen şunu oku:",
  },

  "package-delivery-fee-scam": {
    category: "Kargo dolandırıcılığı",
    title: "Kargo teslim ücreti dolandırıcılığı — o küçük ödeme bir oltalama tuzağı",
    description:
      "Bir SMS veya e-posta, paketinizin gümrükte takılı kaldığını veya küçük bir yeniden gönderim ücreti gerektiğini söyler. Bağlantı kart bilgilerinizi çalar. Güvenli doğrulama burada.",
    ogTitle: "Teslim ücreti dolandırıcılığı — o küçük ödeme bir tuzak",
    ogDescription:
      "Bir kurye bir bağlantı üzerinden 5 TL ödemenizi istiyorsa, bağlantı dolandırıcılığın kendisidir.",
    h1: "Kargo teslim ücreti dolandırıcılığı — bağlantı dolandırıcılığın kendisi.",
    subhead:
      "Hemen hemen her zaman aynı: bir paketi “serbest bırakmak” için minik bir ödeme. Miktar zararsız hisseder. Sayfa kartınızı çalar ve sessizce sizi yinelenen ödemelere kaydeder.",
    example: {
      sender: "DHL-Gumruk",
      timestamp: "Bugün · 08:11",
      bubbles: [
        "DHL: Paketiniz gümrükte beklemede.",
        "Teslimatı serbest bırakmak için lütfen 29,90 TL gümrük ücretini ödeyin:",
        "https://dh1-customs-eu[.]com/track",
      ],
    },
    plain: [
      "Bu mesajlar herkese yönelir; çünkü dolandırıcılar bir yerde birinin az önce bir şey sipariş etmiş olduğunu bilir. Bağlantının ucundaki sayfa gerçek bir kurye gibi görünür. Küçük ücreti ödemek için kart bilgilerinizi ister — ve aynı bilgileri sizi aylık ödemelere kaydetmek veya daha büyük alımlar yapmak için kullanır.",
      "Ücret bilinçli olarak küçüktür. Şüphenizi atlatmak için tasarlanmıştır.",
    ],
    redFlags: [
      "Bir teslimat beklemiyorsunuz — ya da emin değilsiniz.",
      "URL neredeyse kurye adı, ama biraz farklı (dhl ve dh1, .com.eu, fazladan tireler).",
      "Sadece 1-3 EUR ödemek için tam kart bilgilerini — CVV dahil — istiyor.",
      "Aciliyet: “son deneme”, “bugün iade edilecek”.",
      "Mesaj telefon numaranızı kullanır ama size isminizle hitap etmez.",
      "Gönderici kimliği biraz yanlış görünür (ör. sadece “DHL” yerine “DHL-Customs”).",
    ],
    whatToDo: {
      dont: [
        "SMS'teki bağlantıya tıklamayın, sadece “kontrol etmek” için bile.",
        "Bir teslimat SMS'inden ulaşılan hiçbir sayfada kart bilgisi girmeyin.",
        "Küçük ücrete güvenmeyin — psikolojik hilenin tamamı budur.",
      ],
      do: [
        "Kuryenin resmi web sitesine kendiniz gidin ve takip numaranızı oraya yapıştırın. Ya da sipariş verirken yüklediğiniz uygulamayı kullanın.",
        "SMS gönderenini engelleyin ve bildirin.",
        "Kartınızı girdiyseniz, banka uygulamanızdan dondurun ve yeni bir kart isteyin.",
      ],
    },
    shareMessage:
      "Uyarı — dolaşan bir kargo ücreti oltalama SMS'i var. 1-3 EUR'luk ücret tuzaktır. Herhangi bir bağlantıya tıklamadan önce lütfen şunu oku:",
  },

  "crypto-recovery-scam": {
    category: "Geri kazanım dolandırıcılığı",
    title: "Kripto geri kazanım dolandırıcılığı — “paranı geri alabiliriz” dolandırıcılığın kendisi olduğunda",
    description:
      "Bir dolandırıcılıkta para kaybettiniz ve şimdi biri parayı geri kazanmayı mı teklif ediyor? Geri kazanım dolandırıcılıkları mağdurları ikinci kez hedef alır. Tanıma ve kaçınma yolları.",
    ogTitle: "Kripto geri kazanım dolandırıcılığı — ilkinden sonraki ikinci dolandırıcılık",
    ogDescription:
      "Bir ücret karşılığında çalınan kriptoyu geri kazanacağını vaat eden herkes neredeyse her zaman ikinci dolandırıcılığı yürütür.",
    h1: "Kripto geri kazanım dolandırıcılığı — ilkinden sonraki ikinci dolandırıcılık.",
    subhead:
      "Bir kripto veya yatırım dolandırıcılığında zaten para kaybettiyseniz, “geri kazanım uzmanları” tarafından ulaşılmayı bekleyin. Avukat, hacker veya devlet memuru değiller. Aynı senaryonun ikinci perdesiler.",
    example: {
      sender: "Crypto Recovery Bureau",
      timestamp: "Bugün · 16:02",
      bubbles: [
        "Fonlarınızı alan cüzdanları belirledik.",
        "Tutarın %92'sini 7 iş günü içinde geri kazanabiliriz.",
        "Blockchain analizi için küçük bir peşin ücret var: USDT cinsinden 480$.",
      ],
    },
    plain: [
      "Geri kazanım dolandırıcılıkları zaten dolandırılmış kişileri hedef alır. Dolandırıcılar mağdur listelerini satın alır veya takas eder, sonra size bir “uzman”, “avukat” veya “blockchain araştırmacısı” olarak yaklaşır. Peşin bir ücret ister ve onunla ortadan kaybolurlar — bazen sizden başka bir tur bilgi çıkardıktan sonra.",
      "Gerçek geri kazanım gerçekleştiğinde yavaş, yasal ve bankanız, ülkenizin dolandırıcılık birimi ya da lisanslı avukatlar üzerinden olur — asla WhatsApp mesajları veya peşin kripto ücretleri üzerinden değil.",
    ],
    redFlags: [
      "Halka açık olarak bildirmediğiniz bir kayıptan sonra beklenmedik şekilde size ulaştılar.",
      "Belirli bir geri kazanım yüzdesi vaat ediyorlar (%90+, garantili vb).",
      "Peşin ücret istiyorlar — özellikle kripto veya havale ile.",
      "Borsalara, cüzdanlara veya “blockchain analistlerine” içeriden erişim olduğunu iddia ediyorlar.",
      "Cüzdanınıza, tohum kelimenize veya borsa girişinize erişim istiyorlar.",
      "“Cüzdan hâlâ aktifken” hızlı hareket etmeniz için baskı yapıyorlar.",
    ],
    whatToDo: {
      dont: [
        "Hiçbir peşin ücret ödemeyin, özellikle kripto ile.",
        "Cüzdan tohum kelimenizi, özel anahtarınızı veya borsa parolanızı asla paylaşmayın.",
        "“Geri kazanıma yardım için” uzaktan erişim araçları yüklemeyin.",
        "Onlarla özel görüşmeye devam etmeyin — dolandırıcılar yalnız bırakma üzerinden çalışır.",
      ],
      do: [
        "Orijinal dolandırıcılığı ülkenizin dolandırıcılık ihbar hizmetine ve ilgili borsa veya platforma bildirin.",
        "Kart veya banka kullandıysanız, bankanızın dolandırıcılık ekibi başlangıç noktanızdır.",
        "Olanları güvendiğiniz bir kişiye anlatın. Geri kazanım dolandırıcılıkları sizi utancınızla yalnız yakalamak üzerinden çalışır.",
      ],
    },
    shareMessage:
      "Bir kripto veya yatırım dolandırıcılığında para kaybettiyseniz, geri kazanım teklif eden herkese karşı lütfen dikkatli olun. Geri kazanım dolandırıcılıkları mağdurları ikinci kez hedef alır. Önce şunu oku:",
  },
};
