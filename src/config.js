const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    DEPLOYMENT_OWNER_CONTRACT_ADDRESS:
      "0xf1a6FF13258deD63aB3A9aC5C04d99b72F732587",
    DEPLOYMENT_TOKEN_CONTRACT_ADDRESS:
      "0x31146576B6e4d6d8625Aed2d6a3Bab9cCe6C8BC1",
    SEED: "second actor venue wreck easily prison brain anger prison card bicycle model",
  },
  production: {},
};

module.exports = config[env];
