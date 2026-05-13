"use client";

import { useMemo, useState } from "react";
import {
  buildMonthCalendar,
  PHASE_INFO,
  type CalendarCell,
} from "@/lib/liveCalendar";

const WEEKDAY_HEADERS = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

function todayBangkok() {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = fmt.formatToParts(new Date());
  return {
    year: parseInt(parts.find((p) => p.type === "year")!.value, 10),
    month: parseInt(parts.find((p) => p.type === "month")!.value, 10),
    day: parseInt(parts.find((p) => p.type === "day")!.value, 10),
  };
}

export default function LiveCalendarTool() {
  const today = todayBangkok();
  const [birthDate, setBirthDate] = useState("");
  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);

  const calendar = useMemo(
    () => buildMonthCalendar(year, month, birthDate || null),
    [year, month, birthDate]
  );

  function prevMonth() {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }
  function nextMonth() {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }
  function backToToday() {
    setYear(today.year);
    setMonth(today.month);
  }

  return (
    <div className="space-y-8">
      {/* Birth date input */}
      <section className="rounded-3xl border border-gold/30 bg-gradient-to-br from-royal/40 via-midnight-soft to-midnight-deep p-6 sm:p-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">
          Step 1 · ใส่วันเกิดเพื่อหาเลขเจ้าของ
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="dob"
              className="mb-2 block text-xs text-white/65"
            >
              วันเกิด
            </label>
            <input
              id="dob"
              type="date"
              max={`${today.year}-${String(today.month).padStart(2, "0")}-${String(today.day).padStart(2, "0")}`}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-white focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>
          {calendar.personalRoot && (
            <div className="rounded-2xl border border-gold/40 bg-gold/10 px-5 py-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold-light">
                เลขเจ้าของ
              </p>
              <p className="font-display text-3xl text-gold-gradient leading-none">
                {calendar.personalRoot}
              </p>
            </div>
          )}
        </div>
        <p className="mt-3 text-xs text-white/45">
          ข้อมูลคำนวณในเครื่องคุณเท่านั้น — ไม่ถูกส่งหรือบันทึก
        </p>
      </section>

      {/* Month navigator */}
      <section className="flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="เดือนก่อนหน้า"
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition hover:border-gold/40 hover:text-gold-light"
        >
          ← ก่อนหน้า
        </button>

        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
            Step 2 · เลือกเดือน
          </p>
          <h2 className="mt-1 font-display text-xl text-white md:text-2xl">
            {calendar.monthLabel}
          </h2>
          {!(year === today.year && month === today.month) && (
            <button
              type="button"
              onClick={backToToday}
              className="mt-1 text-xs text-gold-light underline"
            >
              กลับเดือนปัจจุบัน
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={nextMonth}
          aria-label="เดือนถัดไป"
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition hover:border-gold/40 hover:text-gold-light"
        >
          ถัดไป →
        </button>
      </section>

      {/* Calendar grid */}
      <section>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-widest text-white/45">
          {WEEKDAY_HEADERS.map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1.5">
          {Array.from({ length: calendar.leadingBlanks }).map((_, i) => (
            <div key={`blank-${i}`} />
          ))}
          {calendar.cells.map((cell) => (
            <CalendarTile
              key={cell.day}
              cell={cell}
              isToday={
                year === today.year &&
                month === today.month &&
                cell.day === today.day
              }
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap gap-3 text-[11px] text-white/55">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-gold/40 ring-1 ring-gold" /> วันทอง
            (ตรงเลขเจ้าของ)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border border-gold/60" /> วันนี้
          </span>
        </div>
      </section>

      {/* Gold-days summary */}
      {calendar.personalRoot && calendar.goldDays.length > 0 && (
        <section className="rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/10 via-violet/5 to-transparent p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">
            วันทองของคุณในเดือนนี้
          </p>
          <h3 className="mt-2 font-display text-xl text-white">
            {calendar.goldDays.length} วันที่ ‘แรง’ ที่สุด — ใช้สำหรับ Live ใหญ่
          </h3>
          <ul className="mt-5 space-y-3">
            {calendar.goldDays.map((g) => (
              <li
                key={g.day}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-2xl text-gold-gradient leading-none">
                    {g.day}
                  </span>
                  <div>
                    <p className="text-sm text-white">
                      {PHASE_INFO[g.phase].label} · {g.hint}
                    </p>
                    <p className="text-xs text-white/55">
                      ช่วงเวลาทอง · {g.bestWindow}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!calendar.personalRoot && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/65">
          ใส่วันเกิดด้านบนเพื่อให้ระบบไฮไลต์ ‘วันทอง’ ของคุณ
        </div>
      )}

      <p className="text-center text-xs text-white/45">
        ปฏิทินนี้สำหรับวางแผนและแรงบันดาลใจ ไม่ใช่คำพยากรณ์
      </p>
    </div>
  );
}

function CalendarTile({
  cell,
  isToday,
}: {
  cell: CalendarCell;
  isToday: boolean;
}) {
  return (
    <div
      className={`aspect-square min-h-[58px] rounded-xl border p-1.5 transition sm:p-2 ${
        cell.isGoldDay
          ? "border-gold bg-gold/15 hover:bg-gold/20"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
      } ${isToday ? "ring-1 ring-gold-light" : ""}`}
      title={`วันที่ ${cell.day} · เลขวัน ${cell.dayRoot} · ${cell.hint}`}
    >
      <div className="flex h-full flex-col justify-between text-left">
        <div className="flex items-start justify-between">
          <span
            className={`font-display text-lg leading-none ${
              cell.isGoldDay ? "text-gold-gradient" : "text-white"
            }`}
          >
            {cell.day}
          </span>
          <span
            className={`text-[9px] leading-none ${
              cell.isGoldDay ? "text-gold-light" : "text-white/45"
            }`}
          >
            {cell.dayRoot}
          </span>
        </div>
        <span
          className={`hidden text-[10px] leading-tight sm:block ${
            cell.isGoldDay ? "text-white/85" : "text-white/45"
          }`}
        >
          {cell.bestWindow.split(" – ")[0]}
        </span>
      </div>
    </div>
  );
}
