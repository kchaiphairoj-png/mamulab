import {
  H2,
  Lead,
  P,
  Strong,
  Callout,
  NumberBlock,
} from "@/components/member/ArticleParts";

export const meta = {
  slug: "live-calendar-30-days",
  title: "ปฏิทินฤกษ์ Live 30 วัน — Live เวลาเดิมทุกวัน ทำไมยอดต่างกันลิบลับ",
  excerpt:
    "พี่เคย Live ทุกวัน 2 ทุ่ม ติด ๆ กัน 2 เดือน — บางวันยอด 5 หมื่น บางวันแค่ 3 พัน วันเวลาเดิม ของเดิม แต่ ‘จังหวะ’ ของลูกค้าไม่เหมือนกัน",
  category: "Live Commerce",
  readMinutes: 11,
  publishedAt: "2026-05-12",
};

export default function Article() {
  return (
    <>
      <Lead>
        เคยสังเกตมั้ย? Live วันจันทร์ 2 ทุ่ม คนยังเลื่อนเข้ามาดูทักเรื่อย ๆ
        แต่ Live วันศุกร์ 2 ทุ่ม เวลาเดียวกัน คนแค่กดเข้ามาเฉย ๆ ไม่ทัก —
        เพราะลูกค้าวันศุกร์เย็นใจอยู่ที่อื่นแล้ว
      </Lead>

      <P>
        ‘ฤกษ์ Live’ ไม่ใช่เรื่องดวง — เป็นเรื่อง <Strong>จังหวะของลูกค้า</Strong>
        คนเรามีอารมณ์คนละแบบในแต่ละวัน แต่ละช่วงเวลา
        แม้แต่แต่ละช่วงของเดือน — ถ้าจับจังหวะถูก ของเดิมยอดเพิ่มได้เป็นเท่า
      </P>

      <Callout variant="insight">
        ปฏิทิน Live ที่ดี = เอา 3 ปัจจัยมารวมกัน
        <ol className="mt-2 ml-5 list-decimal space-y-1.5">
          <li>วันในสัปดาห์ (วันธรรมดา vs วันหยุด)</li>
          <li>ช่วงของเดือน (ต้น / กลาง / ปลายเดือน)</li>
          <li>เลขวันที่ตรงพลังของเรา (เลขเจ้าของ)</li>
        </ol>
      </Callout>

      <H2>ปัจจัยที่ 1: วันในสัปดาห์ — แต่ละวันคนละพลัง</H2>

      <NumberBlock number={1} title="จันทร์ · พลังเริ่มต้น (ขาย ‘ของใหม่’)">
        <P>
          คนจันทร์ตื่นมาด้วย ‘ตั้งใจใหม่’ — อยากเริ่มดูแลตัวเอง อยาก reset
          เหมาะกับ <Strong>Launch สินค้าใหม่</Strong> เปิดตัวคอลเลกชั่น
          หรือเริ่ม campaign ระยะยาว
        </P>
        <P className="text-sm text-white/65">
          เวลาทอง: 19:30 – 21:00 (คนกินข้าวเย็นเสร็จ ก่อนนอน)
        </P>
      </NumberBlock>

      <NumberBlock number={2} title="อังคาร · พลังตัดสินใจ (ขาย ‘ของช่วยตัดสินใจ’)">
        <P>
          คนอังคารโฟกัสที่งาน คิดเป็นเหตุเป็นผล —
          เหมาะกับ <Strong>คอร์ส / ของฟังก์ชั่น</Strong> ที่ลูกค้าต้องคิดก่อนซื้อ
          ใช้ตัวเลขเยอะ ๆ ในการขาย
        </P>
        <P className="text-sm text-white/65">
          เวลาทอง: 12:00 – 13:00 (พักเที่ยง คนเลื่อนมือถือ)
        </P>
      </NumberBlock>

      <NumberBlock number={3} title="พุธ · พลังสื่อสาร (ขาย ‘ของพูดต่อได้’)">
        <P>
          พุธคือวันคนพูดเก่ง คนแชร์เก่ง — เหมาะกับ
          <Strong> Live สอน / Live demo</Strong> ของที่ลูกค้าไป tag ต่อ
        </P>
        <P className="text-sm text-white/65">
          เวลาทอง: 20:00 – 22:00 (กลางสัปดาห์ เริ่มผ่อนคลาย)
        </P>
      </NumberBlock>

      <NumberBlock number={4} title="พฤหัส · พลังขยาย (ขาย ‘แพ็กเกจใหญ่’)">
        <P>
          พฤหัสคนกล้าจ่ายเงินก้อนใหญ่ — งบเดือนยังมี
          ใกล้สิ้นสัปดาห์ คนอยากปูนบำเหน็จตัวเอง
          เหมาะกับ <Strong>Bundle / Premium / Upsell</Strong>
        </P>
        <P className="text-sm text-white/65">
          เวลาทอง: 20:30 – 22:30 (เริ่มอารมณ์ ‘สุดสัปดาห์’)
        </P>
      </NumberBlock>

      <NumberBlock number={5} title="ศุกร์ · พลังพักผ่อน (ขาย ‘ของฟิน’)">
        <P>
          วันศุกร์เย็นคนใจไม่อยู่กับมือถือ — อยู่กับครอบครัว/เพื่อน
          อย่าเสนอของจริงจัง เสนอ
          <Strong> ของกินของเล่น ของให้รางวัลตัวเอง</Strong>
        </P>
        <P className="text-sm text-white/65">
          เวลาทอง: 17:00 – 18:30 (ก่อนเลิกงานออกบ้าน)
        </P>
        <Callout variant="warning">
          อย่า Live ขายของจริงจังหลัง 19:00 ของวันศุกร์ — คนไม่ฟัง
        </Callout>
      </NumberBlock>

      <NumberBlock number={6} title="เสาร์ · พลังสนุก (ขาย ‘ของแต่งตัว/ของกิน’)">
        <P>
          เสาร์เช้าคนยังอยู่บ้าน เลื่อน feed ก่อนออกไปเที่ยว —
          เหมาะกับ <Strong>Live ที่สนุก โชว์ของ ลองของ</Strong>
        </P>
        <P className="text-sm text-white/65">
          เวลาทอง: 10:00 – 11:30 และ 20:00 – 22:30
        </P>
      </NumberBlock>

      <NumberBlock number={7} title="อาทิตย์ · พลังเตรียมตัว (ขาย ‘ของวางแผน’)">
        <P>
          อาทิตย์เย็นคนเริ่มคิดถึงสัปดาห์หน้า — อยากเตรียมตัว เตรียมของ
          เหมาะกับ <Strong>Subscription / Plan / คอร์ส</Strong>
        </P>
        <P className="text-sm text-white/65">
          เวลาทอง: 19:00 – 21:00 (Sunday evening planning hour)
        </P>
      </NumberBlock>

      <H2>ปัจจัยที่ 2: ช่วงของเดือน — เงินลูกค้าเปลี่ยนทุกสัปดาห์</H2>

      <P>
        เรื่องนี้น้อยคนคิด แต่สำคัญสุด — เงินในกระเป๋าลูกค้าไม่เท่ากันตลอดเดือน
      </P>

      <NumberBlock number={1} title="วันที่ 1-7 · ‘เงินเดือนเพิ่งออก’">
        <P>
          คนกล้าจ่าย — <Strong>Launch ของแพง / ของพรีเมียม</Strong>
          ในสัปดาห์แรกของเดือนได้ผลที่สุด
        </P>
        <P className="text-sm text-white/65">
          ลูกค้าจ่ายเต็มราคา ไม่ต่อ ไม่ลังเล
        </P>
      </NumberBlock>

      <NumberBlock number={2} title="วันที่ 8-15 · ‘เงินยังอยู่ ระวังนิด ๆ’">
        <P>
          ลูกค้าเริ่มคิดมากขึ้น — เป็นช่วงที่ดีของ <Strong>คอร์ส / สินค้าคิดดูแล้วซื้อ</Strong>
          ใช้คอนเทนต์ educate แทนการขายตรง
        </P>
      </NumberBlock>

      <NumberBlock number={3} title="วันที่ 16-23 · ‘กลางเดือน เลือกเฉพาะที่ใช่’">
        <P>
          ลูกค้าระมัดระวัง แต่ <Strong>ลูกค้า ‘เก่า’ ยังซื้อ</Strong> เพราะไว้ใจ
          เน้น remarketing ใน LINE OA / Broadcast ถึงคนที่ซื้อแล้ว
        </P>
      </NumberBlock>

      <NumberBlock number={4} title="วันที่ 24-31 · ‘ปลายเดือน ขายของจำเป็น’">
        <P>
          คนเริ่ม ‘เก็บ’ — Live ตามปกติ แต่<Strong>เสนอของกินของใช้</Strong>
          ของแต่งบ้าน เครื่องสำอาง — ของที่ ‘กินใช้แทนเงินเหลือพอ’
        </P>
        <P className="text-sm text-white/65">
          อย่า Launch ของแพงปลายเดือน — เก็บไว้ทำสัปดาห์แรกหน้า
        </P>
      </NumberBlock>

      <H2>ปัจจัยที่ 3: เลขวันที่ตรงพลังเรา — ‘วันทอง’ ส่วนตัว</H2>

      <P>
        ในเดือนหนึ่งจะมี <Strong>3-4 วัน</Strong> ที่ตรงกับเลขเจ้าของของเรา
        วันนั้นเรา ‘แรง’ ที่สุด — ใช้สำหรับ <em>ของยากที่ต้อง gain คนเชื่อ</em>
      </P>

      <P>
        วิธีหา: เลขเจ้าของ + ทุกวันที่ในเดือนที่ลดเป็นเลขเดียวแล้วได้เลขเจ้าของ
      </P>

      <Callout variant="tip" title="ตัวอย่าง — เลขเจ้าของ 6">
        <P>
          วันที่ตรงเลข 6 ในเดือน = วันที่ 6, 15 (1+5), 24 (2+4)
          → 3 วันต่อเดือน ใช้สำหรับ Launch / Live ใหญ่
        </P>
      </Callout>

      <H2>ปฏิทินตัวอย่าง 30 วัน — สำหรับเลขเจ้าของ 3</H2>

      <P className="text-white/65">
        นี่คือ template — ปรับเลขวันที่ตรงเลขเจ้าของของเราเอง
      </P>

      <div className="my-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.04] text-left">
            <tr>
              <th className="px-4 py-3 text-xs uppercase tracking-widest text-gold-light">
                วัน
              </th>
              <th className="px-4 py-3 text-xs uppercase tracking-widest text-gold-light">
                แนะนำ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/85">
            <tr>
              <td className="px-4 py-3">วันที่ 1 (จันทร์)</td>
              <td className="px-4 py-3">Launch สินค้าใหม่ของเดือน · 20:00</td>
            </tr>
            <tr>
              <td className="px-4 py-3">วันที่ 3 ✨ วันทอง</td>
              <td className="px-4 py-3">Live ใหญ่ premium · 20:30</td>
            </tr>
            <tr>
              <td className="px-4 py-3">วันที่ 6</td>
              <td className="px-4 py-3">Live สนุก ลองของ · 20:00</td>
            </tr>
            <tr>
              <td className="px-4 py-3">วันที่ 12 ✨ วันทอง (1+2=3)</td>
              <td className="px-4 py-3">Live คอร์ส / educate · เที่ยง</td>
            </tr>
            <tr>
              <td className="px-4 py-3">วันที่ 15</td>
              <td className="px-4 py-3">Broadcast LINE OA ลูกค้าเก่า</td>
            </tr>
            <tr>
              <td className="px-4 py-3">วันที่ 21 ✨ วันทอง (2+1=3)</td>
              <td className="px-4 py-3">Live ขาย bundle · 20:30</td>
            </tr>
            <tr>
              <td className="px-4 py-3">วันที่ 27</td>
              <td className="px-4 py-3">Flash sale ของกินของใช้ · เย็น</td>
            </tr>
            <tr>
              <td className="px-4 py-3">วันที่ 30 ✨ วันทอง (3+0=3)</td>
              <td className="px-4 py-3">Recap เดือนนี้ + Tease เดือนหน้า</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>กฎ 3 ข้อ ก่อนเริ่มใช้ปฏิทิน</H2>

      <Callout variant="action">
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            <Strong>เริ่มจาก 7 วันก่อน</Strong> — เลือก 7 วันมา plan ทดลอง
            อย่าเหวี่ยงทั้ง 30 วันในครั้งแรก
          </li>
          <li>
            <Strong>จดยอดทุกครั้ง</Strong> — เก็บใน Notion / Excel แค่ ‘วันที่ + เวลา + ยอด + คนทัก’
            เดือนเดียวจะเห็น pattern ของเพจตัวเอง
          </li>
          <li>
            <Strong>ห้ามเปลี่ยนปฏิทินกลางคัน</Strong> — แม้ยอดวันแรกไม่ดี
            ก็ทำให้ครบรอบ 30 วันก่อน — pattern ค่อยปรากฏ
          </li>
        </ol>
      </Callout>

      <P>
        2 เดือนที่พี่ Live ทุกวัน 2 ทุ่มแบบเดิม ๆ ตอนแรกพี่ก็คิดว่า ‘โชค’
        แต่จดยอดมา 2 เดือน ลอง overlay กับวันในเดือน — pattern โผล่ออกมา
        วันที่ 6, 15, 24 ของพี่ยอดสูงเสมอ (เลขเจ้าของพี่คือ 6)
        ตั้งแต่นั้นพี่ Live ใหญ่เฉพาะ 3 วันนั้นของเดือน — ยอดเพิ่ม 40%
        จำนวน Live ลดลง คุณภาพชีวิตขึ้น
      </P>

      <Callout variant="tip">
        ปฏิทินนี้ไม่ใช่ ‘กฎเหล็ก’ — เป็น ‘สมมุติฐาน’ ที่ทำให้เรามีอะไรไปทดลอง
        แม่ค้าที่เก่งคือคนที่ ‘จดข้อมูลตัวเอง’ แล้วปรับปฏิทินตามที่ ‘เพจของเรา’ บอกจริง
      </Callout>
    </>
  );
}
