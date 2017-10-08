import Component from 'inferno-component'

import Dialog from '../../../materialdesign/components/Dialog'

export default class AddCategoryDialog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      dialogItems: [
        {
          text: 'ZAMNIJ',
          onClick: this.onCancelButtonClick
        }
      ]
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  onCancelButtonClick = (e) => {
    this.elements.dialog.toggle(false)
  }

  render () {
    return (
      <div className='info-dialog' ref={(e) => this.elements.root = e}>
        <Dialog title='Informacje' ref={(e) => this.elements.dialog = e} items={this.state.dialogItems}>
          Blog jest wizytówką klasy 3B
          <a href='http://www.gimnazjum.opole.pl/' target='_blank'>gimnazjum językowego imienia Einsteina WSERO w Opolu.</a>
          <br />
          <br />
          Blog został napisana na frameworku <a href='https://github.com/infernojs/inferno' target='_blank'>InfernoJS</a>
          <br />
          Użyte technologie oraz frameworki: NodeJS, SASS, InfernoJS, <a href='https://github.com/Nersent/MaterialInferno' target='_blank'>MaterialInferno</a>
          <br />
          <br />
          Strona jest open-source, czyli kod jest opublikowany na licencji MIT <a href='https://github.com/xNerhu/MaterialBlog' target='_blank'>LINK</a>
          <br />
          <br />
          E-Mail: xnerhu22@onet.pl
          <br />
          Telefon: +48 731944979
          <br />
          GitHub: <a href='http://www.github.com/xNerhu/' target='_blank'>http://www.github.com/xNerhu/</a>
          <br />
          <br />
          Przy moderacji postów pomaga: Michał Buczek
          <br />
          <br />
          <br />
          Blog został napisany przez <a href='http://www.github.com/xNerhu/' target='_blank'>Mikołaja Palkiewicza</a>
        </Dialog>
      </div>
    )
  }
}
