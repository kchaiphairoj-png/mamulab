# เก็บ Lead เข้า Google Sheets (ฟรี ไม่มี API ภายนอก)

วิธีนี้ใช้ **Google Apps Script** เป็น webhook กลาง — `/api/lead` ของเราจะ POST ข้อมูลเข้าไป แล้ว script จะเขียนลง Sheet ให้

## ขั้นตอน

### 1. สร้าง Google Sheet

1. เปิด https://sheets.google.com → New blank spreadsheet
2. ตั้งชื่อ เช่น `MAMULAB Leads`
3. แถวแรก (row 1) ใส่ header: `Timestamp | Name | Email | Consent | Source`

### 2. เปิด Apps Script ของ Sheet นั้น

1. เมนู **Extensions → Apps Script**
2. ลบโค้ดเดิมออก แล้ววางโค้ดด้านล่าง:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.consent ? "yes" : "no",
      data.source || "",
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. บันทึก (Ctrl+S) ตั้งชื่อ project ตามใจ

### 3. Deploy เป็น Web App

1. กด **Deploy → New deployment**
2. เลือก type: **Web app**
3. ตั้งค่า:
   - Description: `MAMULAB lead webhook`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. กด **Deploy** → อนุญาตสิทธิ์ตามที่ Google ขอ
5. คัดลอก **Web app URL** (เช่น `https://script.google.com/macros/s/AKfy.../exec`)

### 4. ใส่ใน Vercel Environment Variables

ที่ Vercel project → **Settings → Environment Variables** เพิ่ม:

```
LEAD_WEBHOOK_URL = https://script.google.com/macros/s/AKfy.../exec
```

หรือถ้ารัน local ใส่ใน `.env.local`:

```
LEAD_WEBHOOK_URL=https://script.google.com/macros/s/AKfy.../exec
```

### 5. Redeploy

Vercel จะ redeploy อัตโนมัติเมื่อแก้ env var (หรือกด Redeploy เอง)

## ทดสอบ

กรอกฟอร์มในเว็บ → ตรวจที่ Sheet จะเห็น row ใหม่เข้ามา

## ทางเลือกอื่น

`LEAD_WEBHOOK_URL` รับ URL ใดก็ได้ที่ accept JSON POST — ใช้กับ:

- **Zapier** webhook → Mailchimp / ConvertKit / Notion / Airtable
- **Make (Integromat)** webhook
- **n8n** self-hosted
- **Notion** ผ่าน Zapier
- **Discord / Slack** webhook (สำหรับการแจ้งเตือนทันที)
