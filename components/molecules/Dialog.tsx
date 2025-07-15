import React, { CSSProperties, ReactNode, useEffect } from 'react';
import { DialogType } from '../../enum/Dialog';
import { useDialogStore } from '../../store/dialogStore';
import Button from '../atom/Button';
import { DialogBody, DialogFooter, DialogHeader, DialogInner, DialogWrapper } from '../../styles/components/molecules/Dialog';

type DialogProps = {
    children: ReactNode;
    type: DialogType;
    title?: string;
    style?: CSSProperties;
    width?: string;
    height?: string;
    confirmText?: string;
    cancelText?: string;
    onClickConfirm?: React.MouseEventHandler<HTMLButtonElement>;
    onClickCancel?: () => void;
    showBtn?: boolean;
};
const Dialog = ({
    children,
    type,
    title,
    style,
    width = '320px',
    height = '300px',
    confirmText = '확인',
    cancelText = '닫기',
    onClickConfirm,
    onClickCancel,
    showBtn,
}: DialogProps) => {
    const { selectedDialogs, closeDialog } = useDialogStore();
    const isOpenDialog = selectedDialogs.some((dialog) => dialog.dialogType === type && dialog.isOpen);
    useEffect(() => {
        console.log(isOpenDialog);
    }, [isOpenDialog]);

    return (
        <DialogWrapper $isOpen={isOpenDialog} style={style}>
            <DialogInner $width={width} $height={height}>
                <DialogHeader>{title}</DialogHeader>
                <DialogBody>{children}</DialogBody>
                <DialogFooter>
                    {showBtn && (
                        <Button
                            style={{
                                lineHeight: '16px',
                                fontWeight: '500',
                            }}
                            width="80px"
                            height="26px"
                            border="none"
                            padding="0"
                            color="#FFFFFF"
                            backgroundColor="#3E66FB"
                            borderRadius="0"
                            fontSize="13px"
                            onClick={onClickConfirm}
                        >
                            {confirmText}
                        </Button>
                    )}
                    <Button
                        style={{
                            lineHeight: '16px',
                            fontWeight: '500',
                        }}
                        width="80px"
                        height="26px"
                        border="none"
                        padding="0"
                        color="#FFFFFF"
                        backgroundColor="#3E66FB"
                        borderRadius="0"
                        fontSize="13px"
                        onClick={onClickCancel}
                    >
                        {cancelText}
                    </Button>
                </DialogFooter>
            </DialogInner>
        </DialogWrapper>
    );
};

export default Dialog;
