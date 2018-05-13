"use strict";

// 题目
var QAItem = function (text) {
  if (text) {
    var obj = JSON.parse(text);
    this.from = obj.from;
    this.question = obj.question;
    this.A = obj.A;
    this.B = obj.B;
    this.C = obj.C;
    this.D = obj.D;
    this.answer = obj.answer; // 正确答案
    this.isReward = obj.isReward; // 是否已支付奖励（已被正确回答）
    this.beAnsweredTimes = obj.beAnsweredTimes; // 被答次数
    this.winner = obj.winner; // 胜者地址
  } else {
    this.from = "";
    this.question = "";
    this.A = "";
    this.B = "";
    this.C = "";
    this.D = "";
    this.answer = "";
    this.isReward = false;
    this.beAnsweredTimes = 0;
    this.winner = "";
  }
};
