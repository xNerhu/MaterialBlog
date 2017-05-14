import React from 'react'

import Dialog from '../../../../imports/materialdesign/components/Dialog'
import Url from '../../../../helpers/Url'

export default class LoginDialog extends React.Component {
  /**
   * Shows dialog.
   */
  show = () => {
    this.refs.dialog.show()
    const param = '?tab=' + Url.getUrlParameter('tab') + '&action=info'
    window.history.pushState('', '', param)
  }

  /**
   * Hides dialog.
   */
  hide = () => {
    this.refs.dialog.hide()
    const param = '?tab=' + Url.getUrlParameter('tab')
    window.history.pushState('', '', param)
  }

  render () {
    var self = this

    const actionButtons = [
      {
        text: 'ZAMKNIJ',
        shadow: false,
        style: {},
        rippleStyle: {
          backgroundColor: '#2196f3'
        },
        foreground: '#2196f3',
        backgroundColor: 'transparent',
        onClick: self.hide
      }
    ]

    return (
      <div>
        <Dialog ref='dialog' title='Informacje' className='info-dialog' actionButtons={actionButtons}>
          Blog jest wzorowany na specjalnym stylu <a href='https://material.io/guidelines/' target='_blank'>Material Design</a>
          <br />
          Strona została napisana w nowej technologii Node.JS oraz ReactJS dzięki czemu szybko działa
          <br />
          Możesz zarejestrować się, by móc dodawać komentarze i otrzymać możliwość logowania się w innych aplikacjach
          <br />
          Technologie: HTML5, SASS, JavaScript, Node.JS, ReactJS
          <br />
          Frameworki: <a href='https://github.com/Nersent/material-react' target='_blank'>Material-React</a>
          <br />
          Blog jest open-source, czyli jego kod jest opublikowany. Kod źródłowy można znależć <a href='http://www.github.com/xNerhu22/MyClassBlog/tree/master/3' target='_blank'>tutaj</a>
          <br />
          <br />
          Strona jest wizytówką klasy 3B <a href='http://gimnazjum.opole.pl/' target='_blank'>Społecznego Językowego Gimnazjum im. Alberta Einsteina WSERO w Opolu</a>
          <br />
          <br />
          Unikalne odwiedziny: <span className='bold'>0</span>
          <br />
          Wszystkie odwiedziny: <span className='bold'>1</span>
          <br />
          <br />
          Bloga oraz panel napisał: <a href='http://www.github.com/xNerhu22/' target='_blank'>Mikołaj Palkiewicz</a>
          <br />
          Telefon: <span className='bold'>731944979</span>
          <br />
          E-Mail: <span className='bold'>xnerhu22@onet.pl</span>
          <br />
          Facebook: <a href='https://www.facebook.com/mikolaj.palkiewicz'>https://www.facebook.com/mikolaj.palkiewicz</a>
          <br />
          GitHub: <a href='http://www.github.com/xNerhu22/' target='_blank'>http://www.github.com/xNerhu22/</a>
          <br />
          <br />
          Przy moderacji postów pomaga: <span className='bold'>Michał Buczek</span>
          <br />
          Telefon:<span className='bold'>601203658</span>
          <br />
          E-Mail:
          <br />
          Facebook: <a href='https://www.facebook.com/profile.php?id=100004563640285'>https://www.facebook.com/profile.php?id=100004563640285</a>
          <br />
          <br />
          © 2013-2017 <a href='http://www.nersent.tk' target='_blank'>Nersent</a>
        </Dialog>
      </div>
    )
  }
}
