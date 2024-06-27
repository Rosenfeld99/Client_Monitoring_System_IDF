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
      { name: "מטווחים", value: "base" },
      { name: "מכשרה X", value: "base" },
      { name: "הכשרה Y", value: "base" },
      { name: "ישן", value: "base" },
      { name: "אוכל", value: "base" },
    ],
  },
  {
    name: "שטח",
    value: "area",
    icon: <LiaMapMarkedAltSolid />,
    listOption: [
      { name: "מכשרה X", value: "area" },
      { name: "הכשרה Y", value: "area" },
      { name: "ישן", value: "area" },
      { name: "אוכל", value: "area" },
    ],
  },
  {
    name: "שונות",
    value: "others",
    icon: <CiCircleMore />,
    listOption: [
      { name: "מכשרה X", value: "others" },
      { name: "הכשרה Y", value: "others" },
      { name: "ישן", value: "others" },
      { name: "אוכל", value: "others" },
    ],
  },
];

export const getSingleSystemStract = (nameValue) =>{
    return SYSTEMSTRACT?.find((item) => item?.value == nameValue)
}
