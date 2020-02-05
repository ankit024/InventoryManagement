module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'Inventorymanagement',
      script: 'app.js',
      instances: '1',
      exec_mode: 'fork',
      error_file: 'logs/Inventorymanagement-errors.log',
      out_file: 'logs/Inventorymanagement-out.log',
      watch: ['controllers/', 'app.js'],
      // watch       : true,
      // ignore_watch: ['*/views/*', '*/statics/*'],
      watch_options: {
        followSymlinks: false
      },
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'development',
        PORT: '8080',
        MONGODB: 'mongodb+srv://ankit:Ankit@cluster0-sex6d.mongodb.net/test?retryWrites=true&w=majority',
        MONGODB_URI: 'mongodb+srv://ankit:Ankit@cluster0-sex6d.mongodb.net/test?retryWrites=true&w=majority',
        // MONGODB: 'mongodb://localhost:27017/Tccc_test',
        // MONGODB_URI: 'mongodb://localhost:27017/Tccc_test',
      },
      // env_production: {
      //   COMMON_VARIABLE: 'true',
      //   NODE_ENV: 'production',
      //   PORT: '4560',
      //   MONGODB: 'mongodb://localhost:27017/Tccc_test',
      //   MONGODB_URI: 'mongodb://localhost:27017/Tccc_test',
      // },
    }

  ],

}
