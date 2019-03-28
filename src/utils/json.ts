import {Util} from "./Util";
export class JSONS {
  public static serviceOptions() {
    return [
      { label: "提问", value: "提问", isselect: false },
      { label: "游校园", value: "游校园", isselect: false },
      { label: "一对一咨询", value: "一对一咨询", isselect: false },
    ];
  }
  public static serviceOptions2() {
    return [
      { label: "提问", value: "提问", isselect: false },
      { label: "一对一咨询", value: "一对一咨询", isselect: false },
    ];
  }
    public static scores() {
        return [
          { name: "TIFI", score: [{label: "100", value: "100"},{label: "60", value: "60"}] },
          { name: "SAT", score: [{label: "100", value: "100"},{label: "60", value: "60"}] },
          { name: "ACT", score: [{label: "100", value: "100"},{label: "60", value: "60"}] },
          { name: "雅思", score: [{label: "100", value: "100"},{label: "60", value: "60"}] },
          { name: "GRE", score: [{label: "100", value: "100"},{label: "60", value: "60"}] },
        ];
      }
      public static communication() {
        return [
          { label: "文字", value: "文字", isselect: false },
          { label: "语音", value: "语音", isselect: false },
          { label: "视频", value: "视频", isselect: false },
        ];
      }
    public static educations() {
        return [
          { label: "本科", value: "本科" },
          { label: "硕士", value: "硕士" },
          { label: "博士", value: "博士" },
        ];
      }
      public static educations2() {
        return [
          { name: "本科", id:'1', isselect: false },
          { name: "硕士", id:'2', isselect: false },
          { name: "博士", id:'3', isselect: false },
        ];
      }
    public static country() {
        return [
          { label: "美国", value: "美国" },
          { label: "英国", value: "英国" },
          { label: "澳大利亚", value: "澳大利亚" },
          { label: "加拿大", value: "加拿大" },
        ];
      }
  public static examinations() {
    return [
      { label: "TIFI", value: "TIFI" },
      { label: "SAT", value: "SAT" },
      { label: "ACT", value: "ACT" },
      { label: "雅思", value: "雅思" },
      { label: "GRE", value: "GRE" }
    ];
  }
  public static examinations2() {
    return [
      { name: "TIFI", id:'1', isselect: false },
      { name: "SAT", id:'2', isselect: false },
      { name: "ACT", id:'3', isselect: false },
      { name: "雅思", id:'4', isselect: false },
      { name: "GRE", id:'5', isselect: false },
    ];
  }
  public static topics() {
    return [
      { label: "移民", value: "移民" },
      { label: "读书", value: "读书" }
    ];
  }
  public static dateList() {
    var time1 = new Date().getTime()+parseInt('1')*86400000;
    var time2 = new Date().getTime()+parseInt('2')*86400000;
    var time3 = new Date().getTime()+parseInt('3')*86400000;
    let day1,day2,day3,day11,day22,day33;
    day1 = Util.formatDate(time1,6);
    day2 = Util.formatDate(time2,6);
    day3 = Util.formatDate(time3,6);

    day11 = Util.formatDate(time1,4);
    day22 = Util.formatDate(time2,4);
    day33 = Util.formatDate(time3,4);
    return [
      { name: day11, value: day1, id:'1', isselect: false },
      { name: day22, value: day2, id:'2', isselect: false },
      { name: day33, value: day3, id:'3', isselect: false },
    ];
  }

  public static weekTime(): any {
    return [
      {
        title: "星期一"
      },
      {
        title: "星期二"
      },
      {
        title: "星期三"
      },
      {
        title: "星期四"
      },
      {
        title: "星期五"
      },
      {
        title: "星期六"
      },
      {
        title: "星期日"
      }
    ];
  }
  public static AllTime(): any {
    return [
      {
        week: "星期一",
        id: "1",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false },
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期二",
        id: "2",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false },
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期三",
        id: "3",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false },
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期四",
        id: "4",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false },
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期五",
        id: "5",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false },
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期六",
        id: "6",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false },
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期日",
        id: "7",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false },
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      }
    ];
  }
  public static dateTime(): any {
    return [
      {
        week: "星期一",
        id: "1",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false }
        ]
      },
      {
        week: "星期二",
        id: "2",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false }
        ]
      },
      {
        week: "星期三",
        id: "3",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false }
        ]
      },
      {
        week: "星期四",
        id: "4",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false }
        ]
      },
      {
        week: "星期五",
        id: "5",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false }
        ]
      },
      {
        week: "星期六",
        id: "6",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false }
        ]
      },
      {
        week: "星期日",
        id: "7",
        time: [
          { hour: "8:00-9:00", id: "9", select: false },
          { hour: "9:00-10:00", id: "10", select: false },
          { hour: "10:00-11:00", id: "11", select: false },
          { hour: "11:00-12:00", id: "12", select: false },
          { hour: "12:00-13:00", id: "13", select: false },
          { hour: "13:00-14:00", id: "14", select: false },
          { hour: "14:00-15:00", id: "15", select: false },
          { hour: "15:00-16:00", id: "16", select: false },
          { hour: "16:00-17:00", id: "17", select: false },
          { hour: "17:00-18:00", id: "18", select: false }
        ]
      }
    ];
  }
  public static dateOnOTime(): any {
    return [
      {
        week: "星期一",
        id: "1",
        time: [
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期二",
        id: "2",
        time: [
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期三",
        id: "3",
        time: [
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期四",
        id: "4",
        time: [
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期五",
        id: "5",
        time: [
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期六",
        id: "6",
        time: [
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      },
      {
        week: "星期日",
        id: "7",
        time: [
          { hour: "18:00-19:00", id: "19", select: false },
          { hour: "19:00-20:00", id: "20", select: false },
          { hour: "20:00-21:00", id: "21", select: false },
          { hour: "21:00-22:00", id: "22", select: false },
          { hour: "22:00-23:00", id: "23", select: false },
          { hour: "23:00-24:00", id: "24", select: false }
        ]
      }
    ];
  }
}
