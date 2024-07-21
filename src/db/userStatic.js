import { KEY_WAVES_SYSTEM } from "../constant/constant";
import { generateID } from "../utils/func/generateId";

export const userStatic = localStorage.getItem(KEY_WAVES_SYSTEM) || {
  username: "אליהו מאיר",
  role: "admin",
  userGrup: {
    lastReportTests: {},
    lastReportGrup: {},
    historyList: [],
  },
  counterEdit: 3,
  isProcess: false,
  process: null,
  lastReport: {
    id: generateID(),
    date: "26/06/2024",
    startTime: "12:00",
    endTime: "13:00",
    content: "תפילה",
    location: "בסיס",
    isCompited: true,
  },
  history: [
    {
      id: generateID(),
      startTime: "12:00",
      date: "25/06/2024",
      endTime: "13:00",
      content: "תפילה",
      location: "בסיס",
      isCompited: true,
    },
    {
      id: generateID(),
      startTime: "14:00",
      date: "25/06/2024",
      endTime: "15:00",
      content: "ספורט",
      location: "בסיס",
      isCompited: true,
    },
    {
      id: generateID(),
      startTime: "16:00",
      date: "25/06/2024",
      endTime: "17:00",
      content: "הכשרה X",
      location: "בסיס",
      isCompited: true,
    },
    {
      id: generateID(),
      startTime: "18:00",
      date: "25/06/2024",
      endTime: "19:00",
      content: "הכשרה Y",
      location: "בסיס",
      isCompited: true,
    },
    {
      id: generateID(),
      startTime: "18:00",
      date: "26/06/2024",
      endTime: "19:00",
      content: "הכשרה Y",
      location: "בסיס",
      isCompited: true,
    },
  ],
};

if (!localStorage.getItem(KEY_WAVES_SYSTEM))
  localStorage.setItem(KEY_WAVES_SYSTEM, JSON.stringify(userStatic));
