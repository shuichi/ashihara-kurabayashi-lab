/** Access details and the Google Form supplied by the laboratory. */
export const locationQuery = '東京理科大学 野田キャンパス 6号館 千葉県野田市山崎2641';
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery)}`;
export const formLink = 'https://docs.google.com/forms/d/e/1FAIpQLSepj0guKEHQCyENUNiKKz_bqrApwI_Yom5ev0KdgJMdauIRBA/viewform';

export const pageCopy = {
  ja: {
    access: 'アクセス', contact: 'お問い合わせ', home: 'ホーム',
    accessIntro: '東京理科大学 野田キャンパスにある研究室です。',
    university: '東京理科大学', faculty: '創域情報学部 情報理工学科',
    labName: '芦原・倉林研究室', labTranslation: 'Ashihara–Kurabayashi Laboratory',
    addressLabel: '所在地', postalCode: '〒278-8510', address: '千葉県野田市山崎2641',
    roomLabel: '建物・フロア', room: '6号館 4F',
    mapTitle: '東京理科大学 野田キャンパス 6号館のGoogleマップ',
    openMap: 'Googleマップで開く',
    contactIntro: '研究室へのご質問、進学・見学のご相談、共同研究や取材に関するお問い合わせは、こちらのフォームからお送りください。',
    formTitle: '芦原・倉林研究室 お問い合わせフォーム',
    openForm: 'Googleフォームで開く',
    formHelp: 'フォームが表示されない場合は、Googleフォームを直接開いてご利用ください。',
    formLanguageNote: 'フォーム内の質問文は、日本語・英語の併記を含む元のフォームの表記です。',
    responseNote: '内容を確認のうえ、担当者より折り返しご連絡します。回答までに数日お時間をいただく場合があります。',
    visitContact: '訪問・研究に関するご相談', contactAction: 'お問い合わせフォームへ',
  },
  en: {
    access: 'Access', contact: 'Contact', home: 'Home',
    accessIntro: 'Find us at the Noda Campus of Tokyo University of Science.',
    university: 'Tokyo University of Science', faculty: 'Faculty & Department of Information Science and Technology',
    labName: 'Ashihara–Kurabayashi Laboratory', labTranslation: '芦原・倉林研究室',
    addressLabel: 'Address', postalCode: '278-8510, Japan', address: '2641 Yamazaki, Noda, Chiba',
    roomLabel: 'Building & floor', room: 'Building 6, 4th floor',
    mapTitle: 'Google Map of Building 6, Tokyo University of Science, Noda Campus',
    openMap: 'Open in Google Maps',
    contactIntro: 'Use the form below for questions about the lab, study and visit enquiries, research collaborations, or media enquiries.',
    formTitle: 'Ashihara–Kurabayashi Laboratory contact form',
    openForm: 'Open in Google Forms',
    formHelp: 'If the embedded form does not appear, open it directly in Google Forms.',
    formLanguageNote: 'The form retains its original question text, including Japanese and bilingual labels.',
    responseNote: 'A member of the team will review your enquiry and get back to you. Please allow a few days for a reply.',
    visitContact: 'Questions about visiting or our research', contactAction: 'Go to the contact form',
  },
};
