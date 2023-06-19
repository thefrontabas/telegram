import { createSlice } from '@reduxjs/toolkit';

export const homeslice = createSlice({
  name: 'home',
  initialState: {
    value: {
      gmail: [],
      user: [],
      link: '',
      sound: '',
      message: '',
      id: '',
      reply: [],
      replyshow: false,
      editeshow: false,
      request: false,
      image: [],
      imageshow: false,
      forwardshow: false,
      forwardlist: {},
    },
  },
  reducers: {
    tokenfunc: (state, action) => {
      state.value.gmail = action.payload;
    },
    userfunc: (state, action) => {
      state.value.user = action.payload;
    },
    linkfunc: (state, action) => {
      state.value.link = action.payload;
    },
    soundfunc: (state, action) => {
      state.value.sound = action.payload;
    },

    messagefunc: (state, action) => {
      state.value.message = action.payload;
    },

    idfunc: (state, action) => {
      state.value.id = action.payload;
    },
    replyfunc: (state, action) => {
      action.payload == ''
        ? (state.value.reply = [])
        : state.value.reply.push(action.payload);
    },
    replyshowfunc: (state, action) => {
      state.value.replyshow = action.payload;
    },
    editeshowfunc: (state, action) => {
      state.value.editeshow = action.payload;
    },
    requestfunc: (state, action) => {
      state.value.request = action.payload;
    },
    imagefunc: (state, action) => {
      if (action.payload) {
        state.value.image.push(action.payload);
      } else {
        state.value.image = [];
      }
    },
    imagefilterfunc: (state, action) => {
      let filter = state.value.image.filter((item) => item !== action.payload);
      state.value.image = filter;
    },
    imageshowfunc: (state, action) => {
      state.value.imageshow = action.payload;
    },
    forwardshowfunc: (state, action) => {
      state.value.forwardshow = action.payload;
    },
    forwardlistfunc: (state, action) => {
      state.value.forwardlist = action.payload;
    },
  },
});

export const {
  tokenfunc,
  userfunc,
  linkfunc,
  soundfunc,
  messagefunc,
  idfunc,
  replyfunc,
  replyshowfunc,
  editeshowfunc,
  requestfunc,
  imagefunc,
  imagefilterfunc,
  imageshowfunc,
  forwardshowfunc,
  forwardlistfunc,
} = homeslice.actions;

export default homeslice.reducer;
