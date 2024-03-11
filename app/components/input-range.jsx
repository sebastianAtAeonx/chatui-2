import * as React from "react"
import styles from "./input-range.module.scss"

export function InputRange({
  onChange,
  title,
  value,
  className,
  min,
  max,
  step
}) {
  return (
    <div className={styles["input-range"] + ` ${className ?? ""}`}>
      {title || value}
      <input
        type="range"
        title={title}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      ></input>
    </div>
  )
}
