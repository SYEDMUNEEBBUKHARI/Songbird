const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    DEPLOYMENT_OWNER_CONTRACT_ADDRESS:
      "0xc640f83289E66D5883a027d84ff853cc3E99f3Ce",
    DEPLOYMENT_TOKEN_CONTRACT_ADDRESS:
      "0x31146576B6e4d6d8625Aed2d6a3Bab9cCe6C8BC1",
    SEED: "second actor venue wreck easily prison brain anger prison card bicycle model",
  },
  production: {},
};

module.exports = config[env];
