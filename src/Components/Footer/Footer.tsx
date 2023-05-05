import styles from'./Footer.module.css';

export function Footer(){
  return (
<footer >
  <span className={styles.footer__text}>
    Feito com ♥ por
    <a href="https://github.com/EstevaoH" target="_blank">Estevão Henrique</a>
  </span>
</footer>
  )
}