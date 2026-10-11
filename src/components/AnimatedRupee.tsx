import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  amount: number;
  prefix?: string;
  className?: string;
}

export const AnimatedRupee: React.FC<Props> = ({ amount, prefix = '₹', className = '' }) => {
  const [displayAmount, setDisplayAmount] = useState<number>(amount);
  const prevAmountRef = React.useRef<number>(amount);

  useEffect(() => {
    const start = prevAmountRef.current;
    const end = amount;
    if (start === end) return;

    const duration = 280; // ms
    let startTime: number | null = null;
    let rafId: number;

    const update = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * ease);
      setDisplayAmount(current);
      prevAmountRef.current = current;

      if (progress < 1) {
        rafId = requestAnimationFrame(update);
      } else {
        setDisplayAmount(end);
        prevAmountRef.current = end;
      }
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [amount]);

  return (
    <span
      className={`inline-flex items-baseline font-mono-numbers ${className}`}
      aria-label={`${prefix}${amount.toLocaleString()}`}
    >
      <span aria-hidden="true">{prefix}</span>
      <span aria-hidden="true">{displayAmount.toLocaleString()}</span>
    </span>
  );
};
