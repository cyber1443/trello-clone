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
      BoardsStack: {
        screens: {
          Boards: {
            path: '/:id',
            parse: {
              id: id => id,
            },
          },
          Lists: {
            path: '/:id/:listId',
            parse: {
              id: id => id,
              listId: listId => listId,
            },
          },
          Card: {
            path: '/:boardId/card/:id',
            parse: {
              boardId: boardId => boardId,
              id: id => id,
            },
          },
        },
      },
    },
  },
};
