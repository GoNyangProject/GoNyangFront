import React, { useEffect, useRef, useState } from 'react';
import { TableWrapper, Tbody, Td, Th, Tr } from '../../styles/components/atom/Table';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import { useCheckedListStore } from '../../store/checkedListStore';

type TableColumn = { key: string; value: string };
type TableProps = {
    columns: TableColumn[];
    rows: any[];
    isCheckbox?: boolean;
    readOnly?: boolean;
    checkedList?: number[];
    clickKeys?: string[];
    onCellClick?: (key: string, rowData: any, event: React.MouseEvent<HTMLTableCellElement>) => void;
    onCheckedChange?: (newCheckedList: number[]) => void;
    onRowValueChange?: (rowIndex: number, key: string, value: string) => void;
    renderCustomCell?: (key: string, rowData: any, rowIndex: number) => React.ReactNode;
};

const Table = ({
    columns,
    rows,
    onRowValueChange,
    onCheckedChange,
    checkedList,
    clickKeys,
    onCellClick,
    renderCustomCell,
    readOnly,
    isCheckbox,
}: TableProps) => {
    const columnKeys = columns.map((column) => column.key);
    const [rowsValue, setRowsValue] = useState<any[]>(rows);
    const { setCheckedList } = useCheckedListStore();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setRowsValue(rows);
    }, [rows]);

    const handleClickTd = (key: string, rowIndex: number) => (event: React.MouseEvent<HTMLTableCellElement>) => {
        if (onCellClick) {
            onCellClick(key, rows[rowIndex], event);
        }
    };
    const handleChangeAllChecked = () => {
        if (checkedList?.length === rows.length && rows.length > 0) {
            if (onCheckedChange) onCheckedChange([]);
            setCheckedList([]);
        } else {
            const new_checked_list: number[] = rows.map((_: any, index: number) => index);
            setCheckedList(new_checked_list);
            if (onCheckedChange) onCheckedChange(new_checked_list);
        }
    };

    const handleRowsValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>, rowIndex: number, key: string) => {
        const { value } = event.target;
        const updatedRows = [...rowsValue];
        updatedRows[rowIndex] = { ...updatedRows[rowIndex], [key]: value };
        setRowsValue(updatedRows);

        if (onRowValueChange) {
            onRowValueChange(rowIndex, key, value);
        }
    };
    const handleChangeChecked = (checkedIndex: number) => () => {
        let deepcopy_checkedList = checkedList ? [...checkedList] : [];
        if (deepcopy_checkedList.includes(checkedIndex)) {
            deepcopy_checkedList = deepcopy_checkedList.filter((index: number) => index !== checkedIndex);
        } else {
            deepcopy_checkedList.push(checkedIndex);
        }
        setCheckedList(deepcopy_checkedList);
        if (onCheckedChange) {
            onCheckedChange(deepcopy_checkedList);
        }
    };

    return (
        <TableWrapper>
            <thead>
                <Tr>
                    {isCheckbox && (
                        <Th style={{ width: '50px' }}>
                            <Checkbox checked={checkedList && checkedList.length > 0 && checkedList.length === rows.length} onChange={handleChangeAllChecked} />
                        </Th>
                    )}
                    {columns.map((column: TableColumn) => (
                        <Th key={column.key}>{column.value}</Th>
                    ))}
                </Tr>
            </thead>
            <Tbody>
                {rows.map((row: any, rowIndex: number) => (
                    <Tr key={rowIndex}>
                        {isCheckbox && (
                            <Td key={0}>
                                <Checkbox value={rowIndex} checked={checkedList?.includes(rowIndex)} onChange={handleChangeChecked(rowIndex)} />
                            </Td>
                        )}
                        {columnKeys.map((key: string) => {
                            const shouldAddClickHandler = clickKeys?.includes(key);
                            let content;

                            if (renderCustomCell) {
                                const customContent = renderCustomCell(key, row, rowIndex);
                                if (customContent !== undefined) {
                                    content = customContent;
                                }
                            }

                            if (content === undefined) {
                                content = (
                                    <Textarea
                                        ref={textareaRef}
                                        resize={true}
                                        readOnly={readOnly}
                                        style={{
                                            textAlign: 'left',
                                            border: '0',
                                            color: '#808080',
                                            fontWeight: '300',
                                            boxSizing: 'border-box',
                                            backgroundColor: 'transparent',
                                            overflow: 'hidden',
                                        }}
                                        value={rowsValue[rowIndex] ? rowsValue[rowIndex][key] : ''}
                                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleRowsValueChange(event, rowIndex, key)}
                                    />
                                );
                            }

                            return (
                                <Td key={key} $isClick={shouldAddClickHandler} onClick={shouldAddClickHandler ? handleClickTd(key, rowIndex) : undefined}>
                                    {content}
                                </Td>
                            );
                        })}
                    </Tr>
                ))}
            </Tbody>
        </TableWrapper>
    );
};

export default Table;
