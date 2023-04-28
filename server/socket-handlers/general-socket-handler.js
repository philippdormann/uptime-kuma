const { log } = require("../../src/util");
const { Settings } = require("../settings");
const { checkLogin } = require("../util-server");

module.exports.generalSocketHandler = (socket, server) => {

    socket.on("initServerTimezone", async (timezone) => {
        try {
            checkLogin(socket);
            log.debug("generalSocketHandler", "Timezone: " + timezone);
            await Settings.set("initServerTimezone", true);
            await server.setTimezone(timezone);
        } catch (e) {
            log.warn("initServerTimezone", e.message);
        }
    });

};
