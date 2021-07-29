export const commonNavigationOptions = {
  headerShown: false,
  stackAnimation: 'slide_from_right',
};
export const animateNavigationOptions = {
  stackAnimation: 'slide_from_right',
};

export const linking = {
  prefixes: ['app://trelloClone/'],
  config: {
    screens: {
      AuthStack: {
        screens: {
          Callback: {
            path: 'callback/:token',
            parse: {
              token: token => token.split('=')[1],
            },
          },
        },
      },
    },
  },
};
