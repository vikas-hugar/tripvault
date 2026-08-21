import { useMemo } from 'react';

export default function PasswordStrengthMeter({ password }) {
  const analysis = useMemo(() => {
    const checks = {
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password)
    };

    const count = Object.values(checks).filter(Boolean).length;

    let label = 'Weak';
    let levelClass = 'strength-level-weak';
    let percentage = 20;

    if (password.length === 0) {
      label = '';
      percentage = 0;
    } else if (count <= 2) {
      label = 'Weak';
      levelClass = 'strength-level-weak';
      percentage = 33;
    } else if (count <= 4) {
      label = 'Medium';
      levelClass = 'strength-level-medium';
      percentage = 66;
    } else {
      label = 'Strong';
      levelClass = 'strength-level-strong';
      percentage = 100;
    }

    return { checks, count, label, levelClass, percentage };
  }, [password]);

  if (!password) return null;

  return (
    <div className="strength-meter" aria-live="polite">
      <div className="strength-header">
        <span>Password strength:</span>
        <span className={`strength-label ${analysis.levelClass}`}>
          {analysis.label}
        </span>
      </div>

      <div className="strength-bar-bg" role="progressbar" aria-valuenow={analysis.percentage} aria-valuemin="0" aria-valuemax="100" aria-label="Password strength">
        <div
          className={`strength-bar-fill ${analysis.levelClass}`}
          style={{ width: `${analysis.percentage}%` }}
        />
      </div>

      <div className="strength-checklist">
        <div className={`checklist-item ${analysis.checks.minLength ? 'checklist-item-met' : ''}`}>
          <CheckOrCircle isMet={analysis.checks.minLength} />
          <span>At least 8 chars</span>
        </div>
        <div className={`checklist-item ${analysis.checks.hasUpper ? 'checklist-item-met' : ''}`}>
          <CheckOrCircle isMet={analysis.checks.hasUpper} />
          <span>Uppercase letter</span>
        </div>
        <div className={`checklist-item ${analysis.checks.hasLower ? 'checklist-item-met' : ''}`}>
          <CheckOrCircle isMet={analysis.checks.hasLower} />
          <span>Lowercase letter</span>
        </div>
        <div className={`checklist-item ${analysis.checks.hasNumber ? 'checklist-item-met' : ''}`}>
          <CheckOrCircle isMet={analysis.checks.hasNumber} />
          <span>Number (0-9)</span>
        </div>
        <div className={`checklist-item ${analysis.checks.hasSpecial ? 'checklist-item-met' : ''}`}>
          <CheckOrCircle isMet={analysis.checks.hasSpecial} />
          <span>Special character</span>
        </div>
      </div>
    </div>
  );
}

function CheckOrCircle({ isMet }) {
  return isMet ? (
    <svg className="checklist-icon" viewBox="0 0 16 16" fill="currentColor">
      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.739a.75.75 0 0 1 1.04-.208Z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="checklist-icon" viewBox="0 0 16 16" fill="currentColor" opacity="0.4">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
