import type { Language } from './content';
import type { PagePath } from '@/lib/spa-navigation';

export const navigation = {
  ja: [
    {
      href: '/',
      label: 'ホーム',
      description: '研究室の概要と、研究・教育で大切にしていること。',
    },
    {
      href: '/research',
      label: '研究紹介',
      description:
        '小型生成AI、自律分散AI、ゲーム・インタラクションの研究テーマと事例。',
    },
    {
      href: '/people',
      label: '教員紹介',
      description: '芦原栄登士・倉林修一の専門分野、経歴、産業界での取り組み。',
    },
    {
      href: '/publications',
      label: '研究実績',
      description:
        '論文・研究業績を発表年ごとに掲載。各論文の書誌情報と出典を確認できます。',
    },
    {
      href: '/students',
      label: '配属案内',
      description:
        '研究室で身につく力、入室時に求めること、研究生活、卒業研究の進め方。',
    },
    {
      href: '/access',
      label: 'アクセス',
      description:
        '東京理科大学 野田キャンパス、6号館4F。所在地と地図をご案内します。',
    },
    {
      href: '/contact',
      label: 'お問い合わせ',
      description: '配属・見学、研究内容、共同研究などのご相談はこちらから。',
    },
  ],
  en: [
    {
      href: '/',
      label: 'Home',
      description:
        'Our lab and the ideas that guide our research and teaching.',
    },
    {
      href: '/research',
      label: 'Research',
      description:
        'Topics and projects in compact generative AI, distributed AI, games, and interaction.',
    },
    {
      href: '/people',
      label: 'Faculty',
      description:
        'Meet Eitoshi Ashihara and Shuichi Kurabayashi: research interests, backgrounds, and industry experience.',
    },
    {
      href: '/publications',
      label: 'Publications',
      description:
        'Browse publications by year, with bibliographic information and links to original sources.',
    },
    {
      href: '/students',
      label: 'For students',
      description:
        'What you will learn, what to bring, everyday research, and your path through the fourth year.',
    },
    {
      href: '/access',
      label: 'Access',
      description:
        'Find us on the fourth floor of Building 6 at the Noda Campus of Tokyo University of Science.',
    },
    {
      href: '/contact',
      label: 'Contact',
      description:
        'Get in touch about joining or visiting the lab, our research, and collaborations.',
    },
  ],
} satisfies Record<
  Language,
  { href: PagePath; label: string; description: string }[]
>;

export const structureCopy = {
  ja: {
    about: '研究室について',
    guide: '研究室を知る',
    guideIntro: '知りたい内容から、各ページをご覧ください。',
    focus: '研究分野',
    overview: '研究室について',
    contents: 'このページの内容',
    themes: '研究テーマ',
    projects: '研究事例',
    computing: '計算環境',
    skills: '研究室で身につく力',
    fit: '求める学生像',
    requirements: '配属前の準備',
    life: '研究室生活',
    roadmap: '卒業研究の進め方',
    faq: 'よくある質問',
    years: '発表年から探す',
    publicationCount: '件の論文・研究業績',
    researchLink: '研究紹介を見る',
    publicationsLink: '研究実績をすべて見る',
    studentsLink: '配属案内を見る',
  },
  en: {
    about: 'About the lab',
    guide: 'Explore the lab',
    guideIntro: 'Find the information you need on each dedicated page.',
    focus: 'Research areas',
    overview: 'About the lab',
    contents: 'On this page',
    themes: 'Research topics',
    projects: 'Research projects',
    computing: 'Computing',
    skills: 'Skills you will develop',
    fit: 'Who we welcome',
    requirements: 'Preparing to join',
    life: 'Life in the lab',
    roadmap: 'Your research journey',
    faq: 'Frequently asked questions',
    years: 'Browse by year',
    publicationCount: 'publications',
    researchLink: 'Explore our research',
    publicationsLink: 'View all publications',
    studentsLink: 'Explore the student guide',
  },
};
