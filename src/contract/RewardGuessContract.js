"use strict";

var GuessItem = function (text) {
  if (text) {
    var obj = JSON.parse(text);
    this.from = obj.from; // 发起者地址
    this.rewardUnits = obj.rewardUnits; //奖励总单位数/竞猜选项个数（5-10）
    this.rightNum = obj.rightNum; // 正确答案数字
    this.guessCount = obj.guessCount; // 猜测次数
    this.beReward = obj.beReward; //是否已付奖励(本轮结束)
    this.winner = obj.winner; // 赢家地址
  } else {
    this.from = "";
    this.rewardUnits = new BigNumber(0);
    this.rightNum = new BigNumber(0);
    this.guessCount = new BigNumber(0);
    this.beReward = false;
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
    guessUnits: null, // 参与竞猜支付单位数
    size: null, // 竞猜项目总数
    unRewardSize: null, // 未结束项目数
    beRewardSize: null // 已结束项目数
  });

  LocalContractStorage.defineMapProperty(this, "allGuessMap", {
    parse: function (text) {
      return new GuessItem(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });

  LocalContractStorage.defineMapProperties(this,{
    unRewardMap: null,
    beRewardMap: null
  });
};

RewardGuessContract.prototype = {
  init: function () {
    this.unit = new BigNumber(0.01);
    this.guessUnits = new BigNumber(2);
    this.size = new BigNumber(0);
    this.unRewardSize = new BigNumber(0);
    this.beRewardSize = new BigNumber(0);
  },

  test: function () {
    var obj = {a:1,b:2,c:3};
    return Obj.keys(obj);
  },

  // 发起竞猜
  createGuess: function (rewardUnits) {
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    rewardUnits = new BigNumber(rewardUnits);

    // 奖励总额
    var rewardTotal = this.unit.times(rewardUnits);
    if (!value.eq(rewardTotal)) {
      throw new Error("请支付" + rewardTotal + "NAS.");
    }

    // 正确数字
    var rightNum = parseInt(Math.random().times(rewardUnits)).plus(new BigNumber(1));

    var guessItem = new GuessItem();
    guessItem.from = from;
    guessItem.rewardUnits = rewardUnits;
    guessItem.rightNum = rightNum;

    var index = this.size;
    this.allGuessMap.set(index, guessItem);
    this.size = this.size.plus(new BigNumber(1));

    // TODO:
  },

  // 参与竞猜
  submitGuess: function (guessIndex, guessNum) {
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    guessIndex = new BigNumber(guessIndex);
    guessNum = new BigNumber(guessNum);

    var guessItem = this.allGuessMap.get(guessIndex);
    if (guessItem.beReward) {
      throw new Error("本期竞猜已结束.");
    }

    var guessTotal = this.unit.times(this.guessUnits);
    if (!value.eq(guessTotal)) {
      throw new Error("请支付" + guessTotal + "NAS.");
    }

    guessItem.guessCount = guessItem.guessCount.plus(new BigNumber(1));
    if (guessNum.eq(guessItem.rightNum)) { // 猜中
      guessItem.beReward = true;
      guessItem.winner = from;
      // TODO: 支付奖励
    }

    this.allGuessMap.set(guessIndex, guessItem);
  }
};

module.exports = RewardGuessContract;
