import { CssClass } from './CssClass.model';
import { Column } from './Column.model';
import { Actions } from './Actions.model';

export interface Configs {
    css: CssClass;
    columns?: Column[];
    actions: Actions;
    data_loading_text: string;
    group_by: string[];
    group_by_header: string[];
    group_by_width: string;
    row_class_function: Function;
    row_edit_function: Function;
    row_delete_function: Function;
}
