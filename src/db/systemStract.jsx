import {  LiaMapMarkedAltSolid } from "react-icons/lia";
import { GiWatchtower } from "react-icons/gi";
import { FaRoute } from "react-icons/fa";

export const SYSTEMSTRACT = [
  {
    y:20,
    name: "מחוץ לבסיס",
    value: "home",
    color: "bg-[#4f81bc]",
    icon: <FaRoute />,
    listOption: [
      { name: "תרבות יום א / מופע חינוך", value: "home" ,y:50},
      { name: 'מטלות חוץ בסיס (שמירה / עבודות רס"ר / אחר)', value: "home",y:12 },
      { name: "אישי (הפניה רפואית / חופשה / גימלים / אחר)", value: "home",y:18 },
      { name: "בית (כולל נסיעה לבית)", value: "home",y:20 },
    ],
  },
  {
    y:50,
    name: "בסיס",
    value: "base",
    color: "bg-[#c0504e]",
    icon: <GiWatchtower />,
    listOption: [
      { name: "שינה", value: "base",y:10 },
      { name: "התארגנות (בוקר,זמן תפילה,נקנ''ש ,שעת סיום)", value: "base",y:20 },
      { name: "מסדרים", value: "base",y:30 },
      { name: "אימון גופני(בחנים)", value: "base",y:5 },
      { name: "הפסקת אוכל", value: "base",y:5 },
      { name: "הפסקה", value: "base",y:5 },
      { name: "שיעור בכיתה", value: "base",y:5 },
      { name: "סימולטור", value: "base",y:20 },
    ],
  },
  {
    y:30,
    name: "שטח",
    value: "area",
    color: "bg-[#9bbb58]",
    icon: <LiaMapMarkedAltSolid />,
    listOption: [
      { name: "נסיעות", value: "area" ,y:5},
      { name: "שינה בשטח", value: "area" ,y:10},
      { name: "מסדרים", value: "area" ,y:5},
      { name: "(בוקר,זמן תפילה,נקנ''ש ,שעת סיום)התארגנות", value: "area" ,y:30},
      { name: "אימון גופני", value: "area" ,y:10},
      { name: "הפסקת אוכל", value: "area" ,y:10},
      { name: "הפסקה", value: "area" ,y:10},
      { name: "מטווחים", value: "area" ,y:10},
      { name: "תרגיל", value: "area" ,y:5},
      { name: "מבחן", value: "area" ,y:5},
    ],
  },
];

export const getSingleSystemStract = (nameValue) => {
  return SYSTEMSTRACT?.find((item) => item?.value == nameValue)
}

// {
//   name: "שונות",
//   value: "others",
//   icon: <CiCircleMore />,
//   listOption: [
//     { name: "מטלות חוץ בסיס(הגנ''ש,שמירה,אחר)", value: "others" },
//     { name: "מופע חינוך", value: "others" },
//     { name: "אישי(הפניה,חופשה,גימלים,אחר)", value: "others" },
//     { name: "יציאה הביתה", value: "others" },
//   ],
// },