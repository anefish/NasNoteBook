"use strict";

var GuessItem = function (text) {
  if (text) {
    var obj = JSON.parse(text);
    this.from = obj.from; // 发起者地址
    this.rewardTotal = obj.rewardTotal; //奖励总单位数（5-10）
    this.rightNum = obj.rightNum; // 正确答案数字
    this.guessCount = obj.guessCount; // 猜测次数
    this.isReward = obj.isReward; //是否已付奖励(本轮结束)
    this.winner = obj.winner; // 赢家地址
  } else {
    this.from = "";
    this.rewardTotal = new BigNumber(0);
    this.rightNum = new BigNumber(0);
    this.guessCount = new BigNumber(0);
    this.isReward = false;
    this.winner = "";
  }
};

GuessItem.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};



var RewardGuessContract = function () {
  LocalContractStorage.defineProperties(this, {
    unit: null, // 单位奖励（比如 0.01 nas）
    size: null // 数据总长
  });

  LocalContractStorage.defineMapProperty(this, "allGuessMap", {
    parse: function (text) {
      return new GuessItem(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });
};

RewardGuessContract.prototype = {
  init: function () {
    this.unit = new BigNumber(0.01);
    this.size = new BigNumber(0);
  },

  createGuess: function (rewardTotal) {
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
  }
};
