"use client";

import { useState } from "react";

export default function Home() {
  // 현재 날짜 정보로 초기화
  const [currentDate] = useState(new Date());

  // 달력 데이터 생성 함수
  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // 첫 주의 빈 날짜 채우기
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // 날짜 채우기
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
    }

    return days;
  };

  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* 달력 헤더 */}
        <h1 className="text-4xl font-bold text-black100 mb-8">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h1>

        {/* 달력 그리드 */}
        <div className="border border-black700 rounded-lg overflow-hidden">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 bg-black900 text-black300">
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-4 text-center font-semibold border-b border-black700"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <div
                key={index}
                className={`
                  p-4 min-h-[100px] border-b border-r border-black700
                  ${day ? "hover:bg-black900 cursor-pointer" : "bg-black800/50"}
                  ${index % 7 === 6 ? "border-r-0" : ""}
                `}
              >
                {day && (
                  <span
                    className={`
                    inline-block w-8 h-8 text-center leading-8 rounded-full
                    ${
                      day === new Date().getDate() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear()
                        ? "bg-primary text-white"
                        : "text-black300"
                    }
                  `}
                  >
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
