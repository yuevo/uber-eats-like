import React from 'react';

// components
import { DialogContent, Dialog, DialogTitle } from '@material-ui/core';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Buttons/OrderButton' was resolved to '/U... Remove this comment to see the full error message
import { OrderButton } from './Buttons/OrderButton';

export const NewOrderConfirmDialog = ({
  isOpen,
  onClose,
  existingRestaurantName, // 他店舗の名前
  newRestaurantName,      // いま選択した店舗の名前
  onClickSubmit,           // 仮注文の置き換えAPIを呼ぶ
}) => (
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Dialog
    open={isOpen}
    onClose={onClose}
    maxWidth="xs"
  >
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <DialogTitle>
      新規注文を開始しますか？
    </DialogTitle>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <DialogContent>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <p>
        {
          `ご注文に ${existingRestaurantName} の商品が含まれています。
          新規の注文を開始して ${newRestaurantName} の商品を追加してください。`
        }
      </p>
      {/* 先ほど作ったOrderButtonをここで使用 */}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <OrderButton onClick={onClickSubmit}>
        新規注文
      </OrderButton>
    </DialogContent>
  </Dialog>
);
