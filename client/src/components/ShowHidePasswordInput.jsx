import { useState, useRef } from 'react';

export default function ShowHidePasswordInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder = 'Password',
  autoComplete = 'current-password',
  className = '',
  hasError = false,
  ariaDescribedBy
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const toggleVisibility = () => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart;
      const end = inputRef.current.selectionEnd;
      setShowPassword((prev) => !prev);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(start, end);
          inputRef.current.focus();
        }
      }, 0);
    } else {
      setShowPassword((prev) => !prev);
    }
  };

  return (
    <div className="input-wrapper">
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        className={`form-input form-input-has-toggle ${hasError ? 'form-input-error' : ''} ${className}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-describedby={ariaDescribedBy}
      />
      <button
        type="button"
        className="password-toggle-btn"
        onClick={toggleVisibility}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        tabIndex={0}
      >
        {showPassword ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
