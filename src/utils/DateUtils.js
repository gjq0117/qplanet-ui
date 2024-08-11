import dayjs, { Dayjs } from "dayjs";
export default {
  /**
   *  格式化时间(如果是当天的时间，格式化成：15:54，如果不是当天时间，格式化成日期 04/15)
   *
   * @param date
   */
  formatTime(date) {
    let today = new Date();
    let day = new Date(date);
    if (this.isSameDay(today, day)) {
      // 同一天 HH:mm
      return dayjs(date).format("HH:mm");
    } else if (this.isSameYear(today, day)) {
      // 同一年 MM/dd
      return dayjs(date).format("MM月DD日 HH:mm");
    } else {
      // 以往的年份 YY/MM/dd
      return dayjs(date).format("YY年MM月DD日");
    }
  },

  /**
   *  判断两个时间是否属于同一天
   *
   * @param date1
   * @param date2
   * @return {boolean}
   */
  isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  },

  /**
   *  同一年
   *
   * @param date1
   * @param date2
   * @return {boolean}
   */
  isSameYear(date1, date2) {
    return date1.getFullYear() === date2.getFullYear();
  },

  /**
   *  判断两个时间间隔多少分钟
   *
   * @param small 小的时间
   * @param big 大的时间
   * @param minute 间隔分钟数
   */
  intervalMinute(small, big, minute) {
    return big - small > minute * 60 * 1000;
  },
};
