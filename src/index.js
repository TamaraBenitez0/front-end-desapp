import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n'
import { IntlProvider } from 'react-intl';
import translationsEN from "./locales/en/translation.json"
import translationsES from "./locales/es/translation.json"
import i18n from './i18n';

const IntlTraslateProvider =({children})=>{
const [lang,setLang]=useState(i18n.language);
const traslates={'es':translationsES , 'en':translationsEN}

i18n.on('languageChanged', (lng) => {
  setLang(lng);
});
return(
  <IntlProvider locale={lang} messages={traslates[lang]}>
    {children}
  </IntlProvider>
)
}


ReactDOM.render(
  <React.StrictMode>
    <IntlTraslateProvider>
    <App/>
    </IntlTraslateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
