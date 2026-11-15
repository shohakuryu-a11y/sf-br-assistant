# 架空テナント「Demo Corp」のメタデータ（MVP 用）

すべて架空のデータで、実在する顧客のテナントとは関係ありません。
アプリはこれらのファイルを直接読み込みません。`python tools/build_catalog.py` を実行すると、これらと `overlay.json`（説明、同義語、アクセス関係）を合わせて `data/catalog.js` を生成します。

## ファイル

| ファイル | 内容 | 実環境で対応するもの |
| --- | --- | --- |
| metadata_ja.xml | OData `$metadata`（日本語ラベル） | `Accept-Language: ja-JP` を付けたリクエストの結果 |
| metadata_en.xml | OData `$metadata`（英語ラベル） | `Accept-Language: en-US` を付けたリクエストの結果 |
| picklists.json | PickListV2 とその値（12 リスト、47 値） | 実際の API より構造を簡略化 |
| event_reasons.json | FOEventReason（20 件） | 実際の API より構造を簡略化 |
| data_model_demo.xml | 簡略版の Succession Data Model（HRIS 要素と項目 ID） | OData のプロパティ名と HRIS の項目 ID の対応づけに使用 |
| overlay.json | オブジェクトの区分、アクセス関係、意味の説明、同義語 | メタデータに含まれない情報 |
| gen.py | 上記のメタデータファイルを生成するスクリプト | オブジェクトや項目を追加したいときは、これを変更して再実行 |

規模：11 オブジェクト（EC 6、Foundation 3、カスタム MDF 2）、94 項目。

## わざと仕込んだテスト用の落とし穴

検索と生成の品質を確かめるため、実際のプロジェクトでよくある状況を入れています。

1. **「昇格日」という項目がない。** いちばん近いのは `EmpJob.customDate1`（最終等級変更日）だけです。正しくは派生概念として扱い、イベント事由が昇格のときに発令日を日付項目に書き込みます。
2. **昇格のイベント事由が複数ある。** `PRM_REG`（定期昇格）、`PRM_SPC`（抜擢昇格）、`PRM_TTL`（役職昇進）は、いずれもイベント `PRM` に属します。
3. **無効のイベント事由がある。** `PRM_OLD`（昇格（旧制度））は status が I で、バリデーターは拒否するべきです。
4. **同じプロパティ名でも、オブジェクトによって意味が違う。** `customDate1` は EmpJob では「最終等級変更日」、EmpEmployment では「グループ入社日」です。
5. **入社日の候補が複数ある。** `EmpEmployment.startDate`（入社日）、`originalStartDate`（当初入社日）、`customDate1`（グループ入社日）。
6. **別の保存先の候補がある。** カスタム MDF `cust_PromotionHistory`（昇進昇格履歴）でも昇格を記録できます。
7. **2 文字の検索語。** 「昇格」「等級」は 2 文字しかないため FTS5 の trigram では検索できず、LIKE に切り替える必要があります。

## 評価用の要件例

- 昇格年月日を自動セットするビジネスルール → 派生概念として、customDate1 を保存先の候補に挙げられるか
- 試用期間終了日を入社日の6か月後に自動セット → EmpJob.probationPeriodEndDate と日付計算の関数
- 役職が課長以上なら裁量労働対象をオン → customString3（JP_Position）と customBoolean1
- 定年到達日を生年月日から計算 → PerPerson.dateOfBirth と EmpEmployment.customDate2（オブジェクトをまたぐ）
- 出向の事由で異動したら出向開始日をセット → TRN_SEC と customDate3
