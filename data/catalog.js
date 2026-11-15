// 項目カタログ（同期レイヤー）。tools/build_catalog.py で生成。直接編集してもよい。
window.BR_CATALOG = {
 "tenant": "Demo Corp",
 "version": "2026-11-08",
 "objects": {
  "EmpJob": {
   "label": "職務情報",
   "en": "Job Information",
   "kind": "EC",
   "nav": [
    "EmpEmployment",
    "PerPerson",
    "FOEventReason",
    "FOPayGrade",
    "FODepartment"
   ],
   "fields": {
    "userId": {
     "label": "ユーザーID",
     "en": "User ID",
     "type": "string",
     "required": true
    },
    "startDate": {
     "label": "発令日",
     "en": "Event Date",
     "type": "date",
     "required": true,
     "desc": "この職務情報レコードの有効開始日",
     "syn": [
      "有効日",
      "効力発生日",
      "effective date"
     ]
    },
    "endDate": {
     "label": "終了日",
     "en": "End Date",
     "type": "date"
    },
    "seqNumber": {
     "label": "連番",
     "en": "Sequence Number",
     "type": "number",
     "required": true
    },
    "event": {
     "label": "イベント",
     "en": "Event",
     "type": "picklist",
     "picklist": "event",
     "required": true,
     "desc": "人事イベントの種類（入社、昇進・昇格、異動、退職など）",
     "syn": [
      "人事イベント"
     ]
    },
    "eventReason": {
     "label": "イベント事由",
     "en": "Event Reason",
     "type": "eventReason",
     "required": true,
     "desc": "人事イベントの理由。値は FOEventReason から取得",
     "syn": [
      "発令事由",
      "異動理由",
      "事由"
     ]
    },
    "company": {
     "label": "会社",
     "en": "Company",
     "type": "string",
     "required": true
    },
    "businessUnit": {
     "label": "事業本部",
     "en": "Business Unit",
     "type": "string"
    },
    "division": {
     "label": "事業部",
     "en": "Division",
     "type": "string"
    },
    "department": {
     "label": "部署",
     "en": "Department",
     "type": "string"
    },
    "location": {
     "label": "勤務地",
     "en": "Location",
     "type": "string"
    },
    "jobCode": {
     "label": "職務コード",
     "en": "Job Classification",
     "type": "string"
    },
    "jobTitle": {
     "label": "職務名",
     "en": "Job Title",
     "type": "string"
    },
    "payGrade": {
     "label": "等級",
     "en": "Pay Grade",
     "type": "string",
     "desc": "等級。値は FOPayGrade から取得",
     "syn": [
      "グレード",
      "職位等級"
     ]
    },
    "managerId": {
     "label": "上長",
     "en": "Supervisor",
     "type": "string"
    },
    "employeeClass": {
     "label": "社員区分",
     "en": "Employee Class",
     "type": "picklist",
     "picklist": "employeeclass",
     "syn": [
      "雇用区分",
      "社員種別"
     ]
    },
    "employmentType": {
     "label": "雇用形態",
     "en": "Employment Type",
     "type": "picklist",
     "picklist": "employmentType"
    },
    "emplStatus": {
     "label": "在籍ステータス",
     "en": "Employee Status",
     "type": "picklist",
     "picklist": "employee-status"
    },
    "standardHours": {
     "label": "所定労働時間（週）",
     "en": "Standard Weekly Hours",
     "type": "number"
    },
    "fte": {
     "label": "FTE",
     "en": "FTE",
     "type": "number"
    },
    "probationPeriodEndDate": {
     "label": "試用期間終了日",
     "en": "Probation Period End Date",
     "type": "date",
     "desc": "試用期間の最終日",
     "syn": [
      "試用期間満了日",
      "試用終了日"
     ]
    },
    "customString1": {
     "label": "人事区分",
     "en": "HR Category",
     "type": "picklist",
     "picklist": "JP_HRCategory"
    },
    "customString2": {
     "label": "評価ランク",
     "en": "Appraisal Rank",
     "type": "picklist",
     "picklist": "JP_AppraisalRank"
    },
    "customString3": {
     "label": "役職",
     "en": "Managerial Title",
     "type": "picklist",
     "picklist": "JP_Position",
     "desc": "管理職の役職。値は picklist JP_Position から取得",
     "syn": [
      "ポスト",
      "管理職",
      "職位"
     ]
    },
    "customDate1": {
     "label": "最終等級変更日",
     "en": "Last Grade Change Date",
     "type": "date",
     "desc": "等級が最後に変更された日付（カスタム項目）",
     "syn": [
      "等級変更日",
      "grade change"
     ]
    },
    "customDate2": {
     "label": "役職任命日",
     "en": "Title Appointment Date",
     "type": "date",
     "desc": "現在の役職に任命された日",
     "syn": [
      "役職発令日"
     ]
    },
    "customDate3": {
     "label": "出向開始日",
     "en": "Secondment Start Date",
     "type": "date",
     "desc": "出向を開始した日",
     "syn": [
      "出向日"
     ]
    },
    "customLong1": {
     "label": "等級在籍年数",
     "en": "Years in Grade",
     "type": "number",
     "desc": "現在の等級での在籍年数",
     "syn": [
      "等級滞留年数"
     ]
    },
    "customBoolean1": {
     "label": "裁量労働対象",
     "en": "Discretionary Work Flag",
     "type": "boolean",
     "desc": "裁量労働制の対象者かどうか",
     "syn": [
      "裁量労働",
      "裁量労働制",
      "みなし労働"
     ]
    }
   }
  },
  "EmpEmployment": {
   "label": "雇用情報",
   "en": "Employment Details",
   "kind": "EC",
   "nav": [
    "PerPerson"
   ],
   "fields": {
    "personIdExternal": {
     "label": "個人ID",
     "en": "Person ID",
     "type": "string",
     "required": true
    },
    "userId": {
     "label": "ユーザーID",
     "en": "User ID",
     "type": "string",
     "required": true
    },
    "startDate": {
     "label": "入社日",
     "en": "Hire Date",
     "type": "date",
     "required": true,
     "desc": "この会社への入社日",
     "syn": [
      "入社年月日",
      "hire date"
     ]
    },
    "originalStartDate": {
     "label": "当初入社日",
     "en": "Original Start Date",
     "type": "date",
     "desc": "最初に入社した日（再雇用前を含む）",
     "syn": [
      "初回入社日"
     ]
    },
    "seniorityDate": {
     "label": "勤続起算日",
     "en": "Seniority Start Date",
     "type": "date"
    },
    "endDate": {
     "label": "退職日",
     "en": "Termination Date",
     "type": "date",
     "desc": "退職日",
     "syn": [
      "離職日"
     ]
    },
    "lastDateWorked": {
     "label": "最終勤務日",
     "en": "Last Date Worked",
     "type": "date"
    },
    "isContingentWorker": {
     "label": "外部人材",
     "en": "Is Contingent Worker",
     "type": "boolean"
    },
    "customDate1": {
     "label": "グループ入社日",
     "en": "Group Hire Date",
     "type": "date",
     "desc": "グループ会社に最初に入社した日",
     "syn": [
      "グループ入社年月日"
     ]
    },
    "customDate2": {
     "label": "定年到達日",
     "en": "Retirement Age Date",
     "type": "date",
     "desc": "定年年齢に到達する日",
     "syn": [
      "定年日",
      "定年年月日"
     ]
    }
   }
  },
  "PerPerson": {
   "label": "個人情報（基本）",
   "en": "Biographical Information",
   "kind": "EC",
   "nav": [],
   "fields": {
    "personIdExternal": {
     "label": "個人ID",
     "en": "Person ID",
     "type": "string",
     "required": true
    },
    "dateOfBirth": {
     "label": "生年月日",
     "en": "Date Of Birth",
     "type": "date",
     "desc": "生年月日",
     "syn": [
      "誕生日",
      "birthday"
     ]
    },
    "countryOfBirth": {
     "label": "出生国",
     "en": "Country Of Birth",
     "type": "string"
    }
   }
  },
  "PerPersonal": {
   "label": "個人情報",
   "en": "Personal Information",
   "kind": "EC",
   "nav": [],
   "fields": {
    "personIdExternal": {
     "label": "個人ID",
     "en": "Person ID",
     "type": "string",
     "required": true
    },
    "startDate": {
     "label": "有効開始日",
     "en": "Start Date",
     "type": "date",
     "required": true
    },
    "lastName": {
     "label": "姓",
     "en": "Last Name",
     "type": "string",
     "required": true
    },
    "firstName": {
     "label": "名",
     "en": "First Name",
     "type": "string",
     "required": true
    },
    "lastNameAlt1": {
     "label": "姓（カナ）",
     "en": "Last Name (Kana)",
     "type": "string"
    },
    "firstNameAlt1": {
     "label": "名（カナ）",
     "en": "First Name (Kana)",
     "type": "string"
    },
    "gender": {
     "label": "性別",
     "en": "Gender",
     "type": "picklist",
     "picklist": "GENDER"
    },
    "maritalStatus": {
     "label": "婚姻状況",
     "en": "Marital Status",
     "type": "picklist",
     "picklist": "ecMaritalStatus"
    },
    "nationality": {
     "label": "国籍",
     "en": "Nationality",
     "type": "string"
    }
   }
  },
  "EmpCompensation": {
   "label": "報酬情報",
   "en": "Compensation Information",
   "kind": "EC",
   "nav": [
    "EmpEmployment",
    "PerPerson",
    "FOEventReason"
   ],
   "fields": {
    "userId": {
     "label": "ユーザーID",
     "en": "User ID",
     "type": "string",
     "required": true
    },
    "startDate": {
     "label": "発令日",
     "en": "Event Date",
     "type": "date",
     "required": true
    },
    "seqNumber": {
     "label": "連番",
     "en": "Sequence Number",
     "type": "number",
     "required": true
    },
    "event": {
     "label": "イベント",
     "en": "Event",
     "type": "picklist",
     "picklist": "event",
     "required": true
    },
    "eventReason": {
     "label": "イベント事由",
     "en": "Event Reason",
     "type": "eventReason",
     "required": true
    },
    "payGroup": {
     "label": "給与グループ",
     "en": "Pay Group",
     "type": "string"
    },
    "isEligibleForBenefit": {
     "label": "福利厚生対象",
     "en": "Benefits Eligible",
     "type": "boolean"
    }
   }
  },
  "EmpPayCompRecurring": {
   "label": "定期報酬",
   "en": "Recurring Pay Component",
   "kind": "EC",
   "nav": [
    "EmpCompensation"
   ],
   "fields": {
    "userId": {
     "label": "ユーザーID",
     "en": "User ID",
     "type": "string",
     "required": true
    },
    "startDate": {
     "label": "発令日",
     "en": "Event Date",
     "type": "date",
     "required": true
    },
    "seqNumber": {
     "label": "連番",
     "en": "Sequence Number",
     "type": "number",
     "required": true
    },
    "payComponent": {
     "label": "報酬項目",
     "en": "Pay Component",
     "type": "string",
     "required": true
    },
    "paycompvalue": {
     "label": "金額",
     "en": "Amount",
     "type": "number",
     "required": true
    },
    "currencyCode": {
     "label": "通貨",
     "en": "Currency",
     "type": "string",
     "required": true
    },
    "frequency": {
     "label": "頻度",
     "en": "Frequency",
     "type": "string",
     "required": true
    }
   }
  },
  "FOEventReason": {
   "label": "イベント事由",
   "en": "Event Reason",
   "kind": "Foundation",
   "nav": [],
   "fields": {
    "externalCode": {
     "label": "コード",
     "en": "Code",
     "type": "string",
     "required": true
    },
    "startDate": {
     "label": "有効開始日",
     "en": "Start Date",
     "type": "date",
     "required": true
    },
    "name": {
     "label": "名称",
     "en": "Name",
     "type": "string",
     "required": true
    },
    "event": {
     "label": "イベント",
     "en": "Event",
     "type": "picklist",
     "picklist": "event",
     "required": true
    },
    "status": {
     "label": "ステータス",
     "en": "Status",
     "type": "picklist",
     "picklist": "status",
     "required": true
    }
   }
  },
  "FOPayGrade": {
   "label": "等級",
   "en": "Pay Grade",
   "kind": "Foundation",
   "nav": [],
   "fields": {
    "externalCode": {
     "label": "コード",
     "en": "Code",
     "type": "string",
     "required": true
    },
    "startDate": {
     "label": "有効開始日",
     "en": "Start Date",
     "type": "date",
     "required": true
    },
    "name": {
     "label": "名称",
     "en": "Name",
     "type": "string",
     "required": true
    },
    "paygradeLevel": {
     "label": "等級レベル",
     "en": "Pay Grade Level",
     "type": "number"
    },
    "status": {
     "label": "ステータス",
     "en": "Status",
     "type": "picklist",
     "picklist": "status",
     "required": true
    }
   }
  },
  "FODepartment": {
   "label": "部署",
   "en": "Department",
   "kind": "Foundation",
   "nav": [],
   "fields": {
    "externalCode": {
     "label": "コード",
     "en": "Code",
     "type": "string",
     "required": true
    },
    "startDate": {
     "label": "有効開始日",
     "en": "Start Date",
     "type": "date",
     "required": true
    },
    "name": {
     "label": "名称",
     "en": "Name",
     "type": "string",
     "required": true
    },
    "headOfUnit": {
     "label": "部署長",
     "en": "Head of Unit",
     "type": "string"
    },
    "status": {
     "label": "ステータス",
     "en": "Status",
     "type": "picklist",
     "picklist": "status",
     "required": true
    }
   }
  },
  "cust_PromotionHistory": {
   "label": "昇進昇格履歴",
   "en": "Promotion History",
   "kind": "MDF",
   "nav": [
    "FOPayGrade"
   ],
   "fields": {
    "externalCode": {
     "label": "コード",
     "en": "Code",
     "type": "string",
     "required": true
    },
    "effectiveStartDate": {
     "label": "有効開始日",
     "en": "Effective Start Date",
     "type": "date",
     "required": true,
     "desc": "昇進・昇格の発令日",
     "syn": [
      "昇格日"
     ]
    },
    "cust_user": {
     "label": "対象者",
     "en": "Employee",
     "type": "string",
     "required": true
    },
    "cust_fromGrade": {
     "label": "変更前等級",
     "en": "Previous Grade",
     "type": "string"
    },
    "cust_toGrade": {
     "label": "変更後等級",
     "en": "New Grade",
     "type": "string"
    },
    "cust_promotionType": {
     "label": "昇格区分",
     "en": "Promotion Type",
     "type": "picklist",
     "picklist": "JP_PromotionType"
    },
    "cust_approvedDate": {
     "label": "承認日",
     "en": "Approval Date",
     "type": "date"
    }
   }
  },
  "cust_Qualification": {
   "label": "保有資格",
   "en": "Qualification",
   "kind": "MDF",
   "nav": [],
   "fields": {
    "externalCode": {
     "label": "コード",
     "en": "Code",
     "type": "string",
     "required": true
    },
    "effectiveStartDate": {
     "label": "有効開始日",
     "en": "Effective Start Date",
     "type": "date",
     "required": true
    },
    "cust_user": {
     "label": "対象者",
     "en": "Employee",
     "type": "string",
     "required": true
    },
    "cust_qualification": {
     "label": "資格",
     "en": "Qualification",
     "type": "picklist",
     "picklist": "JP_Qualification",
     "required": true
    },
    "cust_acquiredDate": {
     "label": "取得日",
     "en": "Acquired Date",
     "type": "date",
     "desc": "資格を取得した日",
     "syn": [
      "資格取得日"
     ]
    },
    "cust_expiryDate": {
     "label": "有効期限",
     "en": "Expiry Date",
     "type": "date"
    },
    "cust_allowanceEligible": {
     "label": "資格手当対象",
     "en": "Allowance Eligible",
     "type": "boolean"
    }
   }
  }
 },
 "picklists": {
  "event": {
   "H": {
    "ja": "入社",
    "en": "Hire",
    "status": "A"
   },
   "R": {
    "ja": "再入社",
    "en": "Rehire",
    "status": "A"
   },
   "5": {
    "ja": "職務変更",
    "en": "Job Change",
    "status": "A"
   },
   "PRM": {
    "ja": "昇進・昇格",
    "en": "Promotion",
    "status": "A"
   },
   "DEM": {
    "ja": "降格",
    "en": "Demotion",
    "status": "A"
   },
   "TRN": {
    "ja": "異動",
    "en": "Transfer",
    "status": "A"
   },
   "9": {
    "ja": "データ変更",
    "en": "Data Change",
    "status": "A"
   },
   "LOA": {
    "ja": "休職",
    "en": "Leave of Absence",
    "status": "A"
   },
   "RTW": {
    "ja": "復職",
    "en": "Return to Work",
    "status": "A"
   },
   "26": {
    "ja": "退職",
    "en": "Termination",
    "status": "A"
   }
  },
  "employeeclass": {
   "1": {
    "ja": "正社員",
    "en": "Regular",
    "status": "A"
   },
   "2": {
    "ja": "契約社員",
    "en": "Fixed-term",
    "status": "A"
   },
   "3": {
    "ja": "嘱託社員",
    "en": "Re-employed Senior",
    "status": "A"
   },
   "4": {
    "ja": "パートタイマー",
    "en": "Part-time",
    "status": "A"
   }
  },
  "employmentType": {
   "FT": {
    "ja": "フルタイム",
    "en": "Full Time",
    "status": "A"
   },
   "PT": {
    "ja": "パートタイム",
    "en": "Part Time",
    "status": "A"
   }
  },
  "employee-status": {
   "A": {
    "ja": "在籍",
    "en": "Active",
    "status": "A"
   },
   "U": {
    "ja": "休職中",
    "en": "Unpaid Leave",
    "status": "A"
   },
   "T": {
    "ja": "退職",
    "en": "Terminated",
    "status": "A"
   }
  },
  "GENDER": {
   "M": {
    "ja": "男性",
    "en": "Male",
    "status": "A"
   },
   "F": {
    "ja": "女性",
    "en": "Female",
    "status": "A"
   },
   "O": {
    "ja": "その他",
    "en": "Other",
    "status": "A"
   },
   "U": {
    "ja": "未回答",
    "en": "Undeclared",
    "status": "A"
   }
  },
  "ecMaritalStatus": {
   "S": {
    "ja": "独身",
    "en": "Single",
    "status": "A"
   },
   "M": {
    "ja": "既婚",
    "en": "Married",
    "status": "A"
   }
  },
  "status": {
   "A": {
    "ja": "有効",
    "en": "Active",
    "status": "A"
   },
   "I": {
    "ja": "無効",
    "en": "Inactive",
    "status": "A"
   }
  },
  "JP_HRCategory": {
   "G": {
    "ja": "総合職",
    "en": "Career Track",
    "status": "A"
   },
   "A": {
    "ja": "一般職",
    "en": "Clerical Track",
    "status": "A"
   },
   "S": {
    "ja": "専門職",
    "en": "Specialist Track",
    "status": "A"
   }
  },
  "JP_AppraisalRank": {
   "S": {
    "ja": "S",
    "en": "S",
    "status": "A"
   },
   "A": {
    "ja": "A",
    "en": "A",
    "status": "A"
   },
   "B": {
    "ja": "B",
    "en": "B",
    "status": "A"
   },
   "C": {
    "ja": "C",
    "en": "C",
    "status": "A"
   },
   "D": {
    "ja": "D",
    "en": "D",
    "status": "A"
   }
  },
  "JP_Position": {
   "NONE": {
    "ja": "なし",
    "en": "None",
    "status": "A"
   },
   "CHIEF": {
    "ja": "主任",
    "en": "Chief",
    "status": "A"
   },
   "MGR": {
    "ja": "課長",
    "en": "Manager",
    "status": "A"
   },
   "SMGR": {
    "ja": "部長",
    "en": "Senior Manager",
    "status": "A"
   },
   "EXE": {
    "ja": "本部長",
    "en": "Executive",
    "status": "A"
   }
  },
  "JP_PromotionType": {
   "REG": {
    "ja": "定期昇格",
    "en": "Regular Promotion",
    "status": "A"
   },
   "SPC": {
    "ja": "抜擢昇格",
    "en": "Special Promotion",
    "status": "A"
   },
   "EXM": {
    "ja": "試験昇格",
    "en": "Exam-based Promotion",
    "status": "A"
   }
  },
  "JP_Qualification": {
   "BOKI2": {
    "ja": "日商簿記2級",
    "en": "Bookkeeping Level 2",
    "status": "A"
   },
   "TOEIC800": {
    "ja": "TOEIC 800点以上",
    "en": "TOEIC 800+",
    "status": "A"
   },
   "SR": {
    "ja": "社会保険労務士",
    "en": "Labor and Social Security Attorney",
    "status": "A"
   },
   "PMP": {
    "ja": "PMP",
    "en": "PMP",
    "status": "A"
   }
  }
 },
 "eventReasons": {
  "HIRNEW": {
   "event": "H",
   "ja": "新卒入社",
   "en": "New Graduate Hire",
   "status": "A"
  },
  "HIRMID": {
   "event": "H",
   "ja": "中途入社",
   "en": "Experienced Hire",
   "status": "A"
  },
  "REHIRE": {
   "event": "R",
   "ja": "再雇用",
   "en": "Rehire after Retirement",
   "status": "A"
  },
  "PRM_REG": {
   "event": "PRM",
   "ja": "定期昇格",
   "en": "Regular Promotion",
   "status": "A"
  },
  "PRM_SPC": {
   "event": "PRM",
   "ja": "抜擢昇格",
   "en": "Special Promotion",
   "status": "A"
  },
  "PRM_TTL": {
   "event": "PRM",
   "ja": "役職昇進",
   "en": "Title Promotion",
   "status": "A"
  },
  "DEM_GRD": {
   "event": "DEM",
   "ja": "降格",
   "en": "Grade Demotion",
   "status": "A"
  },
  "JOB_CHG": {
   "event": "5",
   "ja": "職務変更",
   "en": "Job Change",
   "status": "A"
  },
  "TRN_INT": {
   "event": "TRN",
   "ja": "社内異動",
   "en": "Internal Transfer",
   "status": "A"
  },
  "TRN_SEC": {
   "event": "TRN",
   "ja": "出向",
   "en": "Secondment",
   "status": "A"
  },
  "TRN_RTN": {
   "event": "TRN",
   "ja": "出向復帰",
   "en": "Return from Secondment",
   "status": "A"
  },
  "DATA_COR": {
   "event": "9",
   "ja": "データ修正",
   "en": "Data Correction",
   "status": "A"
  },
  "PROB_END": {
   "event": "9",
   "ja": "試用期間終了",
   "en": "Probation Completed",
   "status": "A"
  },
  "LOA_SICK": {
   "event": "LOA",
   "ja": "私傷病休職",
   "en": "Sick Leave",
   "status": "A"
  },
  "LOA_CARE": {
   "event": "LOA",
   "ja": "育児休業",
   "en": "Childcare Leave",
   "status": "A"
  },
  "RTW": {
   "event": "RTW",
   "ja": "復職",
   "en": "Return to Work",
   "status": "A"
  },
  "TER_VOL": {
   "event": "26",
   "ja": "自己都合退職",
   "en": "Voluntary Resignation",
   "status": "A"
  },
  "TER_INV": {
   "event": "26",
   "ja": "会社都合退職",
   "en": "Involuntary Termination",
   "status": "A"
  },
  "TER_RET": {
   "event": "26",
   "ja": "定年退職",
   "en": "Retirement",
   "status": "A"
  },
  "PRM_OLD": {
   "event": "PRM",
   "ja": "昇格（旧制度）",
   "en": "Promotion (Legacy)",
   "status": "I"
  }
 }
};
