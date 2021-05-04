/**
* DevExtreme (pdf_exporter.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxDataGrid, { dxDataGridColumn } from './ui/data_grid';
import { ExportLoadPanel } from './exporter/export_load_panel';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface PdfDataGridCell {
    /**
     * 
     */
    column?: dxDataGridColumn;
    /**
     * 
     */
    data?: any;
    /**
     * 
     */
    groupIndex?: number;
    /**
     * 
     */
    groupSummaryItems?: Array<{ name?: string, value?: any }>;
    /**
     * 
     */
    rowType?: string;
    /**
     * 
     */
    totalSummaryItemName?: string;
    /**
     * 
     */
    value?: any;
}

/**
 * Properties that can be passed as a parameter to the exportDataGrid(options) method from the pdfExporter module.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface PdfExportDataGridProps {
     /**
      * A jsPDF instance. This setting is required.
      */
    jsPDFDocument?: object;
     /**
      * 
      */
    autoTableOptions?: object;
    /**
     * A DataGrid instance. This setting is required.
     */
    component?: dxDataGrid;
    /**
     * Specifies whether or not to export only selected rows.
     */
    selectedRowsOnly?: boolean;
    /**
     * Specifies whether columns in the PDF file should have the same width as their source UI component's columns.
     */
    keepColumnWidths?: boolean;
    /**
     * Customizes a cell in PDF after creation.
     */
    customizeCell?: ((options: { gridCell?: PdfDataGridCell, pdfCell?: any}) => any);
     /**
      * 
      */
    loadPanel?: ExportLoadPanel;
}

/**
 * [tags] ctp Exports grid data to a PDF file.
 */
export function exportDataGrid(options: PdfExportDataGridProps): Promise<void> & JQueryPromise<void>;
