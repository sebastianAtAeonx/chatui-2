/* eslint-disable @next/next/no-img-element */
import styles from "./ui-lib.module.scss"
import LoadingIcon from "../icons/three-dots.svg"
import CloseIcon from "../icons/close.svg"
import EyeIcon from "../icons/eye.svg"
import EyeOffIcon from "../icons/eye-off.svg"
import DownIcon from "../icons/down.svg"
import ConfirmIcon from "../icons/confirm.svg"
import CancelIcon from "../icons/cancel.svg"
import MaxIcon from "../icons/max.svg"
import MinIcon from "../icons/min.svg"

import Locale from "../locales"

import { createRoot } from "react-dom/client"
import React, { useEffect, useState } from "react"
import { IconButton } from "./button"

export function Popover(props) {
  return (
    <div className={styles.popover}>
      {props.children}
      {props.open && (
        <div className={styles["popover-mask"]} onClick={props.onClose}></div>
      )}
      {props.open && (
        <div className={styles["popover-content"]}>{props.content}</div>
      )}
    </div>
  )
}

export function Card(props) {
  return (
    <div className={styles.card + " " + props.className}>{props.children}</div>
  )
}

export function ListItem(props) {
  return (
    <div
      className={styles["list-item"] + ` ${props.className || ""}`}
      onClick={props.onClick}
    >
      <div className={styles["list-header"]}>
        {props.icon && <div className={styles["list-icon"]}>{props.icon}</div>}
        <div className={styles["list-item-title"]}>
          <div>{props.title}</div>
          {props.subTitle && (
            <div className={styles["list-item-sub-title"]}>
              {props.subTitle}
            </div>
          )}
        </div>
      </div>
      {props.children}
    </div>
  )
}

export function List(props) {
  return (
    <div className={styles.list} id={props.id}>
      {props.children}
    </div>
  )
}

export function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <LoadingIcon />
    </div>
  )
}

export function Modal(props) {
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === "Escape") {
        props.onClose?.()
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isMax, setMax] = useState(!!props.defaultMax)

  return (
    <div
      className={
        styles["modal-container"] + ` ${isMax && styles["modal-container-max"]}`
      }
    >
      <div className={styles["modal-header"]}>
        <div className={styles["modal-title"]}>{props.title}</div>

        <div className={styles["modal-header-actions"]}>
          <div
            className={styles["modal-header-action"]}
            onClick={() => setMax(!isMax)}
          >
            {isMax ? <MinIcon /> : <MaxIcon />}
          </div>
          <div
            className={styles["modal-header-action"]}
            onClick={props.onClose}
          >
            <CloseIcon />
          </div>
        </div>
      </div>

      <div className={styles["modal-content"]}>{props.children}</div>

      <div className={styles["modal-footer"]}>
        {props.footer}
        <div className={styles["modal-actions"]}>
          {props.actions?.map((action, i) => (
            <div key={i} className={styles["modal-action"]}>
              {action}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function showModal(props) {
  const div = document.createElement("div")
  div.className = "modal-mask"
  document.body.appendChild(div)

  const root = createRoot(div)
  const closeModal = () => {
    props.onClose?.()
    root.unmount()
    div.remove()
  }

  div.onclick = e => {
    if (e.target === div) {
      closeModal()
    }
  }

  root.render(<Modal {...props} onClose={closeModal}></Modal>)
}

export function Toast(props) {
  return (
    <div className={styles["toast-container"]}>
      <div className={styles["toast-content"]}>
        <span>{props.content}</span>
        {props.action && (
          <button
            onClick={() => {
              props.action?.onClick?.()
              props.onClose?.()
            }}
            className={styles["toast-action"]}
          >
            {props.action.text}
          </button>
        )}
      </div>
    </div>
  )
}

export function showToast(content, action, delay = 3000) {
  const div = document.createElement("div")
  div.className = styles.show
  document.body.appendChild(div)

  const root = createRoot(div)
  const close = () => {
    div.classList.add(styles.hide)

    setTimeout(() => {
      root.unmount()
      div.remove()
    }, 300)
  }

  setTimeout(() => {
    close()
  }, delay)

  root.render(<Toast content={content} action={action} onClose={close} />)
}

export function Input(props) {
  return (
    <textarea
      {...props}
      className={`${styles["input"]} ${props.className}`}
    ></textarea>
  )
}

export function PasswordInput(props) {
  const [visible, setVisible] = useState(false)

  function changeVisibility() {
    setVisible(!visible)
  }

  return (
    <div className={"password-input-container"}>
      <IconButton
        icon={visible ? <EyeIcon /> : <EyeOffIcon />}
        onClick={changeVisibility}
        className={"password-eye"}
      />
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={"password-input"}
      />
    </div>
  )
}

export function Select(props) {
  const { className, children, ...otherProps } = props
  return (
    <div className={`${styles["select-with-icon"]} ${className}`}>
      <select className={styles["select-with-icon-select"]} {...otherProps}>
        {children}
      </select>
      <DownIcon className={styles["select-with-icon-icon"]} />
    </div>
  )
}

export function showConfirm(content) {
  const div = document.createElement("div")
  div.className = "modal-mask"
  document.body.appendChild(div)

  const root = createRoot(div)
  const closeModal = () => {
    root.unmount()
    div.remove()
  }

  return new Promise(resolve => {
    root.render(
      <Modal
        title={Locale.UI.Confirm}
        actions={[
          <IconButton
            key="cancel"
            text={Locale.UI.Cancel}
            onClick={() => {
              resolve(false)
              closeModal()
            }}
            icon={<CancelIcon />}
            tabIndex={0}
            bordered
            shadow
          ></IconButton>,
          <IconButton
            key="confirm"
            text={Locale.UI.Confirm}
            type="primary"
            onClick={() => {
              resolve(true)
              closeModal()
            }}
            icon={<ConfirmIcon />}
            tabIndex={0}
            autoFocus
            bordered
            shadow
          ></IconButton>
        ]}
        onClose={closeModal}
      >
        {content}
      </Modal>
    )
  })
}

function PromptInput(props) {
  const [input, setInput] = useState(props.value)
  const onInput = value => {
    props.onChange(value)
    setInput(value)
  }

  return (
    <textarea
      className={styles["modal-input"]}
      autoFocus
      value={input}
      onInput={e => onInput(e.currentTarget.value)}
      rows={props.rows ?? 3}
    ></textarea>
  )
}

export function showPrompt(content, value = "", rows = 3) {
  const div = document.createElement("div")
  div.className = "modal-mask"
  document.body.appendChild(div)

  const root = createRoot(div)
  const closeModal = () => {
    root.unmount()
    div.remove()
  }

  return new Promise(resolve => {
    let userInput = value

    root.render(
      <Modal
        title={content}
        actions={[
          <IconButton
            key="cancel"
            text={Locale.UI.Cancel}
            onClick={() => {
              closeModal()
            }}
            icon={<CancelIcon />}
            bordered
            shadow
            tabIndex={0}
          ></IconButton>,
          <IconButton
            key="confirm"
            text={Locale.UI.Confirm}
            type="primary"
            onClick={() => {
              resolve(userInput)
              closeModal()
            }}
            icon={<ConfirmIcon />}
            bordered
            shadow
            tabIndex={0}
          ></IconButton>
        ]}
        onClose={closeModal}
      >
        <PromptInput
          onChange={val => (userInput = val)}
          value={value}
          rows={rows}
        ></PromptInput>
      </Modal>
    )
  })
}

export function showImageModal(img) {
  showModal({
    title: Locale.Export.Image.Modal,
    children: (
      <div>
        <img
          src={img}
          alt="preview"
          style={{
            maxWidth: "100%"
          }}
        ></img>
      </div>
    )
  })
}

export function Selector(props) {
  return (
    <div className={styles["selector"]} onClick={() => props.onClose?.()}>
      <div className={styles["selector-content"]}>
        <List>
          {props.items.map((item, i) => {
            const selected = props.defaultSelectedValue === item.value
            return (
              <ListItem
                className={styles["selector-item"]}
                key={i}
                title={item.title}
                subTitle={item.subTitle}
                onClick={() => {
                  props.onSelection?.([item.value])
                  props.onClose?.()
                }}
              >
                {selected ? (
                  <div
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: "var(--primary)",
                      borderRadius: 10
                    }}
                  ></div>
                ) : (
                  <></>
                )}
              </ListItem>
            )
          })}
        </List>
      </div>
    </div>
  )
}
