import { type Direction } from '@/types/Direction';

import { ActionType } from '@/types/ActionType';
import { type ActionModel } from '@/types/Models';

function resetAction(size: number): ActionModel {
  return {
    type: ActionType.RESET,
    value: size,
  };
}

function undoAction(): ActionModel {
  return {
    type: ActionType.UNDO,
  };
}

function moveAction(direction: Direction): ActionModel {
  return {
    type: ActionType.MOVE,
    value: direction,
  };
}

function dismissAction(): ActionModel {
  return {
    type: ActionType.DISMISS,
  };
}

export { resetAction, undoAction, moveAction, dismissAction };
