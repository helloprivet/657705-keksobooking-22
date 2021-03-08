import './page-init.js';
import './form-data.js';
import {showAlert} from './utils.js';
import {sendUserFormData} from './form-data.js';
import {popupMessage} from './popup-messages.js';

const SEND_URL = 'https://22.javascript.pages.academy/keksobooking';
sendUserFormData(SEND_URL, popupMessage, showAlert);
