import React from 'react';
import md5 from 'md5';

function Gravatar({ email, size = 50 }) {
  const hash = md5(email.toLowerCase());
  const src = `https://www.gravatar.com/avatar/${hash}?s=${size}`;

  return (
    <img
      src={src}
      alt="Gravatar"
      className="rounded-full"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}

export default Gravatar;
