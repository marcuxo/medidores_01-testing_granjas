# new method to make app in ReactNative with expo


```cmd
npx create-expo-app
```

```cmd
eas build:configure
```

## settings to upload without reinstall
```cmd
eas update --channel preview --message "Fixes typo"
```

```cmd
eas update
```


```node
  //agregar en eas.json en el perfil preview lo siguiente
"preview": {
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
},
```

```cmd
eas build -p android --profile preview //se le asigna el perfil
```

# SUMMARY ************************************************

```cmd
npx expo install expo-updates
```

```cmd
expo prebuild
```

```cmd
eas update:configure
```

```cmd
eas build:configure
```

```cmd
eas build --profile preview --platform android
```

```cmd
//genera cambios en ejecucion
eas update --branch preview --message "Updating the app"
```
```cmd
eas update
```
```cmd
npx expo start
eas build:configure
eas build --platform android --profile preview

npx create-expo-app
npx expo install expo-sqlite
npx expo install @react-native-community/netinfo
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/native
npm install react-native-paper        
npm install react-native-vector-icons
```

## babel.config.js
```node
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
```


## last commad success to deploy
```cmd
eas build --profile preview --platform android
```

## Repo on use now to this app

+ 📁PROYECTO PRO.BO.CA
  + 📁pro_bo_ca_06