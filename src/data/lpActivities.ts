import { IMAGES } from '../constants/images';

export interface LPActivity {
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  currentProject: string;
}

export const LP_ACTIVITIES: LPActivity[] = [
  {
    label: '01 / PUBLISHING',
    title: '雑誌・書籍の自社出版',
    description:
      '大手取次や商業出版の枠組みを飛び越え、企画、取材、執筆、DTP組版、手触りのある紙選びまでメンバー自ら主導。心に残るカルチャー誌をクラウドファンディングと直販で全国へ届けます。',
    image: IMAGES.publishing,
    imageAlt: '温もりある雑誌・書籍編集プロジェクト',
    currentProject: '『NEW PARADIGM』創刊',
  },
  {
    label: '02 / PRODUCT DEV',
    title: '手触りのあるものづくり・プロダクト',
    description:
      '木材や3Dプリンタを駆使した自然な手触りのプロトタイピングから、パッケージング、Kickstarterでの資金調達まで。暮らしに寄り添う心地よいガジェットを生み出します。',
    image: IMAGES.product,
    imageAlt: 'ものづくり・プロダクト開発',
    currentProject: '触覚デバイス『ODYSSEY-01』',
  },
  {
    label: '03 / REGIONAL FESTIVAL',
    title: '廃校ジャック & あかりのリアルフェス',
    description:
      '地方自治体や酒蔵とタッグを組み、過疎地域の廃校を丸ごと2日間あたたかい文化祭へ変貌。夕暮れのランタン演出、クラフト料理開発まで、全員が笑顔で共創します。',
    image: IMAGES.festival,
    imageAlt: '地方創生・あかりのリアルフェス',
    currentProject: '『PARK FES 2026』',
  },
];
