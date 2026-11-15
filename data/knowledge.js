// ナレッジ（概念辞書・関数表・event・知識カード）。
// プロンプトの作成と、バリデーターのチェックに使う。サンプルなので、実際の運用では自分のプロジェクト経験に合わせて書き直すこと。
window.BR_KNOWLEDGE = {
 // event：ルールを実行するタイミング
 events: [
  {name: 'onInit',     desc: '画面を開いたとき。初期値の設定などに使う'},
  {name: 'onChange',   desc: '項目の値が変わったとき。結果をその場で画面に反映したい場合に使う'},
  {name: 'onSave',     desc: '保存するとき。インポートなど画面以外の更新でも確実に値を設定したい場合に使う'},
  {name: 'onPostSave', desc: '保存した後。後続の処理に使う'},
  {name: 'onView',     desc: '画面を表示するとき。表示の制御に使う'}
 ],

 // 関数表：バリデーターは、ここにない関数と引数の誤りをエラーにする
 functions: {
  'Add Days':   {params: ['date', 'number'], ret: 'date', desc: '日付に日数を加算・減算する'},
  'Add Months': {params: ['date', 'number'], ret: 'date', desc: '日付に月数を加算・減算する'},
  'Add Years':  {params: ['date', 'number'], ret: 'date', desc: '日付に年数を加算・減算する'},
  'Today':      {params: [], ret: 'date', desc: '当日の日付を返す'}
 },

 // 概念辞書：要件の言葉を、テナントのデータに結びつける
 // aliases のいずれかが要件に含まれると、その概念と refs の項目がプロンプトに入る
 concepts: [
  {name: '昇格', aliases: ['昇格', '昇進', '升格', 'promotion'], kind: 'derived',
   refs: ['EmpJob.eventReason', 'EmpJob.payGrade', 'EmpJob.customDate1', 'cust_PromotionHistory.effectiveStartDate'],
   hint: 'イベント事由が昇格系（event PRM）かで判定する。PRM_TTL 役職昇進は等級が変わらない。昇格日の専用項目はなく、近いのは EmpJob.customDate1（最終等級変更日）'},
  {name: '発令日', aliases: ['発令日', '発令時', '有効日', 'effective date'], kind: 'direct',
   refs: ['EmpJob.startDate'], hint: '職務情報の発令日は EmpJob.startDate'},
  {name: '入社の発令', aliases: ['入社の発令', '入社時', '入社した'], kind: 'direct',
   refs: ['EmpJob.event', 'EmpJob.eventReason'], hint: 'event = H（入社）。事由は HIRNEW 新卒入社、HIRMID 中途入社'},
  {name: '入社日', aliases: ['入社日', '入社年月日', 'hire date'], kind: 'similar',
   refs: ['EmpEmployment.startDate', 'EmpEmployment.originalStartDate', 'EmpEmployment.customDate1'],
   hint: '候補が複数ある。通常は EmpEmployment.startDate。再雇用前を含むなら originalStartDate、グループ入社なら customDate1'},
  {name: '退職', aliases: ['退職', '離職'], kind: 'direct',
   refs: ['EmpEmployment.endDate', 'EmpJob.event'], hint: 'event = 26（退職）。退職日は EmpEmployment.endDate'},
  {name: '等級', aliases: ['等級', 'グレード', 'pay grade'], kind: 'direct',
   refs: ['EmpJob.payGrade'], hint: '等級は EmpJob.payGrade（FOPayGrade）'},
  {name: '役職', aliases: ['役職', 'ポスト', '管理職'], kind: 'direct',
   refs: ['EmpJob.customString3'], hint: '役職は EmpJob.customString3（picklist JP_Position）'},
  {name: '課長以上', aliases: ['課長以上'], kind: 'derived',
   refs: ['EmpJob.customString3'], hint: 'JP_Position の MGR 課長、SMGR 部長、EXE 本部長。picklist には序列がないので列挙する'},
  {name: '裁量労働', aliases: ['裁量労働', 'みなし労働'], kind: 'direct',
   refs: ['EmpJob.customBoolean1'], hint: '裁量労働対象は EmpJob.customBoolean1（はい/いいえ）'},
  {name: '試用期間', aliases: ['試用期間', '試用'], kind: 'direct',
   refs: ['EmpJob.probationPeriodEndDate'], hint: '試用期間終了日は EmpJob.probationPeriodEndDate'},
  {name: '出向', aliases: ['出向'], kind: 'direct',
   refs: ['EmpJob.customDate3', 'EmpJob.eventReason'], hint: '出向の事由は TRN_SEC、出向復帰は TRN_RTN。出向開始日は EmpJob.customDate3'},
  {name: '定年', aliases: ['定年'], kind: 'derived',
   refs: ['EmpEmployment.customDate2', 'PerPerson.dateOfBirth'], hint: '定年到達日は EmpEmployment.customDate2。生年月日は PerPerson.dateOfBirth'},
  {name: '資格', aliases: ['資格'], kind: 'direct',
   refs: ['cust_Qualification.cust_qualification', 'cust_Qualification.cust_acquiredDate', 'cust_Qualification.cust_allowanceEligible'],
   hint: '保有資格はカスタム MDF cust_Qualification'}
 ],

 // 知識カード：設計の定石と注意点。すべてプロンプトに入る
 cards: [
  {title: 'onChange と onSave の使い分け',
   body: 'onChange は画面上の項目変更時に実行され、結果をその場で表示できる。インポートや API 経由の更新では実行されないことがあるため、確実に値を設定したい場合は onSave にも設定する。'},
  {title: '選択肢での範囲指定',
   body: 'picklist の値には大小の序列がないため、「課長以上」のような条件は値を列挙して「次のいずれか」で指定する。'},
  {title: 'イベント事由での判定',
   body: '人事イベントの種類はイベント事由で判定するのが一般的。無効（status I）の事由は使わない。'},
  {title: '日付の計算',
   body: '日付は関数を入れ子にして計算する。例：Add Days(Add Months(発令日, 6), -1) は「6か月後の前日」。'},
  {title: 'base object からアクセスできる範囲',
   body: 'ルールで使える項目は、base object とそのナビゲーション先のオブジェクトの項目に限られる。'},
  {title: '自動設定による上書き',
   body: '値を自動設定すると、手動で入力した値も上書きされる。例外がありうる場合は ELSE を使わない、または「空のときだけ設定」の条件を加える。'}
 ]
};
