import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  amount: number;
  prefix?: string;
  className?: string;
}

export const AnimatedRupee: React.FC<Props> = ({ amount, prefix = '₹', className = '' }) => {
  const [displayAmount, setDisplayAmount] = useState<number>(amount);

  useEffect(() => {
    if (displayAmount === amount) return;

    const start = displayAmount;
    const end = amount;
    const duration = 350; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * ease);
      setDisplayAmount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayAmount(end);
      }
    };

    const rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [amount, displayAmount]);

  return (
    <span className={`inline-flex items-baseline font-mono-numbers ${className}`}>
      <span>{prefix}</span>
      <span>{displayAmount.toLocaleString()}</span>
    </span>
  );
};
