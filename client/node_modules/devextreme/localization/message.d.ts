/**
* DevExtreme (localization/message.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
type messageLocalizationType = {
    getFormatter:(name: string) => () => string
    format: (name: string) => string
};
declare const messageLocalization: messageLocalizationType;
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default messageLocalization;
