const axios = require("axios");
const qs = require("querystring");

class SpeedRunners {
  constructor({ ticket, userId }) {
    this.request = axios.create({
      baseURL: "http://league.speedrunners.doubledutchgames.com/Service",
      headers: {
        "User-Agent": "SpeedRunners - Ranking",
      },
      transformRequest: (data) => qs.stringify(data),
    });
    this.ticket = ticket;
    this.userId = userId;
    this.code = null;
  }

  setCode(code) {
    this.code = code;
  }

  async signin() {
    try {
      const response = await this.request({
        method: "POST",
        url: "/SignIn",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          v: 107,
          ticket: this.ticket,
        },
      });
      const { code } = response.data;
      this.setCode(code);
      return response.data;
    } catch (err) {
      console.log("error with signin", err);
    }
  }

  async getRanking() {
    try {
      const response = await this.request({
        method: "POST",
        url: "/GetRanking",
        data: {
          v: 107,
          id: this.userId,
          code: this.code,
        },
      });
      return response.data;
    } catch (err) {
      console.log("error with getRanking", err);
    }
  }

  async getDivision() {
    try {
      const response = await this.request({
        method: "POST",
        url: "/GetDivision",
        data: {
          v: 107,
          id: this.userId,
          code: this.code,
        },
      });
      return {
        ranking: response.data.findIndex((player) => parseInt(player.id) === this.userId) + 1,
        division: response.data,
      };
    } catch (err) {
      console.log("error with GetDivision", err);
    }
  }
}

module.exports = SpeedRunners;
