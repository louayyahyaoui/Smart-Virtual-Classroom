/**
* DevExtreme (ui/gantt.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../core/element';

import {
    event
} from '../events/index';

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    dxTreeListColumn
} from './tree_list';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

import {
    dxToolbarItem
} from './toolbar';

import {
    dxContextMenuItem
} from './context_menu';

import {
    template
} from '../core/templates/template';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxGanttOptions extends WidgetOptions<dxGantt> {
    /**
     * Specifies whether users can select tasks in the Gantt.
     */
    allowSelection?: boolean;
    /**
     * An array of columns in the Gantt.
     */
    columns?: Array<dxTreeListColumn | string>;
    /**
     * Configures dependencies.
     */
    dependencies?: { dataSource?: Array<any> | DataSource | DataSourceOptions, keyExpr?: string | Function, predecessorIdExpr?: string | Function, successorIdExpr?: string | Function, typeExpr?: string | Function };
    /**
     * Configures edit properties.
     */
    editing?: { allowDependencyAdding?: boolean, allowDependencyDeleting?: boolean, allowResourceAdding?: boolean, allowResourceDeleting?: boolean, allowResourceUpdating?: boolean, allowTaskResourceUpdating?: boolean, allowTaskAdding?: boolean, allowTaskDeleting?: boolean, allowTaskUpdating?: boolean, enabled?: boolean };
    /**
     * Configures validation properties.
     */
    validation?: { validateDependencies?: boolean, autoUpdateParentTasks?: boolean };
    /**
     * A function that is executed after users select a task or clear its selection.
     */
    onSelectionChanged?: ((e: { component?: dxGantt, element?: dxElement, model?: any, selectedRowKey?: any }) => any);
    /**
     * A function that is executed after a custom command item was clicked. Allows you to implement a custom command's functionality.
     */
    onCustomCommand?: ((e: { component?: dxGantt, element?: dxElement, name?: string }) => any);    
        /**
         * A function that is executed before the context menu is rendered.
         */
    onContextMenuPreparing?: ((e: { component?: dxGantt, element?: dxElement, cancel?: boolean, event?: event, targetKey?: any, targetType?: string, data?: any, items?: Array<any> }) => any);   
    /**
     * A function that is executed before a task is inserted.
     */
    onTaskInserting?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, values?: any }) => any);
    /**
     * A function that is executed when a task is inserted.
     */
    onTaskInserted?: ((e: { component?: dxGantt, element?: dxElement, model?: any, values?: any, key?: any }) => any);
    /**
     * A function that is executed before a task is deleted.
     */
    onTaskDeleting?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, values?: any, key?: any }) => any);
    /**
     * A function that is executed when a task is deleted.
     */
    onTaskDeleted?: ((e: { component?: dxGantt, element?: dxElement, model?: any, values?: any, key?: any }) => any);
    /**
     * A function that is executed before a task is updated.
     */
    onTaskUpdating?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, newValues?: any, values?: any, key?: any }) => any);
    /**
     * A function that is executed when a task is updated.
     */
    onTaskUpdated?: ((e: { component?: dxGantt, element?: dxElement, model?: any, values?: any, key?: any }) => any);
    /**
     * A function that is executed before a task is moved.
     */
    onTaskMoving?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, newValues?: any, values?: any, key?: any }) => any);
    /**
     * A function that is executed before the edit dialog is shown.
     */
    onTaskEditDialogShowing?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, values?: any, key?: any, readOnlyFields?: Array<string>, hiddenFields?: Array<string> }) => any);
    /**
     * A function that is executed before a dependency is inserted.
     */
    onDependencyInserting?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, values?: any }) => any);
    /**
     * A function that is executed when a dependency is inserted.
     */
    onDependencyInserted?: ((e: { component?: dxGantt, element?: dxElement, model?: any, values?: any, key?: any }) => any);
    /**
     * A function that is executed before a dependency is deleted.
     */
    onDependencyDeleting?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, values?: any, key?: any }) => any);
    /**
     * A function that is executed when a dependency is deleted.
     */
    onDependencyDeleted?: ((e: { component?: dxGantt, element?: dxElement, model?: any, values?: any, key?: any }) => any);
    /**
     * A function that is executed before a resource is inserted.
     */
    onResourceInserting?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, values?: any }) => any);
    /**
     * A function that is executed when a resource is inserted.
     */
    onResourceInserted?: ((e: { component?: dxGantt, element?: dxElement, model?: any, values?: any, key?: any }) => any);
    /**
     * A function that is executed before a resource is deleted.
     */
    onResourceDeleting?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, values?: any, key?: any }) => any);
     /**
      * A function that is executed when a resource is deleted.
      */
    onResourceDeleted?: ((e: { component?: dxGantt, element?: dxElement, model?: any, values?: any, key?: any }) => any);
    /**
     * A function that is executed before a resource is assigned to a task.
     */
    onResourceAssigning?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, values?: any }) => any);
     /**
      * A function that is executed when a resource is assigned to a task.
      */
    onResourceAssigned?: ((e: { component?: dxGantt, element?: dxElement, model?: any, values?: any, key?: any }) => any);
    /**
     * A function that is executed before a resource is unassigned from a task.
     */
    onResourceUnassigning?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, values?: any, key?: any }) => any);
     /**
      * A function that is executed when a resource is unassigned from a task.
      */
    onResourceUnassigned?: ((e: { component?: dxGantt, element?: dxElement, model?: any, values?: any, key?: any }) => any);
    /**
     * A function that is executed when a user clicks a task.
     */
    onTaskClick?: ((e: { component?: dxGantt, element?: dxElement, model?: any, event?: event, key?: any, data?: any }) => any);
    /**
     * A function that is executed when a user double-clicks a task.
     */
    onTaskDblClick?: ((e: { component?: dxGantt, element?: dxElement, model?: any, cancel?: boolean, event?: event, key?: any, data?: any }) => any);
    /**
     * Configures resource assignments.
     */
    resourceAssignments?: { dataSource?: Array<any> | DataSource | DataSourceOptions, keyExpr?: string | Function, resourceIdExpr?: string | Function, taskIdExpr?: string | Function };
    /**
     * Configures task resources.
     */
    resources?: { dataSource?: Array<any> | DataSource | DataSourceOptions, keyExpr?: string | Function, textExpr?: string | Function };
    /**
     * Specifies the zoom level of tasks in the Gantt chart.
     */
    scaleType?: 'auto' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'quarters' | 'years';
    /**
     * Allows you to select a row or determine which row is selected.
     */
    selectedRowKey?: any;
    /**
     * Specifies whether to display task resources.
     */
    showResources?: boolean;
    /**
     * Specifies whether to show/hide horizontal faint lines that separate tasks.
     */
    showRowLines?: boolean;
    /**
     * Specifies the width of the task list in pixels.
     */
    taskListWidth?: number;
    /**
     * Specifies a task's title position.
     */
    taskTitlePosition?: 'inside' | 'outside' | 'none';
    /**
     * Specifies the first day of a week.
     */
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Configures tasks.
     */
    tasks?: { dataSource?: Array<any> | DataSource | DataSourceOptions, endExpr?: string | Function, keyExpr?: string | Function, parentIdExpr?: string | Function, progressExpr?: string | Function, startExpr?: string | Function, titleExpr?: string | Function };
    /**
     * Configures toolbar settings.
     */
    toolbar?: dxGanttToolbar;
    /**
     * Configures the context menu settings.
     */
    contextMenu?: dxGanttContextMenu;
    /**
     * Configures strip lines.
     */
    stripLines?: Array<dxGanttStripLine>;
    /**
     * Specifies custom content for the task tooltip.
     */
    taskTooltipContentTemplate?: template | ((container: dxElement, task: any) => string | Element | JQuery);
    /**
     * Specifies the root task's identifier.
     */
    rootValue?: any;
}
/**
 * The Gantt is a UI component that displays the task flow and dependencies between tasks.
 */
export default class dxGantt extends Widget {
    constructor(element: Element, options?: dxGanttOptions)
    constructor(element: JQuery, options?: dxGanttOptions)
    /**
     * Gets the task data.
     */
    getTaskData(key: any): any;
    /**
     * Gets the dependency data.
     */
    getDependencyData(key: any): any;
    /**
     * Gets the resource data.
     */
    getResourceData(key: any): any;
    /**
     * Gets the resource assignment data.
     */
    getResourceAssignmentData(key: any): any;
    /**
     * Inserts a new task.
     */
    insertTask(data: any): void;
    /**
     * Deletes a task.
     */
    deleteTask(key: any): void;
    /**
     * Updates the task data.
     */
    updateTask(key: any, data: any): void;
    /**
     * Inserts a new dependency.
     */
    insertDependency(data: any): void;
    /**
     * Deletes a dependency.
     */
    deleteDependency(key: any): void;
    /**
     * Inserts a new resource.
     */
    insertResource(data: any,  taskKeys?: Array<any>): void;
    /**
     * Deletes a resource.
     */
    deleteResource(key: any): void;
    /**
     * Assigns a resource to a task.
     */
    assignResourceToTask(resourceKey: any, taskKey: any): void;
    /**
     * Removes a resource from the task.
     */
    unassignResourceFromTask(resourceKey: any, taskKey: any): void;
    /**
     * Gets resources assigned to a task.
     */
    getTaskResources(key: any): Array<any>;
    /**
     * 
     */
    getVisibleTaskKeys(): Array<any>;
    /**
     * 
     */
    getVisibleDependencyKeys(): Array<any>;
    /**
     * 
     */
    getVisibleResourceKeys(): Array<any>;
    /**
     * 
     */
    getVisibleResourceAssignmentKeys(): Array<any>;
    /**
     * 
     */
    updateDimensions(): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxGanttToolbar {
    /**
     * Configures toolbar items' settings.
     */
    items?: Array<dxGanttToolbarItem | 'separator' | 'undo' | 'redo' | 'expandAll' | 'collapseAll' | 'addTask' | 'deleteTask' | 'zoomIn' | 'zoomOut'>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxGanttContextMenu {
    /**
     * Specifies whether the context menu is enabled in the UI component.
     */
    enabled?: boolean
    /**
     * Configures context menu item settings.
     */
    items?: Array<dxGanttContextMenuItem | 'undo' | 'redo' | 'expandAll' | 'collapseAll' | 'addTask' | 'deleteTask' | 'zoomIn' | 'zoomOut' | 'deleteDependency' | 'taskDetails'>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxGanttToolbarItem extends dxToolbarItem {
    /**
     * Specifies the toolbar item's name.
     */
    name?: 'separator' | 'undo' | 'redo' | 'expandAll' | 'collapseAll' | 'addTask' | 'deleteTask' | 'zoomIn' | 'zoomOut' | string;
    /**
     * Specifies the toolbar item's location.
     */
    location?: 'after' | 'before' | 'center';
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxGanttContextMenuItem extends dxContextMenuItem {
    /**
     * Specifies the context menu item name.
     */
    name?: 'undo' | 'redo' | 'expandAll' | 'collapseAll' | 'addTask' | 'deleteTask' | 'zoomIn' | 'zoomOut' | 'deleteDependency' | 'taskDetails' | string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxGanttStripLine {
    /**
     * Specifies the name of the cascading style sheet (CSS) class associated with the strip line.
     */
    cssClass?: string;
    /**
     * Specifies the end point of the strip line.
     */
    end?: Date | number | string | (() => Date | number | string);
    /**
     * Specifies the start point of the strip line.
     */
    start?: Date | number | string | (() => Date | number | string);
    /**
     * Specifies the strip line's title.
     */
    title?: string;
}

declare global {
interface JQuery {
    dxGantt(): JQuery;
    dxGantt(options: 'instance'): dxGantt;
    dxGantt(options: string): any;
    dxGantt(options: string, ...params: any[]): any;
    dxGantt(options: dxGanttOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxGanttOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxGanttOptions;
