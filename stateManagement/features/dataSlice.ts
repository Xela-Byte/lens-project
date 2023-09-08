import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavLinkType {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface FooterLinkType {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

export type StateType = {
  globalData: {
    data: {
      attributes: {
        navbar: {
          navbarLogo: {
            logoText: string;
            logoImg: {
              data: {
                attributes: {
                  url: string;
                };
              };
            };
          };
          links: Array<NavLinkType>;
        };
        footer: {
          footerLogo: {
            logoDescription: string;
            logoText: string;
            logoImg: {
              data: {
                attributes: {
                  url: string;
                };
              };
            };
          };
          menuLinks: Array<FooterLinkType>;
          legalLinks: Array<FooterLinkType>;
          socialLinks: Array<FooterLinkType>;
        };
        metadata: {};
        favicon: {};
      };
    };
  };
};

const initialState = {
  data: {
    attributes: {
      navbar: {
        navbarLogo: {
          logoText: "",
          logoImg: {
            data: {
              attributes: {
                url: "",
              },
            },
          },
        },
        links: [],
      },
      footer: {
        footerLogo: {
          logoDescription: "",
          logoText: "",
          logoImg: {
            data: {
              attributes: {
                url: "",
              },
            },
          },
        },
        menuLinks: [],
        legalLinks: [],
        socialLinks: [],
      },
      metadata: {},
      favicon: {},
    },
  },
} as StateType["globalData"];

export const globalData = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    reset: () => initialState,
    setGlobalData: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { reset, setGlobalData } = globalData.actions;
export const selectGlobalData = (state: StateType) => state.globalData;
export default globalData.reducer;
