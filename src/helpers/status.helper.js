/* import React from 'react'
import { Loc } from 'redux-react-i18n'; */

export const statusHelper = {
    getStatus
}

function getStatus(n) {
    switch (n) {
        case 0:
            return "в очереди"//<Loc locKey="orders.table.statuses.queue" />;
        case 1:
            return "выполняется"//<Loc locKey="orders.table.statuses.execute" />;
        case 2:
            return "оплачен"//<Loc locKey="orders.table.statuses.paid" />;
        case 3:
            return "отменен"//<Loc locKey="orders.table.statuses.canceled" />;
        default:
            break;
    }
}