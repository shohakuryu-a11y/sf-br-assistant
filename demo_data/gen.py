import json, os, zlib
from xml.sax.saxutils import quoteattr

OUT = "demo_data"
os.makedirs(OUT, exist_ok=True)

# (name, type, required, label_ja, label_en, picklist, hris_id)
S, D, B, L, N = "Edm.String", "Edm.DateTime", "Edm.Boolean", "Edm.Int64", "Edm.Decimal"
ENT = {
 "EmpJob": ("jobInfo", "職務情報", "Job Information", ["seqNumber", "startDate", "userId"], [
  ("userId", S, 1, "ユーザーID", "User ID", None, "user-id"),
  ("startDate", D, 1, "発令日", "Event Date", None, "start-date"),
  ("endDate", D, 0, "終了日", "End Date", None, "end-date"),
  ("seqNumber", L, 1, "連番", "Sequence Number", None, "seq-number"),
  ("event", S, 1, "イベント", "Event", "event", "event"),
  ("eventReason", S, 1, "イベント事由", "Event Reason", None, "event-reason"),
  ("company", S, 1, "会社", "Company", None, "company"),
  ("businessUnit", S, 0, "事業本部", "Business Unit", None, "business-unit"),
  ("division", S, 0, "事業部", "Division", None, "division"),
  ("department", S, 0, "部署", "Department", None, "department"),
  ("location", S, 0, "勤務地", "Location", None, "location"),
  ("jobCode", S, 0, "職務コード", "Job Classification", None, "job-code"),
  ("jobTitle", S, 0, "職務名", "Job Title", None, "job-title"),
  ("payGrade", S, 0, "等級", "Pay Grade", None, "pay-grade"),
  ("managerId", S, 0, "上長", "Supervisor", None, "manager-id"),
  ("employeeClass", S, 0, "社員区分", "Employee Class", "employeeclass", "employee-class"),
  ("employmentType", S, 0, "雇用形態", "Employment Type", "employmentType", "employment-type"),
  ("emplStatus", S, 0, "在籍ステータス", "Employee Status", "employee-status", "emplStatus"),
  ("standardHours", N, 0, "所定労働時間（週）", "Standard Weekly Hours", None, "standard-hours"),
  ("fte", N, 0, "FTE", "FTE", None, "fte"),
  ("probationPeriodEndDate", D, 0, "試用期間終了日", "Probation Period End Date", None, "probation-period-end-date"),
  ("customString1", S, 0, "人事区分", "HR Category", "JP_HRCategory", "custom-string1"),
  ("customString2", S, 0, "評価ランク", "Appraisal Rank", "JP_AppraisalRank", "custom-string2"),
  ("customString3", S, 0, "役職", "Managerial Title", "JP_Position", "custom-string3"),
  ("customDate1", D, 0, "最終等級変更日", "Last Grade Change Date", None, "custom-date1"),
  ("customDate2", D, 0, "役職任命日", "Title Appointment Date", None, "custom-date2"),
  ("customDate3", D, 0, "出向開始日", "Secondment Start Date", None, "custom-date3"),
  ("customLong1", L, 0, "等級在籍年数", "Years in Grade", None, "custom-long1"),
  ("customBoolean1", B, 0, "裁量労働対象", "Discretionary Work Flag", None, "custom-boolean1"),
 ]),
 "EmpEmployment": ("employmentInfo", "雇用情報", "Employment Details", ["personIdExternal", "userId"], [
  ("personIdExternal", S, 1, "個人ID", "Person ID", None, "person-id-external"),
  ("userId", S, 1, "ユーザーID", "User ID", None, "user-id"),
  ("startDate", D, 1, "入社日", "Hire Date", None, "start-date"),
  ("originalStartDate", D, 0, "当初入社日", "Original Start Date", None, "original-start-date"),
  ("seniorityDate", D, 0, "勤続起算日", "Seniority Start Date", None, "seniority-date"),
  ("endDate", D, 0, "退職日", "Termination Date", None, "end-date"),
  ("lastDateWorked", D, 0, "最終勤務日", "Last Date Worked", None, "last-date-worked"),
  ("isContingentWorker", B, 0, "外部人材", "Is Contingent Worker", None, "is-contingent-worker"),
  ("customDate1", D, 0, "グループ入社日", "Group Hire Date", None, "custom-date1"),
  ("customDate2", D, 0, "定年到達日", "Retirement Age Date", None, "custom-date2"),
 ]),
 "PerPerson": ("personInfo", "個人情報（基本）", "Biographical Information", ["personIdExternal"], [
  ("personIdExternal", S, 1, "個人ID", "Person ID", None, "person-id-external"),
  ("dateOfBirth", D, 0, "生年月日", "Date Of Birth", None, "date-of-birth"),
  ("countryOfBirth", S, 0, "出生国", "Country Of Birth", None, "country-of-birth"),
 ]),
 "PerPersonal": ("personalInfo", "個人情報", "Personal Information", ["personIdExternal", "startDate"], [
  ("personIdExternal", S, 1, "個人ID", "Person ID", None, "person-id-external"),
  ("startDate", D, 1, "有効開始日", "Start Date", None, "start-date"),
  ("lastName", S, 1, "姓", "Last Name", None, "last-name"),
  ("firstName", S, 1, "名", "First Name", None, "first-name"),
  ("lastNameAlt1", S, 0, "姓（カナ）", "Last Name (Kana)", None, "custom-string1"),
  ("firstNameAlt1", S, 0, "名（カナ）", "First Name (Kana)", None, "custom-string2"),
  ("gender", S, 0, "性別", "Gender", "GENDER", "gender"),
  ("maritalStatus", S, 0, "婚姻状況", "Marital Status", "ecMaritalStatus", "marital-status"),
  ("nationality", S, 0, "国籍", "Nationality", None, "nationality"),
 ]),
 "EmpCompensation": ("compInfo", "報酬情報", "Compensation Information", ["seqNumber", "startDate", "userId"], [
  ("userId", S, 1, "ユーザーID", "User ID", None, "user-id"),
  ("startDate", D, 1, "発令日", "Event Date", None, "start-date"),
  ("seqNumber", L, 1, "連番", "Sequence Number", None, "seq-number"),
  ("event", S, 1, "イベント", "Event", "event", "event"),
  ("eventReason", S, 1, "イベント事由", "Event Reason", None, "event-reason"),
  ("payGroup", S, 0, "給与グループ", "Pay Group", None, "pay-group"),
  ("isEligibleForBenefit", B, 0, "福利厚生対象", "Benefits Eligible", None, "is-eligible-for-benefit"),
 ]),
 "EmpPayCompRecurring": ("payComponentRecurring", "定期報酬", "Recurring Pay Component", ["payComponent", "seqNumber", "startDate", "userId"], [
  ("userId", S, 1, "ユーザーID", "User ID", None, "user-id"),
  ("startDate", D, 1, "発令日", "Event Date", None, "start-date"),
  ("seqNumber", L, 1, "連番", "Sequence Number", None, "seq-number"),
  ("payComponent", S, 1, "報酬項目", "Pay Component", None, "pay-component"),
  ("paycompvalue", N, 1, "金額", "Amount", None, "paycompvalue"),
  ("currencyCode", S, 1, "通貨", "Currency", None, "currency-code"),
  ("frequency", S, 1, "頻度", "Frequency", None, "frequency"),
 ]),
 "FOEventReason": (None, "イベント事由", "Event Reason", ["externalCode", "startDate"], [
  ("externalCode", S, 1, "コード", "Code", None, None),
  ("startDate", D, 1, "有効開始日", "Start Date", None, None),
  ("name", S, 1, "名称", "Name", None, None),
  ("event", S, 1, "イベント", "Event", "event", None),
  ("status", S, 1, "ステータス", "Status", "status", None),
 ]),
 "FOPayGrade": (None, "等級", "Pay Grade", ["externalCode", "startDate"], [
  ("externalCode", S, 1, "コード", "Code", None, None),
  ("startDate", D, 1, "有効開始日", "Start Date", None, None),
  ("name", S, 1, "名称", "Name", None, None),
  ("paygradeLevel", L, 0, "等級レベル", "Pay Grade Level", None, None),
  ("status", S, 1, "ステータス", "Status", "status", None),
 ]),
 "FODepartment": (None, "部署", "Department", ["externalCode", "startDate"], [
  ("externalCode", S, 1, "コード", "Code", None, None),
  ("startDate", D, 1, "有効開始日", "Start Date", None, None),
  ("name", S, 1, "名称", "Name", None, None),
  ("headOfUnit", S, 0, "部署長", "Head of Unit", None, None),
  ("status", S, 1, "ステータス", "Status", "status", None),
 ]),
 "cust_PromotionHistory": (None, "昇進昇格履歴", "Promotion History", ["externalCode", "effectiveStartDate"], [
  ("externalCode", S, 1, "コード", "Code", None, None),
  ("effectiveStartDate", D, 1, "有効開始日", "Effective Start Date", None, None),
  ("cust_user", S, 1, "対象者", "Employee", None, None),
  ("cust_fromGrade", S, 0, "変更前等級", "Previous Grade", None, None),
  ("cust_toGrade", S, 0, "変更後等級", "New Grade", None, None),
  ("cust_promotionType", S, 0, "昇格区分", "Promotion Type", "JP_PromotionType", None),
  ("cust_approvedDate", D, 0, "承認日", "Approval Date", None, None),
 ]),
 "cust_Qualification": (None, "保有資格", "Qualification", ["externalCode", "effectiveStartDate"], [
  ("externalCode", S, 1, "コード", "Code", None, None),
  ("effectiveStartDate", D, 1, "有効開始日", "Effective Start Date", None, None),
  ("cust_user", S, 1, "対象者", "Employee", None, None),
  ("cust_qualification", S, 1, "資格", "Qualification", "JP_Qualification", None),
  ("cust_acquiredDate", D, 0, "取得日", "Acquired Date", None, None),
  ("cust_expiryDate", D, 0, "有効期限", "Expiry Date", None, None),
  ("cust_allowanceEligible", B, 0, "資格手当対象", "Allowance Eligible", None, None),
 ]),
}

def metadata(lang):
    li = 3 if lang == "ja" else 4
    out = ['<?xml version="1.0" encoding="utf-8"?>',
           '<!-- DEMO DATA: fictional tenant "Demo Corp". Not from any real customer. -->',
           '<edmx:Edmx Version="1.0" xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx" '
           'xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" '
           'xmlns:sap="http://www.successfactors.com/edm/sap">',
           '  <edmx:DataServices m:DataServiceVersion="2.0">',
           '    <Schema Namespace="SFOData" xmlns="http://schemas.microsoft.com/ado/2008/09/edm">']
    for name, (_, lja, len_, keys, props) in ENT.items():
        lab = lja if lang == "ja" else len_
        out.append(f'      <EntityType Name="{name}" sap:label={quoteattr(lab)}>')
        out.append('        <Key>' + ''.join(f'<PropertyRef Name="{k}"/>' for k in keys) + '</Key>')
        for p in props:
            pn, t, req, pja, pen, pl, _ = p
            plab = pja if lang == "ja" else pen
            a = f'Name="{pn}" Type="{t}" Nullable="{"false" if req else "true"}" sap:required="{"true" if req else "false"}" sap:label={quoteattr(plab)}'
            if t == S: a += ' MaxLength="128"'
            if pl: a += f' sap:picklist="{pl}"'
            out.append(f'        <Property {a}/>')
        out.append('      </EntityType>')
    out.append('      <EntityContainer Name="EntityContainer" m:IsDefaultEntityContainer="true">')
    for name in ENT:
        out.append(f'        <EntitySet Name="{name}" EntityType="SFOData.{name}"/>')
    out += ['      </EntityContainer>', '    </Schema>', '  </edmx:DataServices>', '</edmx:Edmx>']
    return "\n".join(out)

for lang in ("ja", "en"):
    open(f"{OUT}/metadata_{lang}.xml", "w", encoding="utf-8").write(metadata(lang))

PL = {
 "event": [("H","入社","Hire"),("R","再入社","Rehire"),("5","職務変更","Job Change"),("PRM","昇進・昇格","Promotion"),("DEM","降格","Demotion"),("TRN","異動","Transfer"),("9","データ変更","Data Change"),("LOA","休職","Leave of Absence"),("RTW","復職","Return to Work"),("26","退職","Termination")],
 "employeeclass": [("1","正社員","Regular"),("2","契約社員","Fixed-term"),("3","嘱託社員","Re-employed Senior"),("4","パートタイマー","Part-time")],
 "employmentType": [("FT","フルタイム","Full Time"),("PT","パートタイム","Part Time")],
 "employee-status": [("A","在籍","Active"),("U","休職中","Unpaid Leave"),("T","退職","Terminated")],
 "GENDER": [("M","男性","Male"),("F","女性","Female"),("O","その他","Other"),("U","未回答","Undeclared")],
 "ecMaritalStatus": [("S","独身","Single"),("M","既婚","Married")],
 "status": [("A","有効","Active"),("I","無効","Inactive")],
 "JP_HRCategory": [("G","総合職","Career Track"),("A","一般職","Clerical Track"),("S","専門職","Specialist Track")],
 "JP_AppraisalRank": [("S","S","S"),("A","A","A"),("B","B","B"),("C","C","C"),("D","D","D")],
 "JP_Position": [("NONE","なし","None"),("CHIEF","主任","Chief"),("MGR","課長","Manager"),("SMGR","部長","Senior Manager"),("EXE","本部長","Executive")],
 "JP_PromotionType": [("REG","定期昇格","Regular Promotion"),("SPC","抜擢昇格","Special Promotion"),("EXM","試験昇格","Exam-based Promotion")],
 "JP_Qualification": [("BOKI2","日商簿記2級","Bookkeeping Level 2"),("TOEIC800","TOEIC 800点以上","TOEIC 800+"),("SR","社会保険労務士","Labor and Social Security Attorney"),("PMP","PMP","PMP")],
}
pl_json = {"d": {"results": [
    {"id": pid, "status": "ACTIVE", "values": {"results": [
        {"optionId": f"{zlib.crc32((pid+c).encode())%90000+10000}", "externalCode": c, "status": "ACTIVE",
         "label_ja_JP": ja, "label_en_US": en, "label_defaultValue": en}
        for c, ja, en in vals]}}
    for pid, vals in PL.items()]}}
json.dump(pl_json, open(f"{OUT}/picklists.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

ER = [("HIRNEW","H","新卒入社","New Graduate Hire"),("HIRMID","H","中途入社","Experienced Hire"),("REHIRE","R","再雇用","Rehire after Retirement"),
      ("PRM_REG","PRM","定期昇格","Regular Promotion"),("PRM_SPC","PRM","抜擢昇格","Special Promotion"),("PRM_TTL","PRM","役職昇進","Title Promotion"),
      ("DEM_GRD","DEM","降格","Grade Demotion"),("JOB_CHG","5","職務変更","Job Change"),("TRN_INT","TRN","社内異動","Internal Transfer"),
      ("TRN_SEC","TRN","出向","Secondment"),("TRN_RTN","TRN","出向復帰","Return from Secondment"),("DATA_COR","9","データ修正","Data Correction"),
      ("PROB_END","9","試用期間終了","Probation Completed"),("LOA_SICK","LOA","私傷病休職","Sick Leave"),("LOA_CARE","LOA","育児休業","Childcare Leave"),
      ("RTW","RTW","復職","Return to Work"),("TER_VOL","26","自己都合退職","Voluntary Resignation"),("TER_INV","26","会社都合退職","Involuntary Termination"),
      ("TER_RET","26","定年退職","Retirement"),("PRM_OLD","PRM","昇格（旧制度）","Promotion (Legacy)")]
er_json = {"d": {"results": [
    {"externalCode": c, "startDate": "/Date(946684800000)/", "event": ev, "status": "I" if c == "PRM_OLD" else "A",
     "name_ja_JP": ja, "name_en_US": en, "name_defaultValue": en} for c, ev, ja, en in ER]}}
json.dump(er_json, open(f"{OUT}/event_reasons.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

dm = ['<?xml version="1.0" encoding="UTF-8"?>',
      '<!-- DEMO DATA: simplified Succession Data Model for fictional tenant "Demo Corp". Not from any real customer. -->',
      '<succession-data-model>']
for name, (hris, lja, len_, _, props) in ENT.items():
    if not hris: continue
    dm.append(f'  <hris-element id="{hris}" odata-entity="{name}">')
    dm.append(f'    <label>{len_}</label><label xml:lang="ja-JP">{lja}</label>')
    for pn, t, req, pja, pen, pl, hid in props:
        a = f'id="{hid}" odata-property="{pn}" visibility="both" required="{"true" if req else "false"}"'
        if pl: a += f' picklist-id="{pl}"'
        dm.append(f'    <hris-field {a}><label>{pen}</label><label xml:lang="ja-JP">{pja}</label></hris-field>')
    dm.append('  </hris-element>')
dm.append('</succession-data-model>')
open(f"{OUT}/data_model_demo.xml", "w", encoding="utf-8").write("\n".join(dm))

nf = sum(len(v[4]) for v in ENT.values())
npl = sum(len(v) for v in PL.values())
print(len(ENT), "entities,", nf, "fields,", len(PL), "picklists,", npl, "values,", len(ER), "event reasons")
