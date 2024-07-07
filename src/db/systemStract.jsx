import { LiaHomeSolid, LiaMapMarkedAltSolid } from "react-icons/lia";
import { GiWatchtower } from "react-icons/gi";
import { CiCircleMore } from "react-icons/ci";

export const SYSTEMSTRACT = [
  {
    name: "בית",
    value: "home",
    icon: <LiaHomeSolid />,
    listOption: [
      { name: "ישן", value: "home" },
      { name: "אוכל", value: "home" },
      { name: "שמח :)", value: "home" },
    ],
  },
  {
    name: "בסיס",
    value: "base",
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
  {
    name: "שונות",
    value: "others",
    icon: <CiCircleMore />,
    listOption: [
      { name: "מטלות חוץ בסיס(הגנ''ש,שמירה,אחר)", value: "others" },
      { name: "מופע חינוך", value: "others" },
      { name: "אישי(הפניה,חופשה,גימלים,אחר)", value: "others" },
      { name: "יציאה הביתה", value: "others" },
    ],
  },
];

export const getSingleSystemStract = (nameValue) => {
  return SYSTEMSTRACT?.find((item) => item?.value == nameValue)
}
