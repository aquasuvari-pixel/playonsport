# PlayOnSport güvenlik güncellemesi — 21 Ekim 2026

Bu paket kod düzeltmesidir. Canlı GitHub deposuna veya Vercel/Supabase hesaplarına yüklenmedi. Aşağıdaki kurulum tamamlanmadan üyelik ve etkinlik işlemleri çalışmaz; sistem demo girişe geri dönmez.

## 1. Supabase

1. Supabase projenizde SQL Editor açın. `supabase/setup.sql` dosyasının tamamını çalıştırın. Bu dosya yalnızca `pos_` ile başlayan yeni tablo ve işlevleri ekler; mevcut tabloları silmez. Önce ayrı bir test projesinde deneyin.
2. Authentication ayarlarında e-posta/parola ile kayıt ve e-posta doğrulamayı açın. Minimum parola uzunluğunu 12 yapın. Site URL ve izin verilen doğrulama dönüş adresini sitenin tek ana adresine ayarlayın (örnek: `https://www.playonsport.co.uk`). Gerçek kullanıma geçerken doğrulama e-postaları için kendi SMTP hizmetinizi kurun.
3. Authentication > Users bölümünden kendi yönetici hesabınızı oluşturun veya hesabınıza kayıt olup e-postanızı doğrulayın. O kullanıcının **User UID** değerini kopyalayın. Yönetici yetkisi e-posta adına veya kullanıcı metadata içindeki role alanına göre verilmez.
4. Project URL, anon (public) API key ve service_role API key değerlerini Vercel'e eklemek üzere kendi panelinizden alın. **service_role anahtarını HTML/JS içine, GitHub'a veya sohbet mesajına yapıştırmayın.**

## 2. Vercel

Project > Settings > Environment Variables içinde şu alanları oluşturun:

| Alan | Değer |
|---|---|
| SUPABASE_URL | Supabase proje URL'si |
| SUPABASE_ANON_KEY | Supabase anon/public anahtarı |
| SUPABASE_SERVICE_ROLE_KEY | Supabase service_role anahtarı; yalnızca sunucuda |
| ADMIN_USER_ID | Yukarıdaki yönetici User UID |
| APP_ORIGIN | Sitenin tam ana adresi; sonda `/` yok, örn. `https://www.playonsport.co.uk` |
| CRON_SECRET | İsteğe bağlı zamanlayıcı için en az 32 rastgele karakter |

Tek bir ana alan adı seçin. `www` kullanıyorsanız diğer adresi Vercel'den ona yönlendirin. API, başka origin üzerinden yapılan işlemleri reddeder. Preview denemeleri için ayrı Supabase test projesi ve preview origin kullanın.

GitHub deposunda paketin **içeriğini** köke koyun (`api`, `server`, `scripts`, `supabase`, `vendor`, `tests` klasörleri ve dosyalar). Klasörü bir kat içeriye yüklemeyin. Vercel Framework Preset: **Other**. Node.js: **24.x**. Build Command: `npm run build`; Output Directory: `public`. `vercel.json` da bunları tanımlar.

Ayarları kaydedip yeniden deploy edin. Başlangıçta etkinlik ve salon listelerinin boş olması normaldir. Sahte demo verileri aktarılmaz. Eski tarayıcıdaki prototip hesapları ilk açılışta temizlenir; gerçek kullanıcılar yeniden kayıt olmalıdır. Önceki prototipte kullanılan şifre başka bir hesapta da kullanılıyorsa o hesapta değiştirin.

## 3. İlk kullanım

1. Kendi yönetici hesabınızla giriş yapın.
2. Salon yöneticisi olacak kişi normal kayıt olsun, e-postasını doğrulasın ve bir kez giriş yapsın.
3. Yönetici panelinde salonun adını, adresini ve o kişinin kayıtlı e-postasını girin. Yönetici başkası için şifre belirlemez.
4. Salon yöneticisi tekrar giriş yapsın; salon saati eklesin. Saatler **Europe/London** saat dilimindedir.
5. Admin salon saatini onaylar. Kullanıcı o saat için etkinlik talep eder. Admin etkinliği onaylar; katılımcılar katılır.

## 4. 48 saat kontrolü ve bildirimler

48 saat kuralı istemcinin saatine güvenmeden sunucuda uygulanır. Her veri isteğinde geciken etkinlikler değerlendirilir. Hiç ziyaretçi yokken de otomatik kontrol isteniyorsa harici bir zamanlayıcıdan `/api/app` adresine GET gönderilmeli; `Authorization: Bearer CRON_SECRET_DEGERI` başlığı kullanılmalıdır. Bir dakikalık aralık önerilir; gerçek yürütme zamanı zamanlayıcı gecikmesine bağlıdır. Bu paket herhangi bir ücretli zamanlayıcı aboneliği oluşturmaz. Zamanlayıcı kurulmazsa kontrol bir sonraki site isteğinde çalışır.

Bildirimler uygulama içindedir. Katılımcılara etkinlik e-postası, SMS veya WhatsApp gönderme entegrasyonu eklenmedi. Supabase doğrulama e-postası bu bildirimlerden ayrıdır.

## 5. Yapılan değişiklikler

- Açık demo şifreleri, demo butonları, demo hesap ve etkinlik üretimi kaldırıldı.
- Şifreler uygulama veritabanında veya LocalStorage'da saklanmıyor; Supabase Auth doğruluyor.
- Oturum sunucunun ayarladığı HttpOnly, Secure, SameSite=Strict cookie ile tutuluyor. Oturum en fazla bir saat sonra tekrar giriş gerektirir; otomatik yenileme yoktur.
- Kullanıcı rolü, salon sahipliği, durum geçişleri, ücret, kapasite ve 48 saat koşulları sunucuda kontrol ediliyor.
- Kesinleşen etkinlikte kişi başı ücret gerçek katılımcı sayısına göre hesaplanır; oluşturma önizlemesi hedef kapasiteyi kullanır.
- Bir salon saatinin iki etkinliğe verilmesi ve eşzamanlı katılımda kapasite aşımı atomik sürüm kontrolü ve tekrar denemeyle önleniyor.
- Supabase tablolarında RLS açık; anon ve authenticated rolleri tabloya veya özel RPC işlevlerine doğrudan erişemiyor. Sunucu service_role ile erişiyor, kullanıcıya dönen veriyi kendisi filtreliyor.
- E-posta, telefon, özel kadro ve yönetici verileri genel API cevabından çıkarılıyor. İlgili etkinlikteki kişiler kadro adlarını görebilir; başkalarının e-posta/telefonları paylaşılmaz.
- Giriş/kayıt ve uygulama isteklerine veritabanında kalıcı hız sınırı eklendi. CSRF için tam origin ve JSON zorunluluğu var.
- Inline JavaScript ve event handler'lar kaldırıldı; CSP ile dış betikler engelleniyor. Tailwind 4.1.18 sabit sürümle derleme sırasında statik CSS üretir; çalışma anında CDN veya Tailwind JavaScript çalıştırılmaz.
- Derleme yalnızca gerekli statik dosyaları yayınlıyor; sunucu, SQL, test ve kurulum kaynakları statik çıktıya alınmıyor.

## 6. Doğrulama ve sınırlar

Önce `npm ci` ile geliştirme bağımlılıklarını kurun. `npm test` sunucu kuralları ve API için testleri çalıştırır. `npm run build` yayın çıktısını üretir. Testler gerçek üretim kullanıcılarıyla çalıştırılmadı; canlı Supabase/Vercel bağlantısı kurulmadı. Supabase SQL şeması ayrıca yerel PostgreSQL uyumlu PGlite ortamında çalıştırıldı; anon/authenticated erişim yasakları, atomik yazma ve hız sınırı doğrulandı. Arayüzün üç dilde gezinmesi, üç rol paneli, beş admin sekmesi, tıklama olayları, HTML kaçışları ve Londra yaz/kış saati dönüşümü ayrıca JSDOM ile kontrol edildi. Gerçek tarayıcı ekran görüntüsüyle görsel kontrol bu ortamda yapılamadı.

Veriler bu küçük proje için tek özel JSON kaydında tutulur. Bu yöntem mevcut tek HTML prototipini sınırlı değişiklikle ortak sunucu verisine taşır; yüksek trafik ve büyük veri için ayrı ilişkisel tablolar ve sayfalama gerekir. Sık okuma istekleri de sürüm kontrollü yazma yaptığından yüksek eşzamanlı trafikte yeniden deneme mesajı görülebilir. Şifre sıfırlama arayüzü ve otomatik oturum yenileme bu paketin kapsamına eklenmedi.

Bu çalışma tespit edilen açıkları düzeltir; bağımsız sızma testi veya tüm olası açıkların kapandığı garantisi değildir. Kurulumdan sonra normal kullanıcı, salon yöneticisi ve admin hesaplarıyla ayrı ayrı canlı kabul kontrolü yapın.

Teknik başvuru: https://supabase.com/docs/guides/auth — https://supabase.com/docs/guides/database/postgres/row-level-security — https://vercel.com/docs/functions/runtimes/node-js


## Şifre yenileme güncellemesi
Giriş ekranındaki “Şifremi unuttum / Forgot password” bölümüne e-posta girilir. Supabase varsayılan kurtarma e-postası (ConfirmationURL) kök siteye type=recovery fragmentiyle döner. session-cleanup.js bu bağlantıyı reset-password.html ekranına taşır. Yeni şifre ve doğrulanan kullanıcı tokeni API üzerinden Supabase Auth'a iletilir. Anahtarlar tarayıcıya verilmez; token ve şifre tarayıcı depolamasına yazılmaz. Şifre 12–128 karakter olmalıdır. Başarıdan sonra yeniden giriş gerekir. E-posta teslimi için Supabase SMTP ayarları çalışmalıdır.

Supabase panelindeki Send password recovery seçeneği de varsayılan e-posta şablonu ve doğru Site URL ile aynı ekranı açar. Bu dosyaları yükleyip Vercel yayını tamamlanmadan bağlantıyı kullanmayın.
