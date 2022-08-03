export const CUSTOM_EVENT_COLOR_HSV_CHANGED = 'tc-hsv-changed';
export const CUSTOM_EVENT_COLOR_HUE_CHANGED = 'tc-hue-changed';
export const CUSTOM_EVENT_COLOR_ALPHA_CHANGED = 'tc-alpha-changed';
export const CUSTOM_EVENT_BUTTON_CLICKED = 'tc-button-clicked';

export const sendButtonClickedCustomEvent = (cid: string) => {
  if (!cid) return;

  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_BUTTON_CLICKED, {
      detail: {
        cid,
      },
    })
  );
};

export const sendAlphaCustomEvent = (cid: string, a: number) => {
  if (!cid) return;

  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, {
      detail: {
        a,
        cid,
      },
    })
  );
};

export const sendHsvCustomEvent = (cid: string, h: number, s: number, v: number) => {
  if (!cid) return;

  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_COLOR_HSV_CHANGED, {
      detail: {
        h,
        s,
        v,
        cid,
      },
    })
  );
};

export const sendHueCustomEvent = (cid: string, h: number) => {
  if (!cid) return;

  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_COLOR_HUE_CHANGED, {
      detail: {
        h,
        cid,
      },
    })
  );
};
