import React, { useState, useEffect } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const expirationTime = new Date(expiryDate);
      const difference = expirationTime - now;

      if (difference > 0) {
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ expired: true });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return timeLeft.expired ? (
    <span>Expired</span>
  ) : (
    <span>
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
};

export default CountdownTimer;