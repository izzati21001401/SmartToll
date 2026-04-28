export default {
  expo: {
    name: "SmartToll",
    slug: "smarttoll",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/splash-icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,
    splash: {
      image: "./assets/images/smarttoll-logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.aarulkoul.smarttoll",
      adaptiveIcon: {
        foregroundImage: "./assets/images/smarttoll-logo.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: "AIzaSyBW1IcYSdUpIKme1L7zOebe7R5IdJuon60",
        },
      },
    },
    extra: {
      eas: {
        projectId: "03167bee-9db1-4863-8582-a9007c24bca9",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/smarttoll-logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
