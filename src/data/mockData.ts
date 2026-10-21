import { ProjectItem, MemberItem, ReportItem } from '../types';

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-01',
    category: '編集',
    title: '雑誌『NEW PARADIGM』創刊号：紙とWebのハイブリッド編集部メンバー募集',
    lead: '「手元に残したくなる本を、みんなの熱量で」— 商業出版の枠組みを越え、完全自社流通・クラファン連動で仕掛ける120ページの本格カルチャー誌。執筆者、レイアウトデザイナー、校正、PR担当を募集します。',
    author: {
      name: '箕崎 駿（Shun Misaki）',
      role: 'アシタモハレルヤ 主宰 / 編集長',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2時間前',
    recruitmentDeadline: '2026年10月31日',
    targetSlots: 6,
    currentMembers: 4,
    tags: ['出版企画', 'デザイン', '編集', 'クラファン連動'],
    bannerImage: '/images/warm_publishing_lab_1792395805210.jpg',
    fullContent: {
      background: 'デジタル全盛の時代だからこそ、「手元に残したい究極の1冊」をみんなで創る価値がある。既存の大手取次や書店流通のルールに縛られず、サロンメンバー自らが取材し、執筆し、デザインし、印刷立ち会いまで行う実験的出版プロジェクトです。初版部数は限定3,000部。すでに先行クラファンで1,200万円の支援を獲得しています。',
      purpose: '単なる情報伝達ではなく、手に取った読者が「自分も表現者になりたい」と温かな勇気を覚えるような媒体を世に放つこと。',
      rolesNeeded: [
        { role: '特集記事ライター・インタビュアー', count: '2名', description: '起業家・現代アーティストへの独占取材、心に響くルポルタージュの執筆', filled: true },
        { role: 'InDesign / エディトリアルデザイナー', count: '2名', description: '温かみのある誌面レイアウト設計、タイポグラフィ制作', filled: false },
        { role: '校閲・進行管理（デスク）', count: '1名', description: '原稿事実確認、印刷所との入稿スケジュール管理', filled: true },
        { role: 'SNSローンチ・プロモーション担当', count: '1名', description: 'X / Instagram / ショート動画での発売告知キャンペーン設計', filled: false }
      ],
      schedule: [
        '10月下旬：編集会議キックオフ & 企画コンテ決定',
        '11月中旬：全取材完了 & 初稿アップ',
        '11月下旬：DTPレイアウト組み & 第一回校正',
        '12月上旬：印刷立ち会い（都内特殊印刷所）',
        '12月中旬：サロン限定先行発送 & 出版記念トークライブ'
      ],
      resources: '制作予算：約¥3,500,000（印刷製本費・取材実費全額負担）。参加メンバーには巻末クレジット記載および特装版を無償支給。'
    },
    comments: [
      {
        id: 'c-1',
        author: '神谷 怜（Rei Kamiya）',
        authorRole: 'UI/エディトリアルデザイナー',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        content: 'エディトリアルデザイン枠に立候補します！普段はWebメインですが、以前リトルプレスの装丁を手掛けた経験があります。温かみのある手触りの紙（ヴァンヌーボ等）や特色インクの選定も含めて提案させてください！',
        createdAt: '1時間前',
        likes: 7
      },
      {
        id: 'c-2',
        author: '箕崎 駿（Shun Misaki）',
        authorRole: 'アシタモハレルヤ 主宰 / 編集長',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        content: '神谷さん、ありがとうございます！温かみのある紙の風合い、まさにこの本にぴったりです。今週木曜21:00の第1回オンライン編集会議でお話ししましょう。枠確保します！',
        createdAt: '45分前',
        likes: 4
      },
      {
        id: 'c-3',
        author: '高橋 奈央（Nao Takahashi）',
        authorRole: 'フリーランスライター',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        content: 'ライター枠で参加したいです。「好きな場所で心豊かに働く」をテーマに、地方移住した若手クリエイター3名への連続取材企画を温めていました。企画書を今夜スレッドにアップします！',
        createdAt: '20分前',
        likes: 5
      }
    ]
  },
  {
    id: 'proj-02',
    category: 'デザイン',
    title: '自律型次世代ハードウェア『ODYSSEY-01』筐体プロダクトデザイン＆試作チーム',
    lead: 'サロン発のハードウェアベンチャー実験。デスク周りの環境と生体リズムを同期させるフィジカルコントローラーの試作開発が進行中。3Dプリントプロトタイプと金型設計の壁打ちができるデザイナー・エンジニアを求めます。',
    author: {
      name: '本間 創（So Homma）',
      role: 'ハードウェアエンジニア / Maker',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '5時間前',
    recruitmentDeadline: '2026年11月10日',
    targetSlots: 5,
    currentMembers: 3,
    tags: ['ハードウェア', '工業デザイン', '3Dプリンタ', 'IoT'],
    bannerImage: '/images/warm_product_design_1792395807048.jpg',
    fullContent: {
      background: '手で触れる「心地よい質感」と「重み」を持つガジェットが日々のクリエイティビティを支える。木目や陶器のような自然な手触りと、精密な操作感を両立したクリエイター専用の触覚インターフェースを開発しています。',
      purpose: '量産試作ライン立ち上げ前の、最終プロトタイプ検証。Kickstarterでのグローバルローンチを視野に入れています。',
      rolesNeeded: [
        { role: '3D CAD / 工業製品サーフェスモデラー', count: '1名', description: 'Fusion360でのフィレット調整・内部基板クリアランス設計', filled: true },
        { role: 'C言語 / 組込みファームウェアエンジニア', count: '1名', description: 'ESP32マイコン制御、BLE通信レイテンシ最適化', filled: true },
        { role: 'パッケージング & 開封体験グラフィック', count: '2名', description: '温かみのあるクラフト化粧箱の設計、マニュアルのミニマルデザイン', filled: false }
      ],
      schedule: [
        '11月上旬：第3世代外装の試作出力',
        '11月中旬：基板組み込み & 操作感テスト',
        '12月上旬：クラウドファンディング用動画撮影'
      ],
      resources: 'プロトタイプ用ラボ機材（光造形プリンタ、CNC切削機）利用可能。部材費支給あり。'
    },
    comments: [
      {
        id: 'c-4',
        author: '工藤 勇気（Yuki Kudo）',
        authorRole: 'パッケージデザイナー',
        authorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        content: 'パッケージングの開封体験、ぜひ担当させてください！自然な風合いの厚紙を折り構造だけで仕立てる、環境に優しく開けた瞬間にワクワクするパッケージを試作できます。',
        createdAt: '3時間前',
        likes: 6
      },
      {
        id: 'c-5',
        author: '本間 創（So Homma）',
        authorRole: 'ハードウェアエンジニア / Maker',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        content: '工藤さん！自然素材の折り構造、プロダクトの思想と完全に一致しています。基板サンプルの寸法データをDMでお送りします！',
        createdAt: '2時間前',
        likes: 3
      }
    ]
  },
  {
    id: 'proj-03',
    category: '公式',
    title: '【公式】熱狂の実験室『PARK FES 2026』空間演出・フードコラボ実行委員会',
    lead: '過疎地域の廃校を丸ごとリノベーションし、1泊2日で開催するサロン最大のリアルフェス。夕暮れのランタン演出、音楽ライブ、地元農家・酒蔵とコラボした限定クラフトバーの企画運営を牽引するコアメンバーを召集！',
    author: {
      name: '運営事務局（アシタモハレルヤ Core）',
      role: 'コミュニティマネージャー',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '1日前',
    recruitmentDeadline: '2026年11月15日',
    targetSlots: 10,
    currentMembers: 7,
    tags: ['リアルイベント', '地方創生', '空間デザイン', '飲食プロデュース'],
    bannerImage: '/images/warm_community_fest_1792395806083.jpg',
    fullContent: {
      background: 'オンラインのつながりを、リアルなあたたかい「出会いと共創の現場」に昇華させる年間最大フェス。参加者全員が観客ではなく仲間であり表現者。地方自治体とタッグを組み、過疎化が進む地域の廃校を2日間限定のあたたかい文化祭へ変貌させます。',
      purpose: '地域の人々とサロンメンバーが笑顔で交わる新しい地方創生モデルを作り、息の長い関係性を育てること。',
      rolesNeeded: [
        { role: '空間演出・あかりのライティングディレクション', count: '2名', description: '校庭のあたたかなランタン設置、木製ステージのライティング設計', filled: true },
        { role: 'フード & クラフト飲食プロデュース', count: '2名', description: '地元農家の野菜を使ったあったかスープやクラフトビール開発', filled: true },
        { role: '会場設営 & ほのぼのワークショップ運営', count: '2名', description: '子どもから大人まで楽しめる参加型クラフト体験の進行', filled: false }
      ],
      schedule: [
        '11月中旬：現地ロケハン & 地域の方々との顔合わせ交流会',
        '12月上旬：出店ブース・ステージタイムテーブル発表',
        '1月中旬：フェス本番（金曜夜前夜祭〜日曜夕方）'
      ],
      resources: 'イベント全体予算：¥8,000,000。交通費・現地宿泊費はサロン運営より全額補助。'
    },
    comments: [
      {
        id: 'c-6',
        author: '森田 健一（Kenichi Morita）',
        authorRole: 'イベントディレクター',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        content: '会場設営と動線設計、担当可能です！地域の木材を活用した温かみのあるブース作りを提案したいです。安全管理マニュアルと電源プランの草案を引きます。',
        createdAt: '18時間前',
        likes: 9
      }
    ]
  },
  {
    id: 'proj-04',
    category: '雑談',
    title: 'あたたかなクリエイティブ放談：2026年以降の個人スタジオ生き残り戦略',
    lead: 'デジタル化が進む時代だからこそ「人との温かなつながり」や「個人の手仕事」をどう大切にするか？毎週金曜夜にオンラインで気楽にお茶やビールを片手に語り合う、サロン内の人気リラックススレッド。',
    author: {
      name: '佐々木 遥（Haruka Sasaki）',
      role: 'アートディレクター',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2日前',
    recruitmentDeadline: '常時開催',
    targetSlots: 20,
    currentMembers: 14,
    tags: ['週末放談', 'キャリア', '温かな働き方', 'インディーズ'],
    fullContent: {
      background: '忙しい日常の中で、失敗談やボツ企画もクスッと笑い合える温かな居場所をつくりたいという思いから生まれたスレッドです。お気に入りの飲み物片手に気軽に参加してください。',
      purpose: '肩肘張らずに応援し合える、あたたかく優しい壁打ちコミュニティをつくること。',
      rolesNeeded: [
        { role: 'リスナー & 語り手', count: '無制限', description: '金曜21:30〜まったりオンラインで話しましょう', filled: false }
      ],
      schedule: [
        '毎週金曜 21:30〜23:00：オンラインボイスチャット（途中入退室自由）'
      ],
      resources: '自由参加。事前予約不要。'
    },
    comments: [
      {
        id: 'c-7',
        author: '千葉 大輔（Daisuke Chiba）',
        authorRole: 'モーショングラフィックス',
        authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
        content: '前回の「手描きアニメーションの温もり」の話、心がほっこりしました。今週は制作途中の温かい短編のラフを持って遊びに行きます！',
        createdAt: '1日前',
        likes: 5
      }
    ]
  }
];

export const MOCK_MEMBERS: MemberItem[] = [
  {
    id: 'MEM-001',
    name: '佐藤 匠（Takumi Sato）',
    email: 'takumi.sato@creativelab.tokyo',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    role: 'クリエイティブディレクター',
    joinedAt: '2026/01/15',
    activeProjects: 3,
    status: 'アクティブ',
    monthlyPlan: '月額 3,000円'
  },
  {
    id: 'MEM-002',
    name: '神谷 怜（Rei Kamiya）',
    email: 'rei.kamiya@designworks.jp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'エディトリアルデザイナー',
    joinedAt: '2026/02/01',
    activeProjects: 2,
    status: 'アクティブ',
    monthlyPlan: '月額 3,000円'
  },
  {
    id: 'MEM-003',
    name: '田中 健太郎（Kentaro Tanaka）',
    email: 'k.tanaka@startup-lab.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    role: 'マーケティングリサーチャー',
    joinedAt: '2026/03/10',
    activeProjects: 1,
    status: '決済エラー',
    monthlyPlan: '月額 3,000円'
  },
  {
    id: 'MEM-004',
    name: '松田 真理（Mari Matsuda）',
    email: 'matsuda.mari@pressroom.org',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    role: 'PRプランナー',
    joinedAt: '2026/04/05',
    activeProjects: 0,
    status: '休会中',
    monthlyPlan: '月額 3,000円'
  },
  {
    id: 'MEM-005',
    name: '渡辺 翔太（Shota Watanabe）',
    email: 'shota.w@indiegame.dev',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    role: 'ゲーム開発者',
    joinedAt: '2026/10/16',
    activeProjects: 1,
    status: '新規',
    monthlyPlan: '月額 3,000円'
  },
  {
    id: 'MEM-006',
    name: '小林 梨乃（Rino Kobayashi）',
    email: 'rino.k@branding-studio.jp',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    role: 'コピーライター',
    joinedAt: '2026/02/18',
    activeProjects: 2,
    status: 'アクティブ',
    monthlyPlan: '月額 3,000円'
  }
];

export const MOCK_REPORTS: ReportItem[] = [
  {
    id: 'REP-101',
    targetType: 'コメント',
    targetTitle: '雑誌『NEW PARADIGM』創刊号 スレッド内コメント',
    reportedUser: '外部プロモーション営業bot',
    reporterUser: '神谷 怜',
    reason: 'サロン規約第8条違反：無許可の副業商材セミナーへの外部誘導URLの投稿',
    timestamp: '2026/10/18 19:42',
    severity: '高'
  },
  {
    id: 'REP-102',
    targetType: '投稿',
    targetTitle: '【急募】他社案件の下請け作業員募集（低単価・規約外）',
    reportedUser: '匿名エージェントX',
    reporterUser: '本間 創',
    reason: 'サロン規約第5条違反：サロン内の温かい信頼関係を利用した不当な中抜き下請け斡旋',
    timestamp: '2026/10/18 16:15',
    severity: '高'
  },
  {
    id: 'REP-103',
    targetType: 'コメント',
    targetTitle: '深夜のクリエイティブ放談 スレッド内コメント',
    reportedUser: 'ユーザー#9041',
    reporterUser: '千葉 大輔',
    reason: '特定の個人メンバーに対する威圧的かつ執拗な中傷発言',
    timestamp: '2026/10/17 23:10',
    severity: '中'
  }
];
