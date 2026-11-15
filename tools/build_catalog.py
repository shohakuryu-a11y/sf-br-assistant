"""テナントのメタデータから data/catalog.js を作る。

使い方（リポジトリのルートで実行）:
    python3 tools/build_catalog.py                 # demo_data を読む
    python3 tools/build_catalog.py path/to/dir     # 別のテナントのフォルダを読む

入力フォルダに必要なファイル:
    metadata_ja.xml, metadata_en.xml   OData $metadata（日本語・英語ラベル）
    picklists.json                     PickListV2 と値
    event_reasons.json                 FOEventReason
    overlay.json                       オブジェクト区分、ナビゲーション、説明、同義語、型の補正
"""
import datetime
import json
import pathlib
import sys
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "demo_data"
OUT = ROOT / "data" / "catalog.js"

EDM = "{http://schemas.microsoft.com/ado/2008/09/edm}"
SAP = "{http://www.successfactors.com/edm/sap}"
TYPE_MAP = {
    "Edm.String": "string", "Edm.DateTime": "date", "Edm.DateTimeOffset": "date",
    "Edm.Boolean": "boolean", "Edm.Int32": "number", "Edm.Int64": "number",
    "Edm.Decimal": "number", "Edm.Double": "number",
}


def read_metadata(path):
    entities = {}
    for et in ET.parse(path).getroot().iter(EDM + "EntityType"):
        props = {}
        for p in et.iter(EDM + "Property"):
            props[p.get("Name")] = {
                "label": p.get(SAP + "label", p.get("Name")),
                "edm": p.get("Type"),
                "picklist": p.get(SAP + "picklist"),
                "required": p.get(SAP + "required") == "true",
            }
        entities[et.get("Name")] = {"label": et.get(SAP + "label", et.get("Name")), "props": props}
    return entities


def main():
    ja = read_metadata(SRC / "metadata_ja.xml")
    en = read_metadata(SRC / "metadata_en.xml")
    overlay = json.loads((SRC / "overlay.json").read_text(encoding="utf-8"))

    objects = {}
    for name, ent in ja.items():
        fields = {}
        for fname, p in ent["props"].items():
            ref = f"{name}.{fname}"
            ftype = overlay.get("types", {}).get(ref)
            if not ftype:
                ftype = "picklist" if p["picklist"] else TYPE_MAP.get(p["edm"], "string")
            extra = overlay.get("fields", {}).get(ref, {})
            f = {
                "label": p["label"],
                "en": en.get(name, {}).get("props", {}).get(fname, {}).get("label", p["label"]),
                "type": ftype,
            }
            if ftype == "picklist":
                f["picklist"] = p["picklist"]
            if p["required"]:
                f["required"] = True
            if extra.get("desc"):
                f["desc"] = extra["desc"]
            if extra.get("syn"):
                f["syn"] = extra["syn"]
            fields[fname] = f
        objects[name] = {
            "label": ent["label"],
            "en": en.get(name, {}).get("label", ent["label"]),
            "kind": overlay.get("kinds", {}).get(name, "EC"),
            "nav": overlay.get("nav", {}).get(name, []),
            "fields": fields,
        }

    picklists = {}
    for pl in json.loads((SRC / "picklists.json").read_text(encoding="utf-8"))["d"]["results"]:
        picklists[pl["id"]] = {
            v["externalCode"]: {"ja": v.get("label_ja_JP", v["externalCode"]),
                                "en": v.get("label_en_US", v["externalCode"]),
                                "status": "A" if v.get("status") == "ACTIVE" else "I"}
            for v in pl["values"]["results"]
        }

    reasons = {}
    for r in json.loads((SRC / "event_reasons.json").read_text(encoding="utf-8"))["d"]["results"]:
        reasons[r["externalCode"]] = {"event": r["event"], "ja": r.get("name_ja_JP", r["externalCode"]),
                                      "en": r.get("name_en_US", r["externalCode"]), "status": r["status"]}

    catalog = {
        "tenant": overlay.get("tenant", "Tenant"),
        "version": datetime.date.today().isoformat(),
        "objects": objects,
        "picklists": picklists,
        "eventReasons": reasons,
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(
        "// 項目カタログ（同期レイヤー）。tools/build_catalog.py で生成。直接編集してもよい。\n"
        "window.BR_CATALOG = " + json.dumps(catalog, ensure_ascii=False, indent=1) + ";\n",
        encoding="utf-8",
    )
    n = sum(len(o["fields"]) for o in objects.values())
    print(f"{OUT.relative_to(ROOT)}: {len(objects)} objects, {n} fields, "
          f"{len(picklists)} picklists, {len(reasons)} event reasons")


if __name__ == "__main__":
    main()
