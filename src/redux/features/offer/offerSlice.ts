import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { CategoriesService } from "@/services/categories.service";
import { BASE_URL } from "@/conf/api";
import axios from "axios";

interface Sales {
  success: boolean;
  sales: [{
    assetId: string;
    OnwerId: string;
    buyer: string;
    assetTitle: string;
    assetPrice: Number;
    quantity: Number;
    created_at: string;
    creator: string;
  }];
}
interface OfferState {
  musicAssetData: any;
  cart: any;
  offerDialog: boolean;
  cancelDialog: boolean;
  completeDialog: boolean;
  revisionDialog: boolean;
  ratingDialog: boolean;
  arbitrationDialog: boolean;
  invoiceDialog: boolean;
  reportDialog: boolean;
  musicBackgroundDialog: boolean;
  musicPlayerDialog: boolean;
  isMusicAssets: boolean;
  isCustomer: boolean;
  reportUserDialog: boolean;
  filterExplore: string;
  selectedId: string;
  musicDetail: MusicDetail | null;
  isMusicCreation: boolean;
  source: "assets" | "home" | null;
  musicAsset: any;
  hasLyrics: boolean;
  loading: boolean;
  error: string | null;
  mycart: any;
  checkoutDialog: boolean;
  sales: Sales | null;
}

interface MusicDetail {
  musicStyle?: string;
  instrument?: string;
  movieGameType?: string;
  softwareTools?: string;
  label?: string;
  description?: string;
}

const initialState: OfferState = {
  offerDialog: false,
  cart: [],
  cancelDialog: false,
  completeDialog: false,
  revisionDialog: false,
  ratingDialog: false,
  arbitrationDialog: false,
  invoiceDialog: false,
  reportDialog: false,
  musicBackgroundDialog: false,
  musicPlayerDialog: false,
  isMusicAssets: false,
  isCustomer: false,
  reportUserDialog: false,
  filterExplore: "all",
  selectedId: "",
  musicDetail: null as MusicDetail | null,
  isMusicCreation: false,
  source: null,
  musicAsset: null,
  hasLyrics: false,
  loading: false,
  musicAssetData: [],
  error: null,
  mycart: [],
  checkoutDialog: false,
  sales: null
};


export const getAssetById = createAsyncThunk(
  'offer/getAssetById',
  async (id: string) => {
    const accessToken = localStorage.getItem('token');

    const response = await axios.get(
      `${BASE_URL}/v1/music-asset/${id}`,// Empty object as request body since you don't need to send data
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Music Asset Data:", response.data);
    } else {
      console.error("Failed to apply on job");
    }

    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  'offer/addToCart',
  async (assetId: string) => {
    const accessToken = localStorage.getItem('token');

    const response = await axios.post(
      `${BASE_URL}/v1/music-asset/cart/${assetId}`,
      {},// Empty object as request body since you don't need to send data
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Music Asset Data:", response.data);
    } else {
      console.error("Failed to apply on job");
    }

    return response.data;
  }
);

export const getCart = createAsyncThunk(
  'offer/getCart',
  async () => {
    const accessToken = localStorage.getItem('token');

    const response = await axios.get(
      `${BASE_URL}/v1/music-asset/my/cart`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Music Asset Data:", response.data);
    } else {
      console.error("Failed to apply on job");
    }

    return response.data;
  }
);

export const deleteCart = createAsyncThunk(
  'offer/getCart',
  async (assetId: string) => {
    const accessToken = localStorage.getItem('token');

    const response = await axios.delete(
      `${BASE_URL}/v1/music-asset/delete/cart/${assetId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Music Asset Data:", response.data);
    } else {
      console.error("Failed to apply on job");
    }

    return response.data;
  }
);

export const payCart = createAsyncThunk(
  'offer/payCart',
  async (saleData: any) => {
    const accessToken = localStorage.getItem('token');

    const response = await axios.post(
      `${BASE_URL}/v1/music-asset/add/sale`,
      { saleData },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Music Asset Data:", response.data);
    } else {
      console.error("Failed to apply on job");
    }

    return response.data;
  }
);

export const getSales = createAsyncThunk(
  'offer/getSales',
  async () => {
    const accessToken = localStorage.getItem('token');

    const response = await axios.get(
      `${BASE_URL}/v1/music-asset/get/sales`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Music Asset Data:", response.data);
    } else {
      console.error("Failed to apply on job");
    }

    return response.data;
  }
);

export const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    updateDialog: (state) => {
      state.offerDialog = !state.offerDialog;
    },
    cancelDialog: (state) => {
      state.cancelDialog = !state.cancelDialog;
    },
    completeDialog: (state) => {
      state.completeDialog = !state.completeDialog;
    },
    revisionDialog: (state) => {
      state.revisionDialog = !state.revisionDialog;
    },
    ratingDialog: (state) => {
      state.ratingDialog = !state.ratingDialog;
    },
    arbitrationDialog: (state) => {
      state.arbitrationDialog = !state.arbitrationDialog;
    },
    invoiceDialog: (state) => {
      state.invoiceDialog = !state.invoiceDialog;
    },
    reportDialog: (state) => {
      state.reportDialog = !state.reportDialog;
    },
    musicBackgroundDialog: (state) => {
      state.musicBackgroundDialog = !state.musicBackgroundDialog;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setMusicDetail: (state, action: PayloadAction<any>) => {
      console.log("Setting music detail:", action.payload);
      state.musicDetail = action.payload;
    },
    setCheckoutDialog: (state) => {
      state.checkoutDialog = !state.checkoutDialog;
    },
    musicPlayerDialog: (state) => {
      state.musicPlayerDialog = !state.musicPlayerDialog;
      if (!state.musicPlayerDialog) {
        state.isMusicAssets = false;
        state.selectedId = "";
        state.musicDetail = null;
        state.source = null;
        state.hasLyrics = false;
      }
    },
    setMusicAssetId: (state, action) => {
      state.selectedId = action.payload;
      state.isMusicAssets = true;
      state.source = "assets";
    },
    setMusicCreationId: (
      state,
      action: PayloadAction<{ id: string; hasLyrics?: boolean }>
    ) => {
      state.selectedId = action.payload.id;
      state.isMusicAssets = false;
      state.source = "home";
      state.hasLyrics = action.payload.hasLyrics || false;
    },
    isCustomer: (state, action: PayloadAction<boolean>) => {
      state.isCustomer = action.payload;
    },
    reportUserDialog: (state) => {
      state.reportUserDialog = !state.reportUserDialog;
    },
    filterExplore: (state, action: PayloadAction<string>) => {
      state.filterExplore = action.payload;
    },
    musicCreation: (state, action: PayloadAction<boolean>) => {
      state.isMusicCreation = action.payload;
    },
    updateMusicAsset: (state, action) => {
      state.musicAsset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssetById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.musicAssetData = action.payload;
      })
      .addCase(getAssetById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.cart = action.payload
      })
      .addCase(getCart.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(payCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payCart.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.sales = action.payload
      })
      .addCase(payCart.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSales.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.sales = action.payload
      })
      .addCase(getSales.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const {
  updateDialog,
  cancelDialog,
  completeDialog,
  revisionDialog,
  ratingDialog,
  arbitrationDialog,
  setCheckoutDialog,
  invoiceDialog,
  reportDialog,
  musicBackgroundDialog,
  musicPlayerDialog,
  setMusicAssetId,
  setMusicCreationId,
  isCustomer,
  reportUserDialog,
  filterExplore,
  setSelectedId,
  setMusicDetail,
  musicCreation,
  updateMusicAsset,
} = offerSlice.actions;

export default offerSlice.reducer;
