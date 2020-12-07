const SteamUser = require("steam-user");
const SpeedRunners = require("./speedrunners");

const SPEEDRUNNERS_APPID = 207140;

const client = new SteamUser();

client.logOn({
  accountName: "", // Steam username
  password: "", // Steam password
});

client.on("loggedOn", () => {
  client.getAuthSessionTicket(SPEEDRUNNERS_APPID, async (err, response) => {
    if (err) {
      throw new Error(err);
    }
    const ticket = response.toString("hex").toUpperCase();
    client.removeAllListeners();

    const speed = new SpeedRunners({
      ticket,
      userId: client.steamID.accountid,
    });
    await speed.signin();
    const ranking = await speed.getDivision();
    console.log("ranking", ranking);
    return ranking;
  });
});
