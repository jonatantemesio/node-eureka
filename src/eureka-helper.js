import { Eureka } from 'eureka-js-client';

const jHipsterRegistry = true;
const eurekaHost = 'localhost';
const eurekaPort = 8761;
const hostName = 'localhost';
const ipAddr = '172.0.0.1';

export function registerWithEureka(appName, PORT) {

  const client = new Eureka({
    instance: {
      app: appName,
      instanceId: appName,
      vipAddress: appName,
      hostName: hostName,
      ipAddr: ipAddr,
      port: {
        '$': PORT,
        '@enabled': 'true',
      },
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
      registerWithEureka: true,
      fetchRegistry: true,
      homePageUrl: `http://${hostName}:${PORT}/`,
    },
    eureka: {
      host: jHipsterRegistry ? 'admin:admin@' + eurekaHost : eurekaHost,
      port: eurekaPort,
      servicePath: '/eureka/apps/',
    },
  })

  client.start(error => {
    console.log(error || "user service registered")
  });

}