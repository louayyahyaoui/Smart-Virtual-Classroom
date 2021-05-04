/**
* DevExtreme (renovation/ui/scheduler/workspaces/types.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ViewCellData {
  startDate: Date;
  endDate: Date;
  text: string;
  otherMonth?: boolean;
  today?: boolean;
  allDay?: boolean;
  groups?: object;
  groupIndex?: number;
  index: number;
  isFirstGroupCell: boolean;
  isLastGroupCell: boolean;
  key: string;
}

interface ViewData {
  dateTable: ViewCellData[][];
  groupIndex: number;
  allDayPanel?: ViewCellData[];
  isGroupedAllDayPanel?: boolean;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GroupedViewData {
  groupedData: ViewData[];
  isVirtual?: boolean;
  topVirtualRowHeight?: number;
  bottomVirtualRowHeight?: number;
  cellCountInGroupRow: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GroupItem {
  id: number | string;
  text?: string;
  color?: string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GroupRenderItem extends GroupItem {
  key: string;
  resourceName: string;
  data: GroupItem;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface Group {
  name: string;
  items: GroupItem[];
  data: GroupItem[];
}

interface BaseTemplateData {
  groups?: object;
  groupIndex?: number;
  allDay?: boolean;
  text?: string;
}

interface DataCellTemplateData extends BaseTemplateData {
  startDate: Date;
  endDate: Date;
}

interface DateCellTemplateData extends BaseTemplateData {
  date: Date;
}

interface TemplateData extends BaseTemplateData {
  date?: Date;
  startDate?: Date;
  endDate?: Date;
}

interface BaseTemplateProps {
  index: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ContentTemplateProps extends BaseTemplateProps {
  data: TemplateData;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface DataCellTemplateProps extends BaseTemplateProps {
  data: DataCellTemplateData;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface DateTimeCellTemplateProps extends BaseTemplateProps {
  data: DateCellTemplateData;
}

interface ResourceCellTemplateData {
  data: GroupItem;
  id: number | string;
  text?: string;
  color?: string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ResourceCellTemplateProps extends BaseTemplateProps {
  data: ResourceCellTemplateData;
}

