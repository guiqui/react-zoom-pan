const Consts = {
  MODE_GLOBAL_PAN: 1,
  MODE_RUBER_BAND_MOVE: 2,
  MODE_RUBER_BAND_ROTATE: 3,
  MODE_RUBER_BAND_RESIZE_UL: 4,
  MODE_RUBER_BAND_RESIZE_UR: 5,
  MODE_RUBER_BAND_RESIZE_DL: 6,
  MODE_RUBER_BAND_RESIZE_DR: 7,
  MODE_RUBER_PADDING: 8,
  MODE_RUBER_ADD_LINK_LEFT: 9,
  MODE_RUBER_ADD_LINK_RIGHT: 10,
  MODE_PAGE_MOVE: 11,

  CLOCKWISE: 22,
  UNCLOCKWISE: 23,

  KEY_LEFT: 37,
  KEY_UP: 38,
  KEY_RIGHT: 39,
  KEY_DOWN: 40,
  KEY_COPY: 67,
  KEY_CUT: 88,
  KEY_PASTE: 86,
  KEY_DELETE: 46,
  RUBBER_BAND_HANDLE_SIZE: 5,
  RUBBER_BAND_EVENT_HANDLE_SIZE: 10,
  RUBBER_BAND_EVENT_HANDLE_SIZE_HALF: 5,
};

export const ObjectTypes = {
  TYPE_ITEM: 0,
  TYPE_LINK: 1,
};

export default Consts;