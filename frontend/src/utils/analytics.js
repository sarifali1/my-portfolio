import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-XXXXXXXXXX';

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
  console.log('Google Analytics initialized');
};

export const logPageView = () => {
  ReactGA.send({ 
    hitType: 'pageview', 
    page: window.location.pathname + window.location.search 
  });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};

export const logButtonClick = (buttonName) => {
  ReactGA.event({
    category: 'Button',
    action: 'Click',
    label: buttonName
  });
};

export const logFormSubmission = (formName) => {
  ReactGA.event({
    category: 'Form',
    action: 'Submit',
    label: formName
  });
};
