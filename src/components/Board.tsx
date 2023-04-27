import { useCallback, useEffect, useRef, useState } from 'react';

import Tile from './Tile';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { type Point } from '@/types/Models';
import { Direction } from '@/types/Direction';
import { moveAction } from '@/store/action';
import { type BoardType } from '@/utils/board';
import { type Animation, AnimationType } from '@/types/Animations';
import Overlay from './Overlay';

const Board = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.app.board);
  const boardSize = useAppSelector((state) => state.app.boardSize);
  const animations = useAppSelector((state) => state.app.animations);
  const startPointerLocation = useRef<Point>();
  const currentPointerLocation = useRef<Point>();

  const animationDuration = 150;

  const onMove = useCallback(
    (direction: Direction) => dispatch(moveAction(direction)),
    [dispatch],
  );

  const [renderedBoard, setRenderedBoard] = useState(board);
  const [renderedAnimations, setRenderedAnimations] = useState<Animation[]>([]);
  const lastBoard = useRef<BoardType>([...board]);
  const animationTimeout = useRef<number>();

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      e.preventDefault();

      switch (e.key) {
        case 'ArrowDown':
          onMove(Direction.DOWN);
          break;
        case 'ArrowUp':
          onMove(Direction.UP);
          break;
        case 'ArrowLeft':
          onMove(Direction.LEFT);
          break;
        case 'ArrowRight':
          onMove(Direction.RIGHT);
          break;
      }
    };

    window.addEventListener('keydown', keydownListener);

    return () => {
      window.removeEventListener('keydown', keydownListener);
    };
  }, [onMove]);

  const finishPointer = useCallback(
    (a: Point, b: Point) => {
      const distance = Math.sqrt((b.y - a.y) ** 2 + (b.x - a.x) ** 2);
      if (distance < 20) {
        return;
      }

      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      if (angle < -135 || angle > 135) {
        onMove(Direction.LEFT);
      } else if (angle < -45) {
        onMove(Direction.UP);
      } else if (angle < 45) {
        onMove(Direction.RIGHT);
      } else if (angle < 135) {
        onMove(Direction.DOWN);
      }
    },
    [onMove],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) {
      const point: Point = { x: touch.pageX, y: touch.pageY };
      startPointerLocation.current = point;
    }
  }, []);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) {
      const point: Point = { x: touch.pageX, y: touch.pageY };
      currentPointerLocation.current = point;
    }
  }, []);
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (startPointerLocation.current && currentPointerLocation.current) {
        finishPointer(
          startPointerLocation.current,
          currentPointerLocation.current,
        );
      }

      startPointerLocation.current = undefined;
      currentPointerLocation.current = undefined;
    },
    [finishPointer],
  );

  const onMouseStart = useCallback((e: React.MouseEvent) => {
    const point: Point = { x: e.pageX, y: e.pageY };
    startPointerLocation.current = point;
  }, []);
  const onMouseEnd = useCallback(
    (e: React.MouseEvent) => {
      if (startPointerLocation.current) {
        finishPointer(startPointerLocation.current, { x: e.pageX, y: e.pageY });
        startPointerLocation.current = undefined;
      }
    },
    [finishPointer],
  );

  useEffect(() => {
    if (!animations) {
      setRenderedBoard([...board]);
      return;
    }

    const moveAnimations = animations.filter(
      (animation) => animation.type === AnimationType.MOVE,
    );
    const otherAnimations = animations.filter(
      (animation) => animation.type !== AnimationType.MOVE,
    );

    if (moveAnimations.length > 0) {
      setRenderedBoard(lastBoard.current);
      setRenderedAnimations(moveAnimations);

      clearTimeout(animationTimeout.current);
      animationTimeout.current = setTimeout(() => {
        setRenderedAnimations(otherAnimations);
        setRenderedBoard([...board]);
      }, animationDuration) as unknown as number;
    } else {
      setRenderedAnimations(otherAnimations);
      setRenderedBoard([...board]);
    }

    lastBoard.current = [...board];
  }, [animations, board, setRenderedBoard, setRenderedAnimations]);

  return (
    <div className="relative">
      <div
        className={`border-3 grid touch-none select-none gap-4 rounded-md bg-[#bbada0] p-5`}
        onMouseDown={onMouseStart}
        onMouseUp={onMouseEnd}
        onMouseLeave={onMouseEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        // Below was written instead of inline style because issues with the grid columns.
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        }}
      >
        {renderedBoard.map((value, i) => (
          <Tile
            value={value}
            key={i}
            animations={renderedAnimations?.filter(
              (animation) => animation.index === i,
            )}
          />
        ))}
      </div>
      <Overlay />
    </div>
  );
};

export default Board;
