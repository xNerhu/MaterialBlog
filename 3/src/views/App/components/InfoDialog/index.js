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
          <br />
          Technologie: HTML5, SASS, JavaScript, Node.JS, ReactJS
          <br />
          Frameworki: <a href='https://github.com/Nersent/material-react' target='_blank'>Material-React</a>
          <br />
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
          Przy moderacji postów pomaga: <span className='bold'>Michał Buczek</span>
          <br />
          <br />
          © 2013-2017 <a href='http://www.nersent.tk' target='_blank'>Nersent</a>
        </Dialog>
      </div>
    )
  }
}
