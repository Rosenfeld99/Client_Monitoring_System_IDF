import { LiaHomeSolid, LiaMapMarkedAltSolid } from "react-icons/lia";
import { GiWatchtower } from "react-icons/gi";
import { CiCircleMore } from "react-icons/ci";
import { FaRoute } from "react-icons/fa";

export const SYSTEMSTRACT = [
  {
    name: "מחוץ לבסיס",
    value: "home",
    color: "bg-[#4f81bc]",
    icon: <FaRoute />,
    listOption: [
      { name: "תרבות יום א / מופע חינוך", value: "home" },
      { name: 'מטלות חוץ בסיס (שמירה / עבודות רס"ר / אחר)', value: "home" },
      { name: "אישי (הפניה רפואית / חופשה / גימלים / אחר)", value: "home" },
      { name: "בית (כולל נסיעה לבית)", value: "home" },
    ],
  },
  {
    name: "בסיס",
    value: "base",
    color: "bg-[#c0504e]",
    icon: <GiWatchtower />,
    listOption: [
      { name: "שינה", value: "base" },
      { name: "(בוקר,זמן תפילה,נקנ''ש ,שעת סיום)התארגנות", value: "base" },
      { name: "מסדרים", value: "base" },
      { name: "אימון גופני(בחנים)", value: "base" },
      { name: "הפסקת אוכל", value: "base" },
      { name: "הפסקה", value: "base" },
      { name: "שיעור בכיתה", value: "base" },
      { name: "סימולטור", value: "base" },
    ],
  },
  {
    name: "שטח",
    value: "area",
    color: "bg-[#9bbb58]",
    icon: <LiaMapMarkedAltSolid />,
    listOption: [
      { name: "נסיעות", value: "area" },
      { name: "שינה בשטח", value: "area" },
      { name: "מסדרים", value: "area" },
      { name: "(בוקר,זמן תפילה,נקנ''ש ,שעת סיום)התארגנות", value: "area" },
      { name: "אימון גופני", value: "area" },
      { name: "הפסקת אוכל", value: "base" },
      { name: "הפסקה", value: "base" },
      { name: "מטווחים", value: "base" },
      { name: "תרגיל", value: "base" },
      { name: "מבחן", value: "base" },
    ],
  },
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
];

export const getSingleSystemStract = (nameValue) => {
  return SYSTEMSTRACT?.find((item) => item?.value == nameValue)
}
