/**
* DevExtreme (excel_exporter.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxDataGrid, { dxDataGridColumn } from './ui/data_grid';
import dxPivotGrid, { dxPivotGridPivotGridCell } from './ui/pivot_grid';
import { ExportLoadPanel } from './exporter/export_load_panel';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ExcelDataGridCell {
    /**
     * The configuration of the cell's column.
     */
    column?: dxDataGridColumn;
    /**
     * The data object of the cell's row.
     */
    data?: any;
    /**
     * The group index of the cell's row. Available when the rowType is 'group'.
     */
    groupIndex?: number;
    /**
     * Information about group summary items the cell represents.
     */
    groupSummaryItems?: Array<{ name?: string, value?: any }>;
    /**
     * The type of the cell's row.
     */
    rowType?: string;
    /**
     * The identifier of the total summary item that the cell represents.
     */
    totalSummaryItemName?: string;
    /**
     * The cell's raw value.
     */
    value?: any;
}

/**
 * A PivotGrid cell to be exported to Excel.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ExcelPivotGridCell extends dxPivotGridPivotGridCell {
    /**
     * The area to which the cell belongs.
     */
    area?: string;
    /**
     * A zero-based index that indicates the position of the cell's row.
     */
    rowIndex?: number;
    /**
     * A zero-based index that indicates the position of the cell's column.
     */
    columnIndex?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface CellAddress {
    /**
     * The index of a row that contains the cell.
     */
    row?: number;
    /**
     * The index of a column that contains the cell.
     */
    column?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface CellRange {
    /**
     * Coordinates of the top left cell.
     */
    from?: CellAddress;
    /**
     * Coordinates of the bottom right cell.
     */
    to?: CellAddress;
}

/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ExcelExportBaseProps {
    /**
     * An Excel worksheet to which the grid should be exported.
     */
    worksheet?: object;
    /**
     * A cell used as a start position for export.
     */
    topLeftCell?: CellAddress | string;
    /**
     * Specifies whether Excel columns should have the same width as their source UI component's columns.
     */
    keepColumnWidths?: boolean;
    /**
     * Configures the load panel.
     */
    loadPanel?: ExportLoadPanel;
}

/**
 * Properties that can be passed to the exportDataGrid(options) method from the excelExporter module.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ExcelExportDataGridProps extends ExcelExportBaseProps {
    /**
     * A DataGrid instance. This setting is required.
     */
    component?: dxDataGrid;
    /**
     * Specifies whether to export only selected rows.
     */
    selectedRowsOnly?: boolean;
    /**
     * Specifies whether to enable Excel filtering in the document.
     */
    autoFilterEnabled?: boolean;
    /**
     * Customizes an Excel cell after creation.
     */
    customizeCell?: ((options: { gridCell?: ExcelDataGridCell, excelCell?: any}) => any);
}

/**
 * Properties that can be passed to the exportPivotGrid(options) method from the excelExporter module.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ExcelExportPivotGridProps extends ExcelExportBaseProps {
    /**
     * A PivotGrid instance. This setting is required.
     */
    component?: dxPivotGrid;
    /**
     * 
     */
    customizeCell?: ((options: { pivotCell?: ExcelPivotGridCell, excelCell?: any}) => any);
}

/**
 * Exports grid data to Excel.
 */
export function exportDataGrid(options: ExcelExportDataGridProps): Promise<CellRange> & JQueryPromise<CellRange>;

/**
 * Exports pivot grid data to Excel.
 */
export function exportPivotGrid(options: ExcelExportPivotGridProps): Promise<CellRange> & JQueryPromise<CellRange>;
