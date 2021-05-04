/**
* DevExtreme (renovation/ui/scheduler/appointment_tooltip/types.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// https://github.com/benmosher/eslint-plugin-import/issues/1699
// eslint-disable-next-line import/named
import { dxSchedulerAppointment } from '../../../../ui/scheduler';
/* eslint-disable-next-line import/named */
import { dxPromise } from '../../../../core/utils/deferred';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Color = string | undefined;
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type DeferredColor = dxPromise<Color>;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface AppointmentItem {
  data: dxSchedulerAppointment;
  currentData?: dxSchedulerAppointment;
  settings?: AppointmentItemSettings;
  color?: DeferredColor;
  disabled?: boolean;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface AppointmentItemSettings {
  targetedAppointmentData?: dxSchedulerAppointment;
  originalAppointmentStartDate?: Date;
  originalAppointmentEndDate?: Date;
  startDate?: Date;
  endDate?: Date;
  direction?: 'vertical' | 'horizontal';
  allDay?: boolean;
  isCompact?: boolean;
  virtual?: boolean;
  groupIndex?: number;
  appointmentReduced?: boolean;
  sortedIndex?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface FormattedContent {
  text: string;
  formatDate: string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type GetTextAndFormatDateFn = (
  appointment?: dxSchedulerAppointment, currentAppointment?: dxSchedulerAppointment,
) => FormattedContent;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type GetSingleAppointmentFn = (
  appointment: dxSchedulerAppointment, target: HTMLElement,
) => dxSchedulerAppointment;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type CheckAndDeleteAppointmentFn = (
  appointment: dxSchedulerAppointment, currentAppointment: dxSchedulerAppointment,
) => void;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type ShowAppointmentPopupFn = (
  appointment: dxSchedulerAppointment, visibleButtons: boolean,
  currentAppointment: dxSchedulerAppointment,
) => void;
