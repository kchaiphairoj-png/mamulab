import {
  H2,
  Lead,
  P,
  Strong,
  Callout,
  NumberBlock,
} from "@/components/member/ArticleParts";

export const meta = {
  slug: "monthly-mu-calendar",
  title: "ปฏิทินมูประจำเดือน — ทำอะไรวันไหน · ไม่ควรทำอะไรวันไหน",
  excerpt:
    "ทุกเดือนมีจังหวะ ‘ดี-ไม่ดี’ แบบเดียวกันซ้ำ ๆ — รู้แล้วแม่ค้าจะเลือกทำเฉพาะสิ่งที่ ‘โดน’ จังหวะ ลดเหนื่อย เพิ่มยอด",
  category: "Mindset",
  readMinutes: 10,
  publishedAt: "2026-05-12",
};

export default function Article() {
  return (
    <>
      <Lead>
        ทุกเดือนมีรอบเหมือนกัน — ต้นเดือนคนซื้อง่าย กลางเดือนระวังตัว
        ปลายเดือนเก็บ พี่เห็นมา 4 ปีแล้ว ทำงานสายแม่ค้า ไม่เคยพลาดรอบ
      </Lead>

      <P>
        ‘ปฏิทินมู’ ในบทนี้ไม่ใช่ปฏิทินดูดวง — เป็น
        <Strong>ปฏิทินจังหวะของลูกค้า</Strong> ที่ผสมกับ
        <Strong> เลขศาสตร์</Strong> ที่ช่วยให้เราเลือก<em>ทำ</em>หรือ<em>ไม่ทำ</em>อะไร
        ในแต่ละช่วง
      </P>

      <Callout variant="insight">
        ใช้ปฏิทินนี้แบบไม่งมงาย — เป็น Framework ที่ทำให้เราตัดสินใจเร็วขึ้น
        ‘วันนี้ทำของหนัก vs ของเบา’ — แทนที่จะทำสุ่ม ๆ ตามอารมณ์
      </Callout>

      <H2>ภาพรวม — เดือนแบ่งเป็น 4 ช่วง</H2>

      <div className="my-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.04]">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-widest text-gold-light">
                ช่วง
              </th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-widest text-gold-light">
                ธีม
              </th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-widest text-gold-light">
                ทำอะไรดี
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/85">
            <tr><td className="px-4 py-3">1-7</td><td className="px-4 py-3">เริ่ม</td><td className="px-4 py-3">Launch · เปิดแคมเปญใหม่</td></tr>
            <tr><td className="px-4 py-3">8-15</td><td className="px-4 py-3">ขยาย</td><td className="px-4 py-3">คอนเทนต์สอน · educate</td></tr>
            <tr><td className="px-4 py-3">16-23</td><td className="px-4 py-3">เก็บ</td><td className="px-4 py-3">ดูแลลูกค้าเก่า · upsell</td></tr>
            <tr><td className="px-4 py-3">24-31</td><td className="px-4 py-3">ปิด</td><td className="px-4 py-3">เคลียร์สต็อก · ทบทวน</td></tr>
          </tbody>
        </table>
      </div>

      <H2>ช่วงที่ 1: วันที่ 1-7 · ‘เริ่ม’</H2>

      <NumberBlock number={1} title="ทำสิ่งนี้">
        <P>
          <Strong>Launch สินค้าใหม่ของเดือน</Strong> ในวันที่ 1, 2, หรือ 3 ดีที่สุด
          ลูกค้าเงินเดือนเพิ่งออก พลังใจ ‘เริ่มต้นใหม่’ เต็ม กล้าจ่าย
        </P>
        <P>
          เปิด pre-order Limited Edition ในวันที่ 1 ของเดือน —
          ใช้คำว่า <em>‘ของรุ่นแรกของเดือน’</em> เพิ่ม urgency แบบไม่สแปม
        </P>
      </NumberBlock>

      <NumberBlock number={2} title="หลีกเลี่ยง">
        <P>
          <Strong>อย่าเสนอลดราคา</Strong> ในสัปดาห์แรก —
          คนพร้อมจ่ายเต็ม การลดราคาตอนนี้คือทำลายพลัง
        </P>
        <P>
          <Strong>อย่าทบทวนยอด</Strong> ของเดือนเก่าด้วยใจวิตกในสัปดาห์แรก —
          มันคือพลังพีคของเดือน เอาเวลามาสร้างของใหม่ดีกว่า
        </P>
      </NumberBlock>

      <Callout variant="tip">
        ถ้าเดือนก่อนยอดไม่ดี — สัปดาห์แรกของเดือนใหม่<em>ห้ามลามพลังเก่ามา</em>
        เริ่ม ‘เหมือนกับเดือนแรกในชีวิต’ จะได้ผลลัพธ์ใหม่
      </Callout>

      <H2>ช่วงที่ 2: วันที่ 8-15 · ‘ขยาย’</H2>

      <NumberBlock number={3} title="ทำสิ่งนี้">
        <P>
          <Strong>คอนเทนต์สอน + Educate</Strong> — ลูกค้ากลางเดือนเริ่มคิดมากขึ้น
          ใช้คอนเทนต์ helpful เพื่อให้ ‘คนคิดอยู่ในระบบของเรา’
        </P>
        <P>
          เปิด <Strong>Live สอนฟรี</Strong> หรือ workshop ระยะสั้น —
          ดึงลูกค้าใหม่ที่ ‘ไม่พร้อมซื้อทันที’ เข้ามาในวงโคจร
        </P>
        <P>
          ในวันที่ <Strong>8</Strong> ของเดือน (เลข 8 = พลังเงิน)
          ดีมากสำหรับ Live ขาย premium / upsell
        </P>
      </NumberBlock>

      <NumberBlock number={4} title="หลีกเลี่ยง">
        <P>
          <Strong>อย่ายัดข้อเสนอ</Strong> ตามสัปดาห์ที่สอง — คนเริ่มรู้สึก ‘เหนื่อย’ กับการเสนอ
          ลดความถี่ของ Live ลง 1 ครั้ง เพิ่มคุณภาพแทน
        </P>
        <P>
          <Strong>อย่าเริ่มโครงการใหม่ใหญ่</Strong> ในช่วงนี้ — เก็บไว้สัปดาห์แรกของเดือนหน้า
        </P>
      </NumberBlock>

      <H2>ช่วงที่ 3: วันที่ 16-23 · ‘เก็บ’</H2>

      <NumberBlock number={5} title="ทำสิ่งนี้">
        <P>
          <Strong>ดูแลลูกค้าเก่า</Strong> เป็นพระเอกของช่วงนี้ — Broadcast LINE OA
          ส่งของแถมเล็ก ๆ ทักไถ่ถาม
        </P>
        <P>
          เปิด <Strong>Upsell / Cross-sell</Strong> กับลูกค้าเก่าที่ซื้อแล้ว
          เพราะเขาไว้ใจเราแล้ว ไม่ต้องสร้างความเชื่อใหม่
        </P>
        <P>
          ในวันที่ <Strong>21</Strong> (2+1=3 = พลังสื่อสาร) เหมาะกับ
          ‘Reactivation Campaign’ ลูกค้าที่หายไปนาน — ดึงกลับมา
        </P>
      </NumberBlock>

      <NumberBlock number={6} title="หลีกเลี่ยง">
        <P>
          <Strong>อย่าเสนอของแพงใหม่</Strong> กับลูกค้าใหม่ในช่วงนี้ — เขาระแวง
          เก็บไว้คุยกับลูกค้าเก่าที่รู้จักเราดี
        </P>
        <P>
          <Strong>อย่าโพสต์ของพร่ำเพรื่อ</Strong> 3-4 โพสต์ต่อวัน —
          คนกลางเดือนเหนื่อยกับการเลื่อนผ่านโฆษณา
        </P>
      </NumberBlock>

      <H2>ช่วงที่ 4: วันที่ 24-31 · ‘ปิด’</H2>

      <NumberBlock number={7} title="ทำสิ่งนี้">
        <P>
          <Strong>เคลียร์สต็อก</Strong> — ของที่ค้างมานานหลายเดือน
          จัด bundle ราคาประหยัด ปลายเดือนคนหา ‘ของคุ้ม’ มากขึ้น
        </P>
        <P>
          <Strong>ทบทวนเดือน</Strong> — สถิติยอดขาย ลูกค้า bestseller
          ใช้ตัดสินใจเดือนหน้า ไม่ใช่แค่ ‘รู้สึก’
        </P>
        <P>
          ในวันสุดท้ายของเดือน <Strong>โพสต์ ‘Tease’</Strong> ของรุ่นใหม่ที่จะ launch
          ในสัปดาห์แรกของเดือนถัดไป — สร้าง anticipation
        </P>
      </NumberBlock>

      <NumberBlock number={8} title="หลีกเลี่ยง">
        <P>
          <Strong>อย่าตัดสินใจใหญ่</Strong> ในวันสุดท้ายของเดือนด้วยใจล้า —
          เช่น ‘ลาออกจากการขาย’ หรือ ‘เปลี่ยน niche’ — พลังไม่ใช่จุดที่จะตัดสินใจดี ๆ
        </P>
        <P>
          <Strong>อย่าเริ่ม Launch ใหญ่</Strong> ปลายเดือน — เก็บไว้วันที่ 1
        </P>
      </NumberBlock>

      <H2>วันพิเศษภายในเดือน</H2>

      <NumberBlock number={1} title="วันที่ 1 · จุดเริ่ม">
        <P>
          วันแรกของเดือนคือ ‘reset’ ที่ทรงพลังที่สุด — ใช้ตั้งเป้าหมายของเดือน
          เขียนเป้ายอดขาย ลงไอจี story ของเราเอง (ส่วนตัว ไม่ post เพจ)
        </P>
      </NumberBlock>

      <NumberBlock number={2} title="วันที่ 8 · พลังเงิน">
        <P>
          วันที่ 8 ของเดือน (เลข 8 = เงิน) — เหมาะกับ Live ขายของแพง / Upsell
          / คุยลูกค้า B2B ที่ค้างไว้
        </P>
      </NumberBlock>

      <NumberBlock number={3} title="วันที่ 15 · ครึ่งทาง">
        <P>
          วันที่ 15 ของเดือน — ใช้<em>ทบทวนกลางเดือน</em> เทียบยอดกับเป้า
          เหลือ 15 วัน ทำให้ทันได้ ไม่ใช่ปลายเดือนแล้วเพิ่งรู้ว่า miss
        </P>
      </NumberBlock>

      <NumberBlock number={4} title="วันที่ 23 · ก่อนเข้าสุดเดือน">
        <P>
          วันที่ 23 — <em>‘สัปดาห์สุดท้าย’</em> เริ่ม วาง plan เคลียร์สต็อก
          + plan เดือนหน้าควบคู่
        </P>
      </NumberBlock>

      <H2>ปฏิทินจังหวะ ‘ส่วนตัว’ — เลขเจ้าของของคุณ</H2>

      <P>
        นอกจากภาพรวมเดือน ลองสังเกตเลขวันที่ที่ตรงกับเลขเจ้าของของเรา —
        นั่นคือ <Strong>‘วันทอง’ ส่วนตัว</Strong>
      </P>

      <P>
        เลขเจ้าของ 1 → วันที่ 1, 10, 19, 28
        <br />
        เลขเจ้าของ 2 → วันที่ 2, 11, 20, 29
        <br />
        เลขเจ้าของ 3 → วันที่ 3, 12, 21, 30
        <br />
        ... และต่อไปจนถึง 9 → วันที่ 9, 18, 27
      </P>

      <Callout variant="tip">
        ในวันทอง: <em>ทำงานสำคัญที่ค้างมา</em> · Live ใหญ่ · ปิดดีลใหญ่ ·
        โพสต์คอนเทนต์ที่อยากให้ดัง — พลังเรา peak
      </Callout>

      <H2>ลงมือทำ — สร้างปฏิทินเดือนนี้ของเราใน 5 นาที</H2>

      <Callout variant="action">
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            เปิด Notion / Google Calendar / สมุด — สร้างหน้าใหม่ ‘ปฏิทินมูเดือน...’
          </li>
          <li>
            ระบุ <Strong>วันทอง</Strong> ของเราในเดือนนี้ (เลขเจ้าของ + วันที่ตรงเลข)
          </li>
          <li>
            แบ่งเดือนเป็น 4 ช่วงตามตารางด้านบน
          </li>
          <li>
            จดกิจกรรมหลัก 1 อย่างต่อช่วง — Launch / Educate / Retain / Clear
          </li>
          <li>
            ทำ 1 เดือนเต็มก่อนเปลี่ยน · ปลายเดือนกลับมาดูว่ารอบไหนได้ผล
          </li>
        </ol>
      </Callout>

      <P>
        เรื่องนี้พี่อยากบอกว่า — แม่ค้าออนไลน์เหนื่อยที่สุดเพราะ
        ‘ทำทุกอย่างทุกวัน’ พลังเราเลยกระจาย
        ปฏิทินมูไม่ได้บังคับให้ทำตามดวง แต่ช่วย<em>โฟกัส</em>
        ทำสิ่งที่ถูกในเวลาที่ถูก
      </P>

      <Callout variant="tip">
        ใช้ปฏิทินนี้ 3 เดือน — เดือนที่ 4 เราจะตื่นมาแล้วรู้เลยว่า
        ‘วันนี้ทำอะไรดี วันไหนพักดี’ ไม่ต้องดู template อีก
        นั่นคือตอนที่ปฏิทินกลายเป็น<em>สัญชาตญาณ</em>
      </Callout>
    </>
  );
}
