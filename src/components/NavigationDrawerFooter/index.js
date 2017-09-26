import Component from 'inferno-component'

export default class NavigationDrawerFooter extends Component {
  render () {
    return (
      <div className='navigation-drawer-footer'>
        Strona używa <a href='http://wszystkoociasteczkach.pl/po-co-sa-ciasteczka/' target='_blank'>plików cookies</a>
        <br />
        <div className='copyright'>
          &copy; 2015-2018 <a href='http://www.nersent.tk' target='_blank'>Nersent <div className='nersent-logo' /></a>
        </div>
      </div>
    )
  }
}
