module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
    DATABASE_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/bottoms-up',
    TEST_DATABASE_URL: process.env.TEST_DB_URL || 'postgresql://dunder_mifflin@localhost/bottoms-up-test',
  }