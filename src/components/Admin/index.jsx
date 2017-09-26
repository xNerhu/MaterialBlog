import React from 'react'
 
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Store from '../../store'

import NavigationDrawer from '../NavigationDrawer'
import Dashboard from '../Dashboard'
import NavItem from '../NavItem'
import EditPage from '../EditPage'

export default class Admin extends React.Component {
  render () {
    return (
      <div className='admin-panel'>
        <NavigationDrawer>
          <div className='header'>
            <div className='header-title'>
              Tytuł
            </div>
          </div>
          <NavItem>
            Strona główna
          </NavItem>
          <NavItem>
            Strony
          </NavItem>
          <NavItem>
            Posty
          </NavItem>
          <NavItem>
            Menu
          </NavItem>
        </NavigationDrawer>
        <div className='content'>
          <div className='toolbar'>
            <div className='title'>
              Strona główna
            </div>
          </div>
          <div className='content2'>
            <BrowserRouter>
              <Switch>
                <Route exact path="/admin" component={Dashboard} />
                <Route exact path="/admin/page" component={EditPage} />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
    )
  }
}