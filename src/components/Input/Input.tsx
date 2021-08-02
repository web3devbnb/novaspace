import React from 'react'
import styled from 'styled-components'

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  startAdornment?: React.ReactNode
  value: string
  placeholder?: string
  inputMode?: 'text' | 'none' | 'search' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal'
  pattern?: string
  error?: boolean
}

const Input: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value, ...props }) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput placeholder={placeholder} value={value} onChange={onChange} {...props} />
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  )
}

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.input};
  border-radius: ${(props) => props.theme.radii.default};
  display: flex;
  height: 72px;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
`

const StyledInput = styled.input<InputProps>`
  width: ${({ inputMode }) => (inputMode === 'decimal' ? '0px' : '100%')};
  background: none;
  border: 0;
  color: ${({ error, theme }) => (error ? theme.colors.failure : theme.colors.text)};
  font-size: 18px;
  flex: 1 1 auto;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
`

export default Input
