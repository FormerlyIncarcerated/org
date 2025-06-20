import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { clsx } from 'clsx';
import { AlertCircle } from 'lucide-react';

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactElement;
  className?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  registration?: UseFormRegisterReturn;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  registration?: UseFormRegisterReturn;
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  registration?: UseFormRegisterReturn;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required = false,
  children,
  className,
}) => {
  return (
    <div className={clsx('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      {React.cloneElement(children, {
        className: clsx(
          children.props.className,
          error && 'border-destructive focus:ring-destructive/50'
        ),
      })}
      
      {(error || helperText) && (
        <div className="flex items-center gap-1 text-sm">
          {error ? (
            <>
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-destructive">{error}</span>
            </>
          ) : (
            <span className="text-muted-foreground">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  placeholder,
  registration,
  className,
  ...props
}) => {
  return (
    <FormField label={label} error={error} helperText={helperText}>
      <select
        className={clsx(
          'flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...registration}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
};

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  registration,
  className,
  ...props
}) => {
  return (
    <FormField label={label} error={error} helperText={helperText}>
      <textarea
        className={clsx(
          'flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-all duration-200',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-vertical min-h-[80px]',
          className
        )}
        {...registration}
        {...props}
      />
    </FormField>
  );
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  registration,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          className={clsx(
            'mt-1 h-4 w-4 rounded border border-border text-primary',
            'focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...registration}
          {...props}
        />
        <label className="text-sm text-foreground cursor-pointer">
          {label}
        </label>
      </div>
      
      {(error || helperText) && (
        <div className="flex items-center gap-1 text-sm ml-6">
          {error ? (
            <>
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-destructive">{error}</span>
            </>
          ) : (
            <span className="text-muted-foreground">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default FormField;
