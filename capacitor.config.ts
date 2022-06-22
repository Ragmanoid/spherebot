import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'spherebot',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    cleartext: true
  }
};

export default config;
