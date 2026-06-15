import style from './Footer.module.css'

type FooterProps = { 
    title: string, 
    subtitle: string

}

export function DesingFooter({title, subtitle}: FooterProps) {
    return (
        <div className={style.footer}> 
           <h1>{title}</h1>
        <p>{subtitle}</p> 
        </div>
        
    )
}
