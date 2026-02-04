export const trackEvent = async (eventName: string, properties: Record<string, any> = {}) => {
  try {
    if (window.analytics) {
      await window.analytics.track(eventName, properties).catch((err: any) => {
        console.warn('Analytics track event failed:', err);
      });
    }
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
};


export const trackPageView = async (pageName: string, properties: Record<string, any> = {}) => {
  try {
    if (window.analytics) {
      await window.analytics.page(pageName, properties).catch((err: any) => {
        console.warn('Analytics page view failed:', err);
      });
    }
  } catch (error) {
    console.warn('Analytics page view failed:', error);
  }
};


export const identifyUser = async (userId: string, userProperties: Record<string, any> = {}) => {
  try {
    if (window.analytics) {
      await window.analytics.identify(userId, userProperties).catch((err: any) => {
        console.warn('Analytics identify failed:', err);
      });
    }
  } catch (error) {
    console.warn('Analytics identify failed:', error);
  }
};

export const endSession = async (data: Record<string, any> = {}) => {
  try {
    if (window.analytics) {
      await window.analytics.endSession(data).catch((err: any) => {
        console.warn('Analytics end session failed:', err);
      });
    }
  } catch (error) {
    console.warn('Analytics end session failed:', error);
  }
};
