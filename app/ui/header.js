const html = require('choo/html');
const Component = require('choo/component');
const Account = require('./account');
const assets = require('../../common/assets');
const { platform } = require('../utils');

class Header extends Component {
  constructor(name, state, emit) {
    super(name);
    this.state = state;
    this.emit = emit;
    this.account = state.cache(Account, 'account');
  }

  update() {
    this.account.render();
    return false;
  }
  // width="340" height="64"
  createElement() {
    const title =
      platform() === 'android'
        ? html`
            <a class="">
              <svg class="w-64">
                <use xlink:href="${assets.get('logo.svg')}#logo" />
              </svg>
            </a>
          `
        : html`
            <a class="" href="/">
              <svg class="w-48 md:w-64">
                <use xlink:href="${assets.get('logo.svg')}#logo" />
              </svg>
              <!-- <img src="${assets.get('logo.svg')}#logo"/> -->
            </a>
          `;
    return html`
      <header
        class="main-header relative flex-none flex flex-row items-center justify-between w-full px-6 md:px-8 h-16 md:h-24 z-20 bg-transparent"
      >
        ${title} ${this.account.render()}
      </header>
    `;
  }
}

module.exports = Header;
