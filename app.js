(() => {
'use strict';


  const LANG_KEY = 'playonsport_v2_lang';
  const CURRENCY = '£';

  const translations = {
    en: {
      navHome:'Home', navEvents:'Events', navCreate:'Create', navDashboard:'Dashboard', login:'Login', logout:'Logout',
      freePlatform:'Free community sports platform', heroTitle1:'Meet players.', heroTitle2:'Join games.', heroTitle3:'Build community.',
      heroDesc:'Find approved local sports venues, create an event and bring the right people together. PlayOnSport does not collect payments.',
      createEvent:'Create Event', createEventSub:'Choose an approved venue slot', findEvents:'Find Events', findEventsSub:'Discover approved local games', signUp:'Sign Up / Login', signUpSub:'Create your sports profile',
      noPayments:'No in-app payments', noPaymentsDesc:'The platform only calculates and communicates venue and per-person amounts. Payments are handled outside PlayOnSport.',
      howWorks:'How it works', approvedFlow:'Approved event flow', flow1Title:'Venue manager adds free time', flow1Desc:'Admin checks and approves the slot.', flow2Title:'Registered user creates an event', flow2Desc:'The selected slot is held until admin approval.', flow3Title:'First instruction is published', flow3Desc:'The event becomes visible and participants join.', flow4Title:'Roster completes and final instruction is sent', flow4Desc:'Participants, admin and venue manager receive final details.',
      rule48:'48-hour rule:', rule48Desc:' All approvals and final arrangements must be completed at least 48 hours before venue use.',
      venueNetwork:'Approved venue network', venueNetworkDesc:'Only admin-approved venues and time slots appear to users.', twoApproval:'Two-stage approval', twoApprovalDesc:'Venue availability and user-created events are checked separately.', instructions:'Instructions', instructionsDesc:'The system produces an initial and a final instruction for every confirmed event.',
      communityGames:'Community games', availableEvents:'Available events', eventsDesc:'Only admin-approved events are listed here.', requestEvent:'Event request', createFromSlot:'Create from an approved venue slot', createFromSlotDesc:'Select one of the admin-approved venue buttons below. User-created events are published only after admin approval.', approvedSlots:'Approved venue slots', eventTitle:'Event title', sport:'Sport', level:'Level', groupType:'Group type', minimumPlayers:'Minimum players', maximumPlayers:'Maximum players', description:'Description', sendForApproval:'Send for admin approval', cancel:'Cancel',
      accountAccess:'Account access', email:'Email', password:'Password', venueManager:'Venue Manager', registeredUser:'Registered User', newMember:'New member', createAccount:'Create account', fullName:'Full name', phone:'Phone', mainSport:'Main sport',
      myArea:'My area', myEvents:'My events', create:'Create', notifications:'Notifications', adminPanel:'Admin panel', adminPanelDesc:'Approve venues, slots and events; generate instructions.', overview:'Overview', slotApprovals:'Slot approvals', eventApprovals:'Event approvals', venueAccounts:'Venues & accounts',
      venuePortal:'Venue portal', venueManagerPanel:'Venue manager panel', venuePanelDesc:'Add free hours and receive final event instructions.', addFreeTime:'Add free time', addFreeTimeDesc:'The slot will appear to users only after admin approval.', date:'Date', start:'Start', end:'End', venueFee:'Venue fee', note:'Note', submitSlot:'Submit slot for approval', mySlots:'My venue slots', finalInstructions:'Final instructions',
      footerLine:'Active life, active community. Built for local sports communities in the UK.',
      noEvents:'No approved events yet.', noSlots:'No approved venue slots are available.', loginRequired:'Please login first.', userOnly:'This action requires a registered user account.', selected:'Selected', venue:'Venue', time:'Time', remaining:'remaining', join:'Join event', joined:'Joined', full:'Full', details:'Details', participants:'Participants', perPerson:'Per person', totalVenueFee:'Venue fee', status:'Status', createdBy:'Created by', firstInstruction:'First instruction', secondInstruction:'Final instruction', pendingAdmin:'Waiting for admin approval', published:'Published', finalized:'Finalized', cancelled:'Cancelled', rejected:'Rejected', approved:'Approved', held:'Held', reserved:'Reserved', pending:'Pending',
      eventRequestSent:'Event request sent to admin.', slotRequestSent:'Venue slot sent to admin.', loginSuccess:'Login successful.', registerSuccess:'Account created.', logoutSuccess:'Logged out.', invalidLogin:'Email or password is incorrect.', emailExists:'This email is already registered.', mustSelectSlot:'Select a venue slot.', invalidPlayerRange:'Maximum players must be greater than or equal to minimum players.', outside48:'The selected time must be at least 48 hours from now.', joinedEvent:'You joined the event.', alreadyJoined:'You are already in this event.', eventFull:'This event is full.', approvedEvent:'Event approved and published.', rejectedEvent:'Event rejected.', slotApproved:'Venue slot approved.', slotRejected:'Venue slot rejected.', finalGenerated:'Final instruction generated.', eventCancelled:'Event cancelled.',
      addVenue:'Add venue and manager account', venueName:'Venue name', address:'Address', managerName:'Manager name', managerEmail:'Manager email', managerPassword:'Manager password', addVenueBtn:'Create venue account', venueCreated:'Venue and manager account created.', pendingSlots:'Pending slots', pendingEvents:'Pending events', activeEvents:'Active events', confirmedEvents:'Confirmed events', users:'Users', venues:'Venues', approve:'Approve', reject:'Reject', finalize:'Finalize', delete:'Delete', none:'None', adminCreated:'Admin-created', minReached:'Minimum roster reached', rosterIncomplete:'Roster is not sufficient yet.', confirmCancel:'Cancel this event?', instruction1Help:'Created when admin approves the event.', instruction2Help:'Created when the roster is complete or admin finalizes after minimum attendance.',
      paymentNotice:'No payment is collected in the app. The organizer handles the stated amount outside PlayOnSport.', organizer:'Organizer', venueContact:'Venue contact', entryTime:'Venue entry time', eventTime:'Event time', roster:'Roster', amountToVenue:'Net amount to venue', collectionTarget:'Total amount to collect', '48hoursLeft':'Less than 48 hours remain', safeWindow:'More than 48 hours remain',
      welcomeBack:'Welcome', eventNotFound:'Event not found.', slotUnavailable:'This slot is no longer available.'
    },
    tr: {
      navHome:'Ana Sayfa', navEvents:'Etkinlikler', navCreate:'Oluştur', navDashboard:'Panel', login:'Giriş Yap', logout:'Çıkış',
      freePlatform:'Ücretsiz spor topluluğu platformu', heroTitle1:'Sporcularla tanış.', heroTitle2:'Maçlara katıl.', heroTitle3:'Topluluk oluştur.',
      heroDesc:'Onaylı yerel spor salonlarını bul, etkinlik oluştur ve doğru insanları bir araya getir. PlayOnSport ödeme tahsil etmez.',
      createEvent:'Etkinlik Oluştur', createEventSub:'Onaylı salon saatini seç', findEvents:'Etkinlik Bul', findEventsSub:'Onaylanmış yerel maçları keşfet', signUp:'Kayıt Ol / Giriş Yap', signUpSub:'Sporcu profilini oluştur',
      noPayments:'Uygulama içi ödeme yok', noPaymentsDesc:'Platform yalnızca salon ve kişi başı tutarları hesaplar ve bildirir. Ödemeler PlayOnSport dışında yapılır.',
      howWorks:'Nasıl çalışır', approvedFlow:'Onaylı etkinlik akışı', flow1Title:'Salon yöneticisi boş saat ekler', flow1Desc:'Admin saati kontrol eder ve onaylar.', flow2Title:'Kayıtlı kullanıcı etkinlik oluşturur', flow2Desc:'Seçilen saat admin onayına kadar geçici olarak tutulur.', flow3Title:'Birinci talimat yayınlanır', flow3Desc:'Etkinlik görünür olur ve katılımcılar kaydolur.', flow4Title:'Kadro tamamlanır ve final talimatı gönderilir', flow4Desc:'Katılımcılar, admin ve salon yöneticisi son bilgileri alır.',
      rule48:'48 saat kuralı:', rule48Desc:' Tüm onaylar ve kesin düzenlemeler salon kullanımından en az 48 saat önce tamamlanmalıdır.',
      venueNetwork:'Onaylı salon ağı', venueNetworkDesc:'Kullanıcılara yalnızca admin tarafından onaylanan salonlar ve saatler gösterilir.', twoApproval:'İki aşamalı onay', twoApprovalDesc:'Salon uygunluğu ve kullanıcı etkinlikleri ayrı ayrı kontrol edilir.', instructions:'Talimatlar', instructionsDesc:'Sistem her kesinleşen etkinlik için birinci ve ikinci talimatı üretir.',
      communityGames:'Topluluk maçları', availableEvents:'Aktif etkinlikler', eventsDesc:'Burada yalnızca admin tarafından onaylanan etkinlikler listelenir.', requestEvent:'Etkinlik talebi', createFromSlot:'Onaylı salon saatinden etkinlik oluştur', createFromSlotDesc:'Aşağıdaki admin onaylı salon butonlarından birini seç. Kullanıcı etkinliği ancak admin onayından sonra yayınlanır.', approvedSlots:'Onaylı salon saatleri', eventTitle:'Etkinlik başlığı', sport:'Spor dalı', level:'Seviye', groupType:'Grup türü', minimumPlayers:'Minimum katılımcı', maximumPlayers:'Maksimum katılımcı', description:'Açıklama', sendForApproval:'Admin onayına gönder', cancel:'Vazgeç',
      accountAccess:'Hesap erişimi', email:'E-posta', password:'Şifre', venueManager:'Salon Yöneticisi', registeredUser:'Kayıtlı Kullanıcı', newMember:'Yeni üye', createAccount:'Hesap oluştur', fullName:'Ad soyad', phone:'Telefon', mainSport:'Ana spor dalı',
      myArea:'Hesabım', myEvents:'Etkinliklerim', create:'Oluştur', notifications:'Bildirimler', adminPanel:'Admin paneli', adminPanelDesc:'Salonları, saatleri ve etkinlikleri onayla; talimatları oluştur.', overview:'Özet', slotApprovals:'Saat onayları', eventApprovals:'Etkinlik onayları', venueAccounts:'Salonlar ve hesaplar',
      venuePortal:'Salon portalı', venueManagerPanel:'Salon yönetici paneli', venuePanelDesc:'Boş saatleri ekle ve kesinleşen etkinlik talimatlarını al.', addFreeTime:'Boş saat ekle', addFreeTimeDesc:'Saat yalnızca admin onayından sonra kullanıcılara görünür.', date:'Tarih', start:'Başlangıç', end:'Bitiş', venueFee:'Salon ücreti', note:'Not', submitSlot:'Saati admin onayına gönder', mySlots:'Salon saatlerim', finalInstructions:'Kesin talimatlar',
      footerLine:'Aktif yaşam, aktif topluluk. Birleşik Krallık yerel spor toplulukları için hazırlandı.',
      noEvents:'Henüz onaylanmış etkinlik yok.', noSlots:'Kullanılabilir onaylı salon saati yok.', loginRequired:'Önce giriş yapmalısınız.', userOnly:'Bu işlem için kayıtlı kullanıcı hesabı gerekir.', selected:'Seçildi', venue:'Salon', time:'Saat', remaining:'kalan', join:'Etkinliğe katıl', joined:'Katıldın', full:'Dolu', details:'Detaylar', participants:'Katılımcılar', perPerson:'Kişi başı', totalVenueFee:'Salon ücreti', status:'Durum', createdBy:'Oluşturan', firstInstruction:'Birinci talimat', secondInstruction:'Kesin talimat', pendingAdmin:'Admin onayı bekleniyor', published:'Yayında', finalized:'Kesinleşti', cancelled:'İptal edildi', rejected:'Reddedildi', approved:'Onaylandı', held:'Geçici ayrıldı', reserved:'Rezerve', pending:'Bekliyor',
      eventRequestSent:'Etkinlik talebi admine gönderildi.', slotRequestSent:'Salon saati admine gönderildi.', loginSuccess:'Giriş başarılı.', registerSuccess:'Hesap oluşturuldu.', logoutSuccess:'Çıkış yapıldı.', invalidLogin:'E-posta veya şifre hatalı.', emailExists:'Bu e-posta zaten kayıtlı.', mustSelectSlot:'Bir salon saati seçmelisiniz.', invalidPlayerRange:'Maksimum katılımcı minimumdan küçük olamaz.', outside48:'Seçilen saat şu andan en az 48 saat sonra olmalıdır.', joinedEvent:'Etkinliğe katıldınız.', alreadyJoined:'Bu etkinliğe zaten katıldınız.', eventFull:'Bu etkinliğin kadrosu dolu.', approvedEvent:'Etkinlik onaylandı ve yayınlandı.', rejectedEvent:'Etkinlik reddedildi.', slotApproved:'Salon saati onaylandı.', slotRejected:'Salon saati reddedildi.', finalGenerated:'Kesin talimat oluşturuldu.', eventCancelled:'Etkinlik iptal edildi.',
      addVenue:'Salon ve yönetici hesabı ekle', venueName:'Salon adı', address:'Adres', managerName:'Yönetici adı', managerEmail:'Yönetici e-postası', managerPassword:'Yönetici şifresi', addVenueBtn:'Salon hesabı oluştur', venueCreated:'Salon ve yönetici hesabı oluşturuldu.', pendingSlots:'Bekleyen saatler', pendingEvents:'Bekleyen etkinlikler', activeEvents:'Aktif etkinlikler', confirmedEvents:'Kesinleşen etkinlikler', users:'Kullanıcılar', venues:'Salonlar', approve:'Onayla', reject:'Reddet', finalize:'Kesinleştir', delete:'Sil', none:'Yok', adminCreated:'Admin oluşturdu', minReached:'Minimum kadro oluştu', rosterIncomplete:'Kadro henüz yeterli değil.', confirmCancel:'Bu etkinlik iptal edilsin mi?', instruction1Help:'Admin etkinliği onayladığında oluşturulur.', instruction2Help:'Kadro dolduğunda veya minimum katılımdan sonra admin kesinleştirdiğinde oluşturulur.',
      paymentNotice:'Uygulama üzerinden ödeme alınmaz. Belirtilen tutarı organizatör PlayOnSport dışında yönetir.', organizer:'Organizatör', venueContact:'Salon yetkilisi', entryTime:'Salona giriş saati', eventTime:'Etkinlik saati', roster:'Kadro', amountToVenue:'Salona net ödenecek', collectionTarget:'Toplanacak toplam tutar', '48hoursLeft':'48 saatten az kaldı', safeWindow:'48 saatten fazla var',
      welcomeBack:'Hoş geldin', eventNotFound:'Etkinlik bulunamadı.', slotUnavailable:'Bu salon saati artık kullanılamıyor.'
    },
    hi: {
      navHome:'होम', navEvents:'इवेंट्स', navCreate:'बनाएँ', navDashboard:'डैशबोर्ड', login:'लॉग इन', logout:'लॉग आउट',
      freePlatform:'मुफ़्त सामुदायिक खेल मंच', heroTitle1:'खिलाड़ियों से मिलें।', heroTitle2:'खेलों में शामिल हों।', heroTitle3:'समुदाय बनाएँ।',
      heroDesc:'स्वीकृत स्थानीय खेल स्थलों को खोजें, इवेंट बनाएँ और सही लोगों को साथ लाएँ। PlayOnSport भुगतान एकत्र नहीं करता।',
      createEvent:'इवेंट बनाएँ', createEventSub:'स्वीकृत स्थल समय चुनें', findEvents:'इवेंट खोजें', findEventsSub:'स्वीकृत स्थानीय खेल खोजें', signUp:'साइन अप / लॉग इन', signUpSub:'अपनी खेल प्रोफ़ाइल बनाएँ',
      noPayments:'ऐप में भुगतान नहीं', noPaymentsDesc:'प्लेटफ़ॉर्म केवल स्थल और प्रति व्यक्ति राशि की गणना और सूचना देता है। भुगतान PlayOnSport के बाहर होता है।',
      howWorks:'यह कैसे काम करता है', approvedFlow:'स्वीकृत इवेंट प्रक्रिया', flow1Title:'स्थल प्रबंधक खाली समय जोड़ता है', flow1Desc:'एडमिन समय की जाँच और स्वीकृति देता है।', flow2Title:'पंजीकृत उपयोगकर्ता इवेंट बनाता है', flow2Desc:'एडमिन स्वीकृति तक चुना गया समय रोका जाता है।', flow3Title:'पहला निर्देश प्रकाशित होता है', flow3Desc:'इवेंट दिखाई देता है और खिलाड़ी जुड़ते हैं।', flow4Title:'टीम पूरी होती है और अंतिम निर्देश भेजा जाता है', flow4Desc:'खिलाड़ी, एडमिन और स्थल प्रबंधक को अंतिम जानकारी मिलती है।',
      rule48:'48 घंटे का नियम:', rule48Desc:' सभी स्वीकृतियाँ और अंतिम व्यवस्था स्थल उपयोग से कम से कम 48 घंटे पहले पूरी होनी चाहिए।',
      venueNetwork:'स्वीकृत स्थल नेटवर्क', venueNetworkDesc:'उपयोगकर्ताओं को केवल एडमिन द्वारा स्वीकृत स्थल और समय दिखाई देते हैं।', twoApproval:'दो चरण की स्वीकृति', twoApprovalDesc:'स्थल उपलब्धता और उपयोगकर्ता इवेंट अलग-अलग जाँचे जाते हैं।', instructions:'निर्देश', instructionsDesc:'हर पक्के इवेंट के लिए पहला और अंतिम निर्देश तैयार होता है।',
      communityGames:'सामुदायिक खेल', availableEvents:'उपलब्ध इवेंट', eventsDesc:'यहाँ केवल एडमिन-स्वीकृत इवेंट दिखते हैं।', requestEvent:'इवेंट अनुरोध', createFromSlot:'स्वीकृत स्थल समय से इवेंट बनाएँ', createFromSlotDesc:'नीचे एडमिन-स्वीकृत स्थल समय चुनें। उपयोगकर्ता का इवेंट एडमिन स्वीकृति के बाद ही प्रकाशित होगा।', approvedSlots:'स्वीकृत स्थल समय', eventTitle:'इवेंट शीर्षक', sport:'खेल', level:'स्तर', groupType:'समूह प्रकार', minimumPlayers:'न्यूनतम खिलाड़ी', maximumPlayers:'अधिकतम खिलाड़ी', description:'विवरण', sendForApproval:'एडमिन स्वीकृति के लिए भेजें', cancel:'रद्द करें',
      accountAccess:'खाता प्रवेश', email:'ईमेल', password:'पासवर्ड', venueManager:'स्थल प्रबंधक', registeredUser:'पंजीकृत उपयोगकर्ता', newMember:'नया सदस्य', createAccount:'खाता बनाएँ', fullName:'पूरा नाम', phone:'फ़ोन', mainSport:'मुख्य खेल',
      myArea:'मेरा क्षेत्र', myEvents:'मेरे इवेंट', create:'बनाएँ', notifications:'सूचनाएँ', adminPanel:'एडमिन पैनल', adminPanelDesc:'स्थल, समय और इवेंट स्वीकृत करें; निर्देश बनाएँ।', overview:'सारांश', slotApprovals:'समय स्वीकृति', eventApprovals:'इवेंट स्वीकृति', venueAccounts:'स्थल और खाते',
      venuePortal:'स्थल पोर्टल', venueManagerPanel:'स्थल प्रबंधक पैनल', venuePanelDesc:'खाली समय जोड़ें और अंतिम इवेंट निर्देश पाएँ।', addFreeTime:'खाली समय जोड़ें', addFreeTimeDesc:'एडमिन स्वीकृति के बाद ही समय उपयोगकर्ताओं को दिखेगा।', date:'तारीख', start:'शुरू', end:'समाप्त', venueFee:'स्थल शुल्क', note:'नोट', submitSlot:'स्वीकृति के लिए समय भेजें', mySlots:'मेरे स्थल समय', finalInstructions:'अंतिम निर्देश',
      footerLine:'सक्रिय जीवन, सक्रिय समुदाय। यूके के स्थानीय खेल समुदायों के लिए बनाया गया।',
      noEvents:'अभी कोई स्वीकृत इवेंट नहीं है।', noSlots:'कोई स्वीकृत स्थल समय उपलब्ध नहीं है।', loginRequired:'पहले लॉग इन करें।', userOnly:'इस कार्य के लिए पंजीकृत उपयोगकर्ता खाता चाहिए।', selected:'चुना गया', venue:'स्थल', time:'समय', remaining:'शेष', join:'इवेंट में जुड़ें', joined:'जुड़ गए', full:'पूरा', details:'विवरण', participants:'खिलाड़ी', perPerson:'प्रति व्यक्ति', totalVenueFee:'स्थल शुल्क', status:'स्थिति', createdBy:'निर्माता', firstInstruction:'पहला निर्देश', secondInstruction:'अंतिम निर्देश', pendingAdmin:'एडमिन स्वीकृति लंबित', published:'प्रकाशित', finalized:'पक्का', cancelled:'रद्द', rejected:'अस्वीकृत', approved:'स्वीकृत', held:'रोक रखा', reserved:'आरक्षित', pending:'लंबित',
      eventRequestSent:'इवेंट अनुरोध एडमिन को भेजा गया।', slotRequestSent:'स्थल समय एडमिन को भेजा गया।', loginSuccess:'लॉग इन सफल।', registerSuccess:'खाता बन गया।', logoutSuccess:'लॉग आउट हुआ।', invalidLogin:'ईमेल या पासवर्ड गलत है।', emailExists:'यह ईमेल पहले से पंजीकृत है।', mustSelectSlot:'स्थल समय चुनें।', invalidPlayerRange:'अधिकतम खिलाड़ी न्यूनतम से कम नहीं हो सकते।', outside48:'चुना गया समय अभी से कम से कम 48 घंटे बाद होना चाहिए।', joinedEvent:'आप इवेंट में शामिल हो गए।', alreadyJoined:'आप पहले से इस इवेंट में हैं।', eventFull:'यह इवेंट पूरा है।', approvedEvent:'इवेंट स्वीकृत और प्रकाशित हुआ।', rejectedEvent:'इवेंट अस्वीकृत हुआ।', slotApproved:'स्थल समय स्वीकृत हुआ।', slotRejected:'स्थल समय अस्वीकृत हुआ।', finalGenerated:'अंतिम निर्देश बना।', eventCancelled:'इवेंट रद्द हुआ।',
      addVenue:'स्थल और प्रबंधक खाता जोड़ें', venueName:'स्थल नाम', address:'पता', managerName:'प्रबंधक नाम', managerEmail:'प्रबंधक ईमेल', managerPassword:'प्रबंधक पासवर्ड', addVenueBtn:'स्थल खाता बनाएँ', venueCreated:'स्थल और प्रबंधक खाता बन गया।', pendingSlots:'लंबित समय', pendingEvents:'लंबित इवेंट', activeEvents:'सक्रिय इवेंट', confirmedEvents:'पक्के इवेंट', users:'उपयोगकर्ता', venues:'स्थल', approve:'स्वीकृत करें', reject:'अस्वीकृत करें', finalize:'पक्का करें', delete:'हटाएँ', none:'कोई नहीं', adminCreated:'एडमिन द्वारा बनाया गया', minReached:'न्यूनतम टीम पूरी', rosterIncomplete:'टीम अभी पर्याप्त नहीं है।', confirmCancel:'क्या यह इवेंट रद्द करें?', instruction1Help:'एडमिन के इवेंट स्वीकृत करने पर बनता है।', instruction2Help:'टीम पूरी होने पर या न्यूनतम उपस्थिति के बाद एडमिन के पक्का करने पर बनता है।',
      paymentNotice:'ऐप में भुगतान नहीं लिया जाता। आयोजक बताई गई राशि PlayOnSport के बाहर संभालता है।', organizer:'आयोजक', venueContact:'स्थल संपर्क', entryTime:'स्थल प्रवेश समय', eventTime:'इवेंट समय', roster:'टीम', amountToVenue:'स्थल को शुद्ध राशि', collectionTarget:'कुल एकत्र राशि', '48hoursLeft':'48 घंटे से कम शेष', safeWindow:'48 घंटे से अधिक शेष',
      welcomeBack:'स्वागत है', eventNotFound:'इवेंट नहीं मिला।', slotUnavailable:'यह स्थल समय अब उपलब्ध नहीं है।'
    }
  };

  let lang = 'en';
  try { const saved=localStorage.getItem(LANG_KEY); if(['en','tr','hi'].includes(saved))lang=saved; } catch {}
  let currentUser = null;
  let adminTab = 'overview';

  function uid(prefix='id') { return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
  function isoAfter(days, hour=19) { const d = new Date(); d.setDate(d.getDate()+days); d.setHours(hour,0,0,0); return d; }
  function toDateInput(d) { return d.toISOString().slice(0,10); }
  function translateText(key) { return translations[lang]?.[key] ?? translations.en[key] ?? key; }
  function escapeHtml(value='') { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c])); }
  function perPerson(event,slot){return (slot?.fee||0)/(event.status==='finalized'?Math.max(1,event.participants.length):event.maxPlayers);}
  function money(value) { return `${CURRENCY}${Number(value || 0).toFixed(2)}`; }

  let cachedState = {users:[],venues:[],slots:[],events:[],notifications:[]};
  function getState() { return cachedState; }
  async function api(action,payload={}) {
    const response=await fetch('/api/app',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,payload})});
    const result=await response.json().catch(()=>({error:'Service unavailable.'}));
    if(!response.ok){
      if(response.status===401){currentUser=null;cachedState={users:[],venues:[],slots:[],events:[],notifications:[]};updateHeader();navigate('login');}
      throw new Error(result.error||'Request failed.');
    }
    if(result.state){cachedState=result.state;currentUser=result.user;updateHeader();}
    return result;
  }
  async function refreshState(){await api('state');renderCurrentPage();}
  async function perform(action,payload,message){await api(action,payload);showToast(message,'success');renderCurrentPage();}
  const value=id=>document.getElementById(id).value.trim();
  function getUser(id) { return getState().users.find(u => u.id === id); }
  function getVenue(id) { return getState().venues.find(v => v.id === id); }
  function getSlot(id) { return getState().slots.find(s => s.id === id); }
  function getEvent(id) { return getState().events.find(e => e.id === id); }
  function hoursUntil(slot) { return (Date.parse(slot.startsAt) - Date.now()) / 36e5; }
  function formatDate(date) { return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : lang === 'hi' ? 'hi-IN' : 'en-GB', { weekday:'short', day:'2-digit', month:'short', year:'numeric' }).format(new Date(`${date}T12:00:00`)); }
  function statusLabel(status) {
    const map = { pending:'pending', pending_admin:'pendingAdmin', approved:'approved', published:'published', finalized:'finalized', cancelled:'cancelled', rejected:'rejected', held:'held', reserved:'reserved', confirmed:'finalized' };
    return translateText(map[status] || status);
  }
  function statusClass(status) { return `status-${status.replace('_admin','').replace('confirmed','finalized')}`; }
  function roleHome(role) { return role === 'admin' ? 'admin' : role === 'venue' ? 'venue' : 'user'; }

  function showToast(message, type='info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-[92vw] rounded-2xl border px-4 py-3 text-sm shadow-2xl ${type==='error'?'border-red-400/40 bg-red-950/95 text-red-100':type==='success'?'border-green-400/40 bg-green-950/95 text-green-100':'border-blue-400/30 bg-slate-950/95 text-white'}`;
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.add('hidden'), 3300);
  }

  function setLanguage(next) {
    if(!['en','tr','hi'].includes(next))return;
    lang = next;
    try { localStorage.setItem(LANG_KEY, lang); } catch {}
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.dataset.i18n; if (translations[lang][key]) el.textContent = translations[lang][key]; });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.className = `lang-btn rounded-lg px-2.5 py-1.5 ${btn.dataset.lang===lang?'bg-blue-600 text-white shadow':'text-slate-400 hover:text-white'}`);
    renderCurrentPage();
    updateHeader();
  }

  function navigate(page) {
    const protectedPages = ['create','user','admin','venue'];
    if (protectedPages.includes(page) && !currentUser) { showToast(translateText('loginRequired')); page = 'login'; }
    if (page === 'admin' && currentUser?.role !== 'admin') page = roleHome(currentUser?.role);
    if (page === 'venue' && currentUser?.role !== 'venue') page = roleHome(currentUser?.role);
    if (page === 'user' && currentUser?.role !== 'user') page = roleHome(currentUser?.role);
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(page+'Page');
    if (target) target.classList.add('active');
    document.querySelectorAll('.nav-btn,.top-nav').forEach(btn => btn.classList.toggle('active', btn.dataset.page === page || (btn.dataset.page === 'dashboard' && ['user','admin','venue'].includes(page))));
    window.scrollTo({top:0,behavior:'smooth'});
    renderPage(page);
  }

  function renderCurrentPage() {
    const active = document.querySelector('.page.active')?.id?.replace('Page','') || 'home';
    renderPage(active);
  }
  function renderPage(page) {
    if (page === 'events') renderEvents();
    if (page === 'create') renderApprovedSlots();
    if (page === 'user') renderUserDashboard();
    if (page === 'admin') renderAdmin();
    if (page === 'venue') renderVenueDashboard();
  }

  function updateHeader() {
    const btn = document.getElementById('accountButton');
    const dash = document.getElementById('desktopDashboardBtn');
    if (currentUser) {
      btn.textContent = currentUser.name.split(' ')[0];
      btn.className = 'max-w-[110px] truncate rounded-xl border border-blue-400/25 bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-200';
      dash?.classList.remove('hidden');
    } else {
      btn.textContent = translateText('login');
      btn.className = 'rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-500';
      dash?.classList.add('hidden');
    }
  }
  function handleAccountButton() { currentUser ? openDashboard() : navigate('login'); }
  function openDashboard() { if (!currentUser) return navigate('login'); navigate(roleHome(currentUser.role)); }
  function requireUserThen(page) {
    if (!currentUser) return navigate('login');
    if (!['user','admin'].includes(currentUser.role)) return showToast(translateText('userOnly'),'error');
    navigate(page);
  }

  async function loginUser(e) {
    e.preventDefault();
    try { await api('login',{email:value('loginEmail'),password:document.getElementById('loginPassword').value});
      e.target.reset();showToast(translateText('loginSuccess'),'success');navigate(roleHome(currentUser.role));
    } finally { document.getElementById('loginPassword').value=''; }
  }
  async function requestPasswordReset(e) {
    e.preventDefault();
    const result=await api('requestPasswordReset',{email:value('recoveryEmail')});
    document.getElementById('recoveryStatus').textContent=result.message;
  }
  async function registerUser(e) {
    e.preventDefault();
    try { const result=await api('register',{email:value('regEmail'),password:document.getElementById('regPassword').value,name:value('regName'),phone:value('regPhone'),level:value('regLevel'),sport:value('regSport')});
      e.target.reset();alert(result.message);
    } finally { document.getElementById('regPassword').value=''; }
  }
  async function logout() {
    await api('logout');currentUser=null;cachedState={users:[],venues:[],slots:[],events:[],notifications:[]};
    updateHeader();navigate('home');await refreshState();
  }

  function renderApprovedSlots() {
    if (!currentUser || !['user','admin'].includes(currentUser.role)) return;
    const state = getState();
    const slots = state.slots.filter(s => s.status === 'approved' && hoursUntil(s) >= 48).sort((a,b)=>`${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));
    const box = document.getElementById('approvedSlots');
    document.getElementById('selectedSlotId').value = '';
    document.getElementById('eventCostPreview').classList.add('hidden');
    if (!slots.length) { box.innerHTML = `<div class="col-span-full rounded-2xl border border-dashed border-slate-600 p-6 text-center text-sm text-slate-400">${translateText('noSlots')}</div>`; return; }
    box.innerHTML = slots.map(s => { const v=getVenue(s.venueId); return `<button type="button" data-click="selectSlot('${s.id}')" id="slotBtn_${s.id}" class="slot-option soft-card rounded-2xl p-4 text-left hover:border-blue-400/50"><div class="flex items-start justify-between gap-3"><div><div class="font-black text-white">${escapeHtml(v?.name || '')}</div><div class="mt-1 text-xs text-slate-400">${escapeHtml(v?.address || '')}</div></div><span class="rounded-lg bg-blue-500/15 px-2 py-1 text-[10px] font-bold text-blue-300">${escapeHtml(s.sport)}</span></div><div class="mt-3 grid grid-cols-2 gap-2 text-xs"><div class="rounded-lg bg-black/20 p-2">📅 ${formatDate(s.date)}</div><div class="rounded-lg bg-black/20 p-2">🕒 ${s.start}–${s.end}</div></div><div class="mt-3 flex items-center justify-between text-xs"><span class="text-slate-400">${translateText('totalVenueFee')}</span><strong class="text-orange-300">${money(s.fee)}</strong></div></button>`; }).join('');
  }
  function selectSlot(id) {
    const slot = getSlot(id); if (!slot || slot.status !== 'approved') return showToast(translateText('slotUnavailable'),'error');
    document.getElementById('selectedSlotId').value = id;
    document.querySelectorAll('.slot-option').forEach(el => el.classList.remove('selected-slot'));
    document.getElementById('slotBtn_'+id)?.classList.add('selected-slot');
    document.getElementById('eventSport').value = slot.sport;
    updateCostPreview();
  }
  function updateCostPreview() {
    const slot = getSlot(document.getElementById('selectedSlotId').value); if (!slot) return;
    const max = Math.max(1, Number(document.getElementById('eventMax').value || 1));
    const preview = document.getElementById('eventCostPreview');
    preview.classList.remove('hidden');
    preview.innerHTML = `<div class="flex flex-wrap items-center justify-between gap-3"><div><div class="font-black text-orange-200">${translateText('paymentNotice')}</div><div class="mt-1 text-xs text-slate-400">${translateText('totalVenueFee')}: ${money(slot.fee)}</div></div><div class="rounded-xl bg-black/25 px-4 py-3 text-right"><div class="text-[10px] uppercase text-slate-400">${translateText('perPerson')}</div><div class="text-xl font-black text-white">${money(slot.fee/max)}</div></div></div>`;
  }
  document.getElementById('eventMax').addEventListener('input', updateCostPreview);

  async function submitEventRequest(e) {
    e.preventDefault();
    await api('createEvent',{slotId:value('selectedSlotId'),title:value('eventTitle'),level:value('eventLevel'),gender:value('eventGender'),minPlayers:Number(value('eventMin')),maxPlayers:Number(value('eventMax')),description:value('eventDescription')});
    e.target.reset();showToast(translateText('eventRequestSent'),'success');navigate(roleHome(currentUser.role));
  }

  function renderEvents() {
    const state = getState();
    const list = document.getElementById('eventsList');
    const events = state.events.filter(e => ['published','finalized'].includes(e.status)).sort((a,b)=>{ const sa=state.slots.find(s=>s.id===a.slotId), sb=state.slots.find(s=>s.id===b.slotId); return `${sa?.date}${sa?.start}`.localeCompare(`${sb?.date}${sb?.start}`); });
    if (!events.length) { list.innerHTML = `<div class="glass col-span-full rounded-2xl p-8 text-center text-slate-400">${translateText('noEvents')}</div>`; return; }
    list.innerHTML = events.map(eventCard).join('');
  }
  function eventCard(e) {
    const slot=getSlot(e.slotId), venue=getVenue(slot?.venueId), creator=getUser(e.creatorId);
    const count=e.participants.length, isJoined=currentUser && e.participants.includes(currentUser.id), isFull=count>=e.maxPlayers;
    const progress=Math.min(100,(count/e.maxPlayers)*100);
    const perPerson=slot ? perPerson(e,slot) : 0;
    const canJoin=currentUser?.role==='user' && e.status==='published' && !isFull && !isJoined;
    return `<article class="glass overflow-hidden rounded-3xl"><div class="relative h-28 bg-gradient-to-br from-blue-700/40 via-slate-950 to-orange-500/20 p-4"><div class="absolute inset-0 opacity-20" style="background-image:radial-gradient(circle at 80% 20%,#38bdf8,transparent 28%)"></div><div class="relative flex items-start justify-between"><span class="rounded-xl border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold">${sportEmoji(e.sport)} ${escapeHtml(e.sport)}</span><span class="chip ${statusClass(e.status)} rounded-xl border px-3 py-1 text-[10px] font-black">${statusLabel(e.status)}</span></div></div><div class="p-5"><h3 class="text-lg font-black">${escapeHtml(e.title)}</h3><p class="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">${escapeHtml(e.description || '')}</p><div class="mt-4 space-y-2 text-xs text-slate-300"><div>📍 <strong>${escapeHtml(venue?.name || '')}</strong></div><div>📅 ${slot?formatDate(slot.date):''} · ${slot?.start || ''}–${slot?.end || ''}</div><div>🎯 ${escapeHtml(e.level)} · ${escapeHtml(e.gender)}</div><div>👤 ${translateText('createdBy')}: ${escapeHtml(creator?.name || 'Admin')}</div></div><div class="mt-4 flex items-end justify-between"><div><div class="text-[10px] uppercase text-slate-500">${translateText('participants')}</div><div class="font-black">${count} / ${e.maxPlayers}</div></div><div class="text-right"><div class="text-[10px] uppercase text-slate-500">${translateText('perPerson')}</div><div class="font-black text-orange-300">${money(perPerson)}</div></div></div><div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style="width:${progress}%"></div></div><div class="mt-4 grid grid-cols-2 gap-2"><button data-click="showEventDetails('${e.id}')" class="rounded-xl border border-blue-400/20 px-3 py-2 text-xs font-bold hover:bg-blue-500/10">${translateText('details')}</button><button ${canJoin?'': 'disabled'} data-click="joinEvent('${e.id}')" class="rounded-xl px-3 py-2 text-xs font-black ${canJoin?'bg-orange-500 hover:bg-orange-400':isJoined?'bg-green-500/15 text-green-300':'bg-slate-800 text-slate-500'}">${isJoined?translateText('joined'):isFull?translateText('full'):translateText('join')}</button></div></div></article>`;
  }
  function sportEmoji(sport) { return ({Volleyball:'🏐',Football:'⚽',Basketball:'🏀',Badminton:'🏸',Tennis:'🎾'})[sport] || '🏅'; }

  async function joinEvent(id) { if(!currentUser)return navigate('login');await perform('joinEvent',{id},translateText('joinedEvent')); }

  function showEventDetails(id) {
    const event=getEvent(id); if(!event)return;
    const slot=getSlot(event.slotId), venue=getVenue(slot?.venueId), creator=getUser(event.creatorId);
    const names=event.participants.map(pid=>getUser(pid)?.name || '');
    const text = `${event.title}\n\n${translateText('venue')}: ${venue?.name}\n${translateText('address')}: ${venue?.address}\n${translateText('date')}: ${slot?formatDate(slot.date):''}\n${translateText('time')}: ${slot?.start}-${slot?.end}\n${translateText('organizer')}: ${creator?.name}\n${translateText('participants')}: ${event.participants.length}/${event.maxPlayers}\n${translateText('totalVenueFee')}: ${money(slot?.fee)}\n${translateText('perPerson')}: ${money(perPerson(event,slot))}\n\n${names.filter(Boolean).join(', ') || translateText('none')}\n\n${translateText('paymentNotice')}`;
    alert(text);
  }

  function renderUserDashboard() {
    if (!currentUser || currentUser.role!=='user') return;
    document.getElementById('userWelcome').textContent = `${translateText('welcomeBack')}, ${currentUser.name.split(' ')[0]}`;
    const state=getState();
    const events=state.events.filter(e=>e.creatorId===currentUser.id || e.participants.includes(currentUser.id)).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
    document.getElementById('myEventsList').innerHTML = events.length ? events.map(e=>miniEventCard(e,true)).join('') : `<div class="rounded-xl border border-dashed border-slate-600 p-5 text-center text-sm text-slate-400">${translateText('none')}</div>`;
    const notes=state.notifications.filter(n=>n.userId===currentUser.id || n.role==='user').slice(0,12);
    document.getElementById('userNotifications').innerHTML = renderNotifications(notes);
  }
  function miniEventCard(e, showInstructions=false) {
    const slot=getSlot(e.slotId), venue=getVenue(slot?.venueId);
    return `<div class="soft-card rounded-2xl p-4"><div class="flex items-start justify-between gap-3"><div><div class="font-black">${escapeHtml(e.title)}</div><div class="mt-1 text-xs text-slate-400">${escapeHtml(venue?.name || '')} · ${slot?formatDate(slot.date):''} ${slot?.start||''}</div></div><span class="chip ${statusClass(e.status)} rounded-lg border px-2 py-1 text-[10px] font-bold">${statusLabel(e.status)}</span></div><div class="mt-3 flex flex-wrap gap-2 text-[10px]"><span class="chip rounded-lg px-2 py-1">${e.participants.length}/${e.maxPlayers}</span>${e.instruction1?`<button data-click="showInstruction('${e.id}',1)" class="rounded-lg bg-blue-500/15 px-2 py-1 text-blue-300">${translateText('firstInstruction')}</button>`:''}${e.instruction2?`<button data-click="showInstruction('${e.id}',2)" class="rounded-lg bg-green-500/15 px-2 py-1 text-green-300">${translateText('secondInstruction')}</button>`:''}</div></div>`;
  }
  function renderNotifications(notes) { return notes.length ? notes.map(n=>`<div class="soft-card rounded-xl p-3"><div class="text-xs font-black">${escapeHtml(n.title)}</div><div class="mt-1 text-xs leading-5 text-slate-400">${escapeHtml(n.text)}</div><div class="mt-1 text-[9px] text-slate-600">${new Date(n.createdAt).toLocaleString()}</div></div>`).join('') : `<div class="text-sm text-slate-500">${translateText('none')}</div>`; }

  function renderAdmin() {
    if(!currentUser || currentUser.role!=='admin')return;
    setAdminTab(adminTab,false);
  }
  function setAdminTab(tab, rerender=true) {
    adminTab=tab;
    document.querySelectorAll('.admin-tab').forEach(btn=>btn.classList.toggle('active',btn.dataset.tab===tab));
    const content=document.getElementById('adminContent'); if(!content)return;
    if(tab==='overview') content.innerHTML=adminOverviewHtml();
    if(tab==='slots') content.innerHTML=adminSlotsHtml();
    if(tab==='events') content.innerHTML=adminEventsHtml();
    if(tab==='venues') content.innerHTML=adminVenuesHtml();
    if(tab==='instructions') content.innerHTML=adminInstructionsHtml();
  }
  function adminOverviewHtml() {
    const s=getState();
    const cards=[
      [translateText('pendingSlots'),s.slots.filter(x=>x.status==='pending').length,'🕒','text-yellow-300'],
      [translateText('pendingEvents'),s.events.filter(x=>x.status==='pending_admin').length,'📨','text-orange-300'],
      [translateText('activeEvents'),s.events.filter(x=>x.status==='published').length,'🏅','text-blue-300'],
      [translateText('confirmedEvents'),s.events.filter(x=>x.status==='finalized').length,'✅','text-green-300'],
      [translateText('users'),s.users.filter(x=>x.role==='user').length,'👥','text-cyan-300'],
      [translateText('venues'),s.venues.length,'🏟️','text-purple-300']
    ];
    const notes=s.notifications.filter(n=>n.role==='admin' || n.userId===currentUser.id).slice(0,10);
    return `<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">${cards.map(c=>`<div class="glass rounded-2xl p-5"><div class="flex items-center justify-between"><div><div class="text-xs font-bold text-slate-500">${c[0]}</div><div class="mt-2 text-3xl font-black ${c[3]}">${c[1]}</div></div><div class="text-3xl">${c[2]}</div></div></div>`).join('')}</div><div class="mt-5 grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><div class="glass rounded-2xl p-5"><h3 class="font-black">${translateText('activeEvents')}</h3><div class="mt-4 space-y-3">${s.events.filter(e=>['published','finalized'].includes(e.status)).slice(0,8).map(e=>miniEventCard(e)).join('') || `<div class="text-sm text-slate-500">${translateText('none')}</div>`}</div></div><div class="glass rounded-2xl p-5"><h3 class="font-black">${translateText('notifications')}</h3><div class="mt-4 space-y-3">${renderNotifications(notes)}</div></div></div>`;
  }
  function adminSlotsHtml() {
    const state=getState(); const pending=state.slots.filter(s=>s.status==='pending'); const all=state.slots.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
    return `<div class="grid gap-5 lg:grid-cols-[1fr_1fr]"><div class="glass rounded-2xl p-5"><h3 class="text-lg font-black">${translateText('pendingSlots')}</h3><div class="mt-4 space-y-3">${pending.map(s=>slotAdminCard(s,true)).join('') || `<div class="text-sm text-slate-500">${translateText('none')}</div>`}</div></div><div class="glass rounded-2xl p-5"><h3 class="text-lg font-black">${translateText('mySlots')}</h3><div class="mt-4 space-y-3">${all.map(s=>slotAdminCard(s,false)).join('')}</div></div></div>`;
  }
  function slotAdminCard(s, actions) { const v=getVenue(s.venueId); return `<div class="soft-card rounded-2xl p-4"><div class="flex items-start justify-between gap-3"><div><div class="font-black">${escapeHtml(v?.name||'')}</div><div class="mt-1 text-xs text-slate-400">${formatDate(s.date)} · ${s.start}–${s.end} · ${escapeHtml(s.sport)}</div><div class="mt-1 text-xs text-orange-300">${money(s.fee)}</div></div><span class="chip ${statusClass(s.status)} rounded-lg border px-2 py-1 text-[10px] font-bold">${statusLabel(s.status)}</span></div>${s.note?`<div class="mt-3 text-xs text-slate-500">${escapeHtml(s.note)}</div>`:''}${actions?`<div class="mt-4 grid grid-cols-2 gap-2"><button data-click="approveSlot('${s.id}')" class="rounded-xl bg-green-600 px-3 py-2 text-xs font-black">${translateText('approve')}</button><button data-click="rejectSlot('${s.id}')" class="rounded-xl bg-red-600 px-3 py-2 text-xs font-black">${translateText('reject')}</button></div>`:''}</div>`; }
  async function approveSlot(id){await perform('approveSlot',{id},translateText('slotApproved'));}
  async function rejectSlot(id){await perform('rejectSlot',{id},translateText('slotRejected'));}

  function adminEventsHtml(){const s=getState();const pending=s.events.filter(e=>e.status==='pending_admin');const active=s.events.filter(e=>['published','finalized'].includes(e.status));return `<div class="grid gap-5 lg:grid-cols-[1fr_1fr]"><div class="glass rounded-2xl p-5"><h3 class="text-lg font-black">${translateText('pendingEvents')}</h3><div class="mt-4 space-y-3">${pending.map(e=>eventAdminCard(e,true)).join('')||`<div class="text-sm text-slate-500">${translateText('none')}</div>`}</div></div><div class="glass rounded-2xl p-5"><h3 class="text-lg font-black">${translateText('activeEvents')}</h3><div class="mt-4 space-y-3">${active.map(e=>eventAdminCard(e,false)).join('')||`<div class="text-sm text-slate-500">${translateText('none')}</div>`}</div></div></div>`;}
  function eventAdminCard(e,pendingActions){const slot=getSlot(e.slotId),v=getVenue(slot?.venueId),creator=getUser(e.creatorId);const canFinalize=e.status==='published'&&e.participants.length>=e.minPlayers;return `<div class="soft-card rounded-2xl p-4"><div class="flex items-start justify-between gap-3"><div><div class="font-black">${escapeHtml(e.title)}</div><div class="mt-1 text-xs text-slate-400">${escapeHtml(v?.name||'')} · ${slot?formatDate(slot.date):''} ${slot?.start||''}</div><div class="mt-1 text-xs text-slate-500">${translateText('createdBy')}: ${escapeHtml(creator?.name||'Admin')} · ${e.participants.length}/${e.maxPlayers}</div></div><span class="chip ${statusClass(e.status)} rounded-lg border px-2 py-1 text-[10px] font-bold">${statusLabel(e.status)}</span></div><div class="mt-3 grid grid-cols-2 gap-2 text-xs"><div class="rounded-lg bg-black/20 p-2">${translateText('totalVenueFee')}: <b>${money(slot?.fee)}</b></div><div class="rounded-lg bg-black/20 p-2">${translateText('perPerson')}: <b>${money(perPerson(e,slot))}</b></div></div>${pendingActions?`<div class="mt-4 grid grid-cols-2 gap-2"><button data-click="approveEvent('${e.id}')" class="rounded-xl bg-green-600 px-3 py-2 text-xs font-black">${translateText('approve')}</button><button data-click="rejectEvent('${e.id}')" class="rounded-xl bg-red-600 px-3 py-2 text-xs font-black">${translateText('reject')}</button></div>`:`<div class="mt-4 flex flex-wrap gap-2"><button data-click="showInstruction('${e.id}',1)" class="rounded-lg bg-blue-500/15 px-3 py-2 text-xs font-bold text-blue-300">${translateText('firstInstruction')}</button>${e.instruction2?`<button data-click="showInstruction('${e.id}',2)" class="rounded-lg bg-green-500/15 px-3 py-2 text-xs font-bold text-green-300">${translateText('secondInstruction')}</button>`:''}${canFinalize?`<button data-click="finalizeEvent('${e.id}')" class="rounded-lg bg-green-600 px-3 py-2 text-xs font-black">${translateText('finalize')}</button>`:''}${e.status!=='cancelled'?`<button data-click="cancelEvent('${e.id}')" class="rounded-lg bg-red-500/15 px-3 py-2 text-xs font-bold text-red-300">${translateText('cancel')}</button>`:''}</div>`}</div>`;}
  async function approveEvent(id){await perform('approveEvent',{id},translateText('approvedEvent'));}
  async function rejectEvent(id){await perform('rejectEvent',{id},translateText('rejectedEvent'));}
  async function finalizeEvent(id){await perform('finalizeEvent',{id},translateText('finalGenerated'));}
  async function cancelEvent(id){if(confirm(translateText('confirmCancel')))await perform('cancelEvent',{id},translateText('eventCancelled'));}

  function adminVenuesHtml(){const s=getState();return `<div class="grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><form data-submit="addVenue" class="glass rounded-2xl p-5"><h3 class="text-lg font-black">${translateText('addVenue')}</h3><div class="mt-4 space-y-3"><input id="venueName" required placeholder="${translateText('venueName')}" class="w-full rounded-xl border border-blue-400/20 bg-slate-950/70 px-4 py-3"><input id="venueAddress" required placeholder="${translateText('address')}" class="w-full rounded-xl border border-blue-400/20 bg-slate-950/70 px-4 py-3"><input id="managerEmail" type="email" required placeholder="${translateText('managerEmail')}" class="w-full rounded-xl border border-blue-400/20 bg-slate-950/70 px-4 py-3"><button class="w-full rounded-xl bg-blue-600 px-4 py-3 font-black">${translateText('addVenueBtn')}</button></div></form><div class="glass rounded-2xl p-5"><h3 class="text-lg font-black">${translateText('venues')}</h3><div class="mt-4 space-y-3">${s.venues.map(v=>{const m=s.users.find(u=>u.id===v.managerUserId);return `<div class="soft-card rounded-2xl p-4"><div class="font-black">${escapeHtml(v.name)}</div><div class="mt-1 text-xs text-slate-400">${escapeHtml(v.address)}</div><div class="mt-3 grid gap-1 text-xs"><div>${translateText('venueManager')}: <b>${escapeHtml(m?.name||'')}</b></div><div>${translateText('email')}: ${escapeHtml(m?.email||'')}</div><div>${translateText('phone')}: ${escapeHtml(m?.phone||'')}</div></div></div>`}).join('')}</div></div></div>`;}
  async function addVenue(e){e.preventDefault();await perform('addVenue',{name:value('venueName'),address:value('venueAddress'),email:value('managerEmail')},translateText('venueCreated'));}
  function adminInstructionsHtml(){const s=getState();const events=s.events.filter(e=>e.instruction1||e.instruction2).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));return `<div class="glass rounded-2xl p-5"><div class="mb-4 flex items-center justify-between"><div><h3 class="text-lg font-black">${translateText('instructions')}</h3><p class="mt-1 text-xs text-slate-400">${translateText('instruction1Help')} ${translateText('instruction2Help')}</p></div></div><div class="grid gap-3 md:grid-cols-2">${events.map(e=>`<div class="soft-card rounded-2xl p-4"><div class="font-black">${escapeHtml(e.title)}</div><div class="mt-3 flex flex-wrap gap-2">${e.instruction1?`<button data-click="showInstruction('${e.id}',1)" class="rounded-lg bg-blue-500/15 px-3 py-2 text-xs font-bold text-blue-300">${translateText('firstInstruction')}</button>`:''}${e.instruction2?`<button data-click="showInstruction('${e.id}',2)" class="rounded-lg bg-green-500/15 px-3 py-2 text-xs font-bold text-green-300">${translateText('secondInstruction')}</button>`:''}</div></div>`).join('')||`<div class="text-sm text-slate-500">${translateText('none')}</div>`}</div></div>`;}

  function showInstruction(id,stage){const e=getEvent(id);if(!e)return;const slot=getSlot(e.slotId),v=getVenue(slot?.venueId),creator=getUser(e.creatorId);const roster=e.participants.map(pid=>getUser(pid)?.name||'').join(', ');const per=perPerson(e,slot);const base=`${stage===1?translateText('firstInstruction'):translateText('secondInstruction')}\n\n${e.title}\n${translateText('venue')}: ${v?.name}\n${translateText('address')}: ${v?.address}\n${translateText('date')}: ${slot?formatDate(slot.date):''}\n${translateText('eventTime')}: ${slot?.start}–${slot?.end}\n${translateText('organizer')}: ${creator?.name||'Admin'}\n${translateText('venueContact')}: ${v?.contactName||''} ${v?.contactPhone||''}\n${translateText('totalVenueFee')}: ${money(slot?.fee)}\n${translateText('perPerson')}: ${money(per)}\n${translateText('participants')}: ${e.participants.length}/${e.maxPlayers}`;const final=stage===2?`\n${translateText('entryTime')}: ${entryTime(slot?.start)}\n${translateText('amountToVenue')}: ${money(slot?.fee)}\n${translateText('collectionTarget')}: ${money(slot?.fee)}\n${translateText('roster')}: ${roster||translateText('none')}`:'';alert(base+final+`\n\n${translateText('paymentNotice')}`);}
  function entryTime(time){if(!time)return'';const [h,m]=time.split(':').map(Number);const d=new Date();d.setHours(h,m-15,0,0);return d.toTimeString().slice(0,5);}

  function renderVenueDashboard(){if(!currentUser||currentUser.role!=='venue')return;const state=getState(),venue=state.venues.find(v=>v.id===currentUser.venueId);document.getElementById('venuePanelTitle').textContent=venue?.name||translateText('venueManagerPanel');document.getElementById('slotFee').value=document.getElementById('slotFee').value||120;const minDate=new Date(Date.now()+48*36e5);document.getElementById('slotDate').min=toDateInput(minDate);const slots=state.slots.filter(s=>s.venueId===currentUser.venueId).sort((a,b)=>`${b.date}${b.start}`.localeCompare(`${a.date}${a.start}`));document.getElementById('venueSlotsList').innerHTML=slots.length?slots.map(s=>slotAdminCard(s,false)).join(''):`<div class="text-sm text-slate-500">${translateText('none')}</div>`;const events=state.events.filter(e=>e.instruction2&&state.slots.find(s=>s.id===e.slotId)?.venueId===currentUser.venueId);document.getElementById('venueInstructions').innerHTML=events.length?events.map(e=>`<div class="soft-card rounded-2xl p-4"><div class="font-black">${escapeHtml(e.title)}</div><div class="mt-2 text-xs text-slate-400">${getSlot(e.slotId)?formatDate(getSlot(e.slotId).date):''} · ${getSlot(e.slotId)?.start||''}</div><button data-click="showInstruction('${e.id}',2)" class="mt-3 rounded-lg bg-green-500/15 px-3 py-2 text-xs font-bold text-green-300">${translateText('secondInstruction')}</button></div>`).join(''):`<div class="text-sm text-slate-500">${translateText('none')}</div>`;}
  async function submitVenueSlot(e){
    e.preventDefault();const date=value('slotDate'),start=value('slotStart'),end=value('slotEnd');
    await api('submitSlot',{date,start,end,startsAt:londonISO(date,start),endsAt:londonISO(date,end),sport:value('slotSport'),fee:Number(value('slotFee')),note:value('slotNote')});
    e.target.reset();showToast(translateText('slotRequestSent'),'success');renderVenueDashboard();
  }


  function londonISO(date,time){
    const target=date+'T'+time;
    const base=Date.parse(target+':00Z');
    if(!Number.isFinite(base))throw new Error('Invalid date.');
    const format=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
    for(const offset of [0,60]){
      const d=new Date(base-offset*60000),q=Object.fromEntries(format.formatToParts(d).map(x=>[x.type,x.value]));
      if(`${q.year}-${q.month}-${q.day}T${q.hour}:${q.minute}`===target)return d.toISOString();
    }
    throw new Error('This time does not exist in Europe/London due to daylight saving.');
  }
  // Declarative event delegation: no eval(), inline scripts or inline event handlers.
  const clickActions={navigate,handleAccountButton,openDashboard,requireUserThen,setLanguage,setAdminTab,selectSlot,showEventDetails,showInstruction,joinEvent,logout,approveSlot,rejectSlot,approveEvent,rejectEvent,finalizeEvent,cancelEvent};
  const submitActions={requestPasswordReset,loginUser,registerUser,submitEventRequest,submitVenueSlot,addVenue};
  document.addEventListener('click',async event=>{
    const el=event.target.closest('[data-click]');if(!el||el.disabled)return;
    const match=/^(\w+)\((?:'([a-zA-Z0-9_-]+)')?(?:,([12]))?\)$/.exec(el.dataset.click);
    if(!match||!Object.hasOwn(clickActions,match[1]))return;
    el.disabled=true;
    try {await clickActions[match[1]](...(match[2]?[match[2]]:[]),...(match[3]?[Number(match[3])]:[]));}
    catch(error){showToast(error.message,'error');}finally{el.disabled=false;}
  });
  document.addEventListener('submit',async event=>{
    const name=event.target.dataset.submit;if(!name)return;event.preventDefault();
    if(!Object.hasOwn(submitActions,name)||event.target.dataset.busy)return;
    const form=event.target;form.dataset.busy='true';const button=form.querySelector('button[type="submit"],button:not([type])');if(button)button.disabled=true;
    try{await submitActions[name](event);}catch(error){showToast(error.message,'error');}finally{delete form.dataset.busy;if(button)button.disabled=false;}
  });
  document.addEventListener('DOMContentLoaded',async()=>{
    // Delete only obsolete prototype credentials; never migrate them into real accounts.
    try {localStorage.removeItem('playonsport_v2_prototype');localStorage.removeItem('playonsport_v2_session');sessionStorage.removeItem('playonsport_v2_session');}catch{}
    setLanguage(lang);
    try{await refreshState();}catch(error){showToast(error.message,'error');}
    document.getElementById('slotDate').min=toDateInput(new Date(Date.now()+48*36e5));
  });

})();
