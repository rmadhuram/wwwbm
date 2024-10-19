import styles from "./thank-you.module.scss";

export default function ThankYou() {
  return <div className={styles["thank-you"]}>
    <h1>Thank you</h1>
    <h3>Your score will be emailed to you shortly</h3>
  </div>
}