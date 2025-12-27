export default {
  // Common
  common: {
    loading: "読み込み中...",
    error: "エラー",
    cancel: "キャンセル",
    save: "保存",
    delete: "削除",
    edit: "編集",
    done: "完了",
    next: "次へ",
    back: "戻る",
    settings: "設定",
    ok: "OK",
  },

  // Tab navigation
  tabs: {
    home: "ホーム",
    practice: "練習",
    analysis: "分析",
    explore: "探索",
  },

  // Home screen
  home: {
    title: "音源リスト",
    addNewAudio: "新しい音源を追加",
    addNewAudioDescription: "録音またはファイルをインポートして学習を開始",
    record: "録音",
    import: "インポート",
    library: "ライブラリ",
    itemCount: "{{count}}件",
    lastPracticed: "最終練習: {{date}}",
    sessions: "{{count}}回",
  },

  // Practice screen
  practice: {
    title: "練習",
    comingSoon: "練習画面は準備中です",
  },

  // Analysis screen
  analysis: {
    title: "分析",
    consecutiveDays: "日連続",
    streakMessage: "素晴らしい継続力です！",
    weeklyLearningTime: "週間学習時間",
    total: "合計 {{time}}",
    totalLearningTime: "総合学習時間",
    totalSessions: "総合学習回数",
    hours: "時間",
    minutes: "分",
    sessions: "回",
  },

  // Study screen
  study: {
    modelAudio: "お手本",
    myRecording: "自分の録音",
  },

  // Record screen
  record: {
    title: "新規録音",
    tapToRecord: "タップして録音開始",
    recording: "録音中...",
    tapToStop: "タップして停止",
    discard: "破棄",
    save: "保存",
    recordingComplete: "録音完了",
  },

  // Explore screen
  explore: {
    title: "探索",
    description: "このアプリには、始めるためのサンプルコードが含まれています。",
    fileBasedRouting: "ファイルベースルーティング",
    fileBasedRoutingDescription:
      "このアプリには2つの画面があります: app/(tabs)/index.tsx と app/(tabs)/explore.tsx",
    layoutDescription:
      "app/(tabs)/_layout.tsx のレイアウトファイルがタブナビゲーターを設定します。",
    learnMore: "詳しく見る",
    platformSupport: "Android、iOS、Webサポート",
    platformSupportDescription:
      "このプロジェクトはAndroid、iOS、Webで開くことができます。Web版を開くには、ターミナルでwを押してください。",
    images: "画像",
    imagesDescription:
      "静的画像の場合、@2x と @3x サフィックスを使用して異なる画面密度用のファイルを提供できます",
    lightDarkMode: "ライトモードとダークモードコンポーネント",
    lightDarkModeDescription:
      "このテンプレートはライトモードとダークモードをサポートしています。useColorScheme() フックを使用してユーザーの現在のカラースキームを確認し、UIカラーを調整できます。",
    animations: "アニメーション",
    animationsDescription:
      "このテンプレートにはアニメーションコンポーネントの例が含まれています。components/HelloWave.tsx コンポーネントは react-native-reanimated ライブラリを使用して手を振るアニメーションを作成します。",
    parallaxDescription:
      "components/ParallaxScrollView.tsx コンポーネントはヘッダー画像にパララックス効果を提供します。",
  },

  // Theme selector
  theme: {
    title: "テーマ",
    light: "ライト",
    dark: "ダーク",
    auto: "自動",
  },

  // Streak
  streak: {
    days: "{{count}}日連続",
    fire: "🔥",
  },

  // Calendar
  calendar: {
    weekdays: {
      sun: "日",
      mon: "月",
      tue: "火",
      wed: "水",
      thu: "木",
      fri: "金",
      sat: "土",
    },
    months: {
      january: "1月",
      february: "2月",
      march: "3月",
      april: "4月",
      may: "5月",
      june: "6月",
      july: "7月",
      august: "8月",
      september: "9月",
      october: "10月",
      november: "11月",
      december: "12月",
    },
  },
} as const;

